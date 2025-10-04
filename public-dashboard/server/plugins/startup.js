import { initMySqlDatabase } from '~/server/db/config/connection.js';
import { initCamerasPolling } from '~/server/cameras/cameras.js';
import { handleError } from '~/server/utils/error.js';

// Init function
export default defineNitroPlugin(async () => {
    if (process.env.BUILDTIME === 'true') {
        console.log('In build mode, skipping server initialization');
        return; // Skip initialization if it's build time
    }

    // Start the server
    console.log('Server started!');
    await initServices();
});

// Initialize the services
const initServices = async () => {
    try {
        await initMySqlDatabase(); // Initialize the MySQL database
        await initCamerasPolling(); // Start cameras polling
    } catch (error) {
        handleError({ error, message: 'Error initializing services', throwError: true });
    }
};