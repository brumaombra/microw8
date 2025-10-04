import { createSnapshot } from '~/server/db/snapshots.js';
import { handleNuxtErrorMessages } from '~/server/utils/error.js';

export default defineEventHandler(async event => {
    try {
        // Validate the data
        const body = await readBody(event);
        const { microwaveId, queueCount } = body;
        if (!microwaveId || !queueCount) {
            throw new Error('Invalid data');
        }

        // Create the snapshot
        const snapshot = await createSnapshot({ microwaveId, queueCount });
        return snapshot;
    } catch (error) {
        handleNuxtErrorMessages({ error, message: 'Error creating snapshot' });
    }
});