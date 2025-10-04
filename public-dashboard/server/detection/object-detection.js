import { handleError } from '~/server/utils/error.js';
import { processImage, imageToBase64 } from '~/server/image/image.js';

const INFERENCE_SERVER_URL = process.env.INFERENCE_SERVER_URL || 'http://localhost:3002';

// Call the Python inference server
export const callInferenceServer = async (base64Image, confidence = 0.25) => {
    try {
        // Make POST request to Python server
        const result = await $fetch(`${INFERENCE_SERVER_URL}/detect`, {
            method: 'POST',
            body: JSON.stringify({
                image: base64Image,
                confidence: confidence
            })
        });

        // Return the result
        return result;
    } catch (error) {
        handleError({ error, message: 'Error calling inference server', throwError: true });
    }
};

// Count the number of persons in an image
export const countPersonsInImage = async ({ imageBuffer }) => {
    try {
        const { image, width, height } = await processImage({ imageBuffer: imageBuffer, resize: true }); // Process the uploaded image
        const base64Image = await imageToBase64(image); // Convert image to base64
        const detectionData = await callInferenceServer(base64Image, 0.25); // Call Python inference server

        // Count persons in detections
        const detections = detectionData.detections || []; // Extract detections array
        const personCount = detections.filter(det => det.class === 'person').length;
        console.log(`Found ${personCount} persons in the image`);

        // Return the data
        return {
            imageInfo: {
                width: width,
                height: height
            },
            detectionData: detectionData,
            personCount: personCount
        };
    } catch (error) {
        handleError({ error, message: 'Error processing image for person detection', throwError: true });
    }
};