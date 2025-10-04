// import fs from 'fs';
import { Jimp } from 'jimp';
import { handleError } from '~/server/utils/error.js';
import { countPersonsInImage } from '~/server/detection/object-detection.js';
import { createSnapshot } from '~/server/db/snapshots.js';
import { refreshQueueData } from '~/server/cache/cache.js';

const runtimeConfig = useRuntimeConfig();
const pollingInterval = runtimeConfig.public.pollingInterval * 1000;
const cameras = runtimeConfig.public.cameras;

// Initialize cameras polling
export const initCamerasPolling = async () => {
    try {
        // Initial fetch to get the first set of camera shots
        await getAllCamerasShots();

        // Start polling for camera status updates
        setInterval(() => {
            getAllCamerasShots(); // Get shots from all cameras
        }, pollingInterval);
    } catch (error) {
        handleError({ error, message: 'Error initializing cameras polling', throwError: true });
    }
};

// Get all cameras shots
const getAllCamerasShots = async () => {
    try {
        // Get all camera shots in parallel
        const promisesList = cameras.map(camera => getSingleCameraShot(camera));
        const analysisResults = await Promise.all(promisesList);

        // Save analysis results to database
        await saveSnapshotsToDb(analysisResults);

        // Load the updated queue data into cache
        const updatedQueueData = await refreshQueueData();
        return updatedQueueData;
    } catch (error) {
        handleError({ error, message: 'Error fetching all camera shots', throwError: true });
    }
};

// Get a single camera shot
const getSingleCameraShot = async camera => {
    try {
        // Fetch the camera image
        const response = await fetch(`${camera.url}/capture`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the image buffer
        const imageBuffer = await response.arrayBuffer();

        // Process the JPEG image
        const image = await Jimp.read(Buffer.from(imageBuffer));
        const processedBuffer = await image.getBuffer('image/jpeg');
        const detectionResult = await countPersonsInImage({ imageBuffer: processedBuffer });
        // await savePhotoToFileSystem(camera, processedBuffer); // Save the processed image to the file system
        return { camera: camera, detectionResult: detectionResult };
    } catch (error) {
        handleError({ error, message: 'Error fetching camera shot', throwError: false });
        return { camera: camera, detectionResult: null };
    }
};

/* Save the photo to the file system
const savePhotoToFileSystem = async (camera, imageBuffer) => {
    const filePath = `./public/images/${camera.microwaveId}.jpg`;
    await fs.promises.writeFile(filePath, imageBuffer);
    return filePath;
};
*/

// Save the snapshot to the database
const saveSnapshotsToDb = async analysisResults => {
    try {
        // Create snapshot promises for all results
        const snapshotPromises = analysisResults.map(result => {
            if (!result.detectionResult) return Promise.reject(null); // Skip if no detection result
            return createSnapshot({ microwaveId: result.camera?.microwaveId, queueCount: result.detectionResult?.personCount });
        });

        // Wait for all promises to settle (resolve or reject)
        const results = await Promise.allSettled(snapshotPromises);

        // Check results
        const failures = results.filter(result => result.status === 'rejected');
        const successes = results.filter(result => result.status === 'fulfilled');
        console.log(`Successfully saved ${successes.length} snapshots, failed to save ${failures.length} snapshots`);
    } catch (error) {
        handleError({ error, message: 'Error saving snapshots to database', throwError: true });
    }
};