import { getAllSnapshots } from '~/server/db/snapshots.js';
import { handleNuxtErrorMessages } from '~/server/utils/error.js';

export default defineEventHandler(async () => {
    try {
        const snapshots = await getAllSnapshots();
        return snapshots;
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error fetching snapshots' });
    }
});