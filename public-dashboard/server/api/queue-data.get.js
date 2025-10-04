import { handleNuxtErrorMessages } from '~/server/utils/error.js';
import { getCachedQueueData } from '~/server/cache/cache.js';

export default defineEventHandler(async () => {
    try {
        const cachedQueueData = await getCachedQueueData(); // Read the cached queue data
        return cachedQueueData;
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error fetching queue data' });
    }
});