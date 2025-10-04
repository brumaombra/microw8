import { Jimp } from 'jimp';
import { handleError } from '~/server/utils/error.js';

// Convert image buffer to tensor
export const processImage = async ({ imageBuffer, resize = false, maxWidth = 1024, maxHeight = 1024 }) => {
    try {
        // Use Jimp to process the image
        const image = await Jimp.read(imageBuffer);

        // Resize image if too large (optional, for performance)
        if (resize && (image.width > maxWidth || image.height > maxHeight)) {
            image.scaleToFit({ w: maxWidth, h: maxHeight });
        }

        // Return processed image data
        return { image: image, width: image.width, height: image.height };
    } catch (error) {
        handleError({ error, message: 'Error processing image', throwError: true });
    }
};

// Convert Jimp image to base64 string
export const imageToBase64 = async image => {
    try {
        // Get image buffer in JPEG format
        const imageBuffer = await image.getBuffer('image/jpeg');
        if (!imageBuffer) {
            throw new Error('getBuffer returned null or undefined');
        }

        // Convert buffer to base64 string
        const base64Image = await imageBuffer.toString('base64');
        return base64Image;
    } catch (error) {
        handleError({ error, message: 'Error converting image to base64', throwError: true });
    }
};