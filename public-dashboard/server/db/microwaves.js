import { getKnex } from '~/server/db/config/connection.js';
import { handleError } from '~/server/utils/error.js';
import { calculateQueueTime } from '~/server/utils/utils.js';

// Read the microwaves list
export const readMicrowavesList = async () => {
    const knex = getKnex();

    try {
        const microwavesData = await knex('microwaves').select('*');
        return microwavesData;
    } catch (error) {
        handleError({ error, errorMessage: 'Error loading microwaves data', throwError: true });
    }
};

// Load microwaves with their latest queue snapshots
export const readMicrowavesWithLatestQueue = async () => {
    const knex = getKnex();

    try {
        // Get the list of microwaves with their latest queue snapshot
        const microwavesData = await knex('microwaves')
            .leftJoin(
                knex('queue_snapshots')
                    .select('microwaveId')
                    .max('measuredAt as latest_measurement')
                    .groupBy('microwaveId')
                    .as('latest'),
                'microwaves.id',
                'latest.microwaveId'
            )
            .leftJoin('queue_snapshots', function () {
                this.on('microwaves.id', '=', 'queue_snapshots.microwaveId')
                    .andOn('queue_snapshots.measuredAt', '=', 'latest.latest_measurement');
            })
            .select(
                'microwaves.*',
                'queue_snapshots.queueCount as current_queue',
                'queue_snapshots.measuredAt as last_measured'
            );

        // Map and calculate additional fields
        return microwavesData.map(microwave => ({
            id: microwave.id,
            name: microwave.name,
            queue: microwave.current_queue || 0,
            waitTime: calculateQueueTime(microwave.current_queue || 0),
            lastMeasured: microwave.last_measured
        }));
    } catch (error) {
        handleError({ error, errorMessage: 'Error loading microwaves with queue data', throwError: true });
    }
};