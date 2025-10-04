import { getKnex } from '~/server/db/config/connection.js';
import { handleError } from '~/server/utils/error.js';

// Create a new queue snapshot
export const createSnapshot = async ({ microwaveId, queueCount }) => {
    const knex = getKnex();

    try {
        // Validate input
        if (!microwaveId || queueCount === undefined) {
            throw new Error('microwaveId and queueCount are required');
        }

        // Create the snapshot object
        const snapshot = {
            microwaveId: microwaveId,
            queueCount: queueCount
        };

        // Insert the new snapshot into the database
        await knex('queue_snapshots').insert(snapshot);

        // Return the snapshot
        return snapshot;
    } catch (error) {
        handleError({ error, errorMessage: 'Error creating snapshot', throwError: true });
    }
};

// Get all the snapshots
export const getAllSnapshots = async () => {
    const knex = getKnex();

    try {
        const snapshots = await knex('queue_snapshots').select('*');
        return snapshots;
    } catch (error) {
        handleError({ error, errorMessage: 'Error fetching all snapshots', throwError: true });
    }
};

// Get all the snapshots for a specific microwave
export const getSnapshotsByMicrowave = async ({ microwaveId }) => {
    const knex = getKnex();

    try {
        // Validate input
        if (!microwaveId) {
            throw new Error('microwaveId is required');
        }

        // Get the snapshots from the database
        const snapshots = await knex('queue_snapshots')
            .where('microwaveId', microwaveId)
            .orderBy('measuredAt', 'desc');

        // Return the snapshots
        return snapshots;
    } catch (error) {
        handleError({ error, errorMessage: 'Error fetching snapshots', throwError: true });
    }
};