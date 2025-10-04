import { getKnex } from '~/server/db/config/connection.js';
import { handleError } from '~/server/utils/error.js';
import { get30DaysAgoDate, getStartOfToday, calculateQueueTime } from '~/server/utils/utils.js';

// Read the history data for all the microwaves
export const readHistoryChartData = async () => {
    const knex = getKnex();

    try {
        // Last 30 days
        const startDate = get30DaysAgoDate();

        // Get the snapshots from the database
        const snapshots = await knex('queue_snapshots')
            .join('microwaves', 'queue_snapshots.microwaveId', 'microwaves.id')
            .where('queue_snapshots.measuredAt', '>=', startDate)
            .orderBy('queue_snapshots.measuredAt', 'asc')
            .select(
                'microwaves.name as microwaveName',
                'queue_snapshots.queueCount',
                'queue_snapshots.measuredAt'
            );

        // Format the data for charts
        const microwaves = {};
        snapshots.forEach(item => {
            // Create the array if it doesn't exist
            if (!microwaves[item.microwaveName]) {
                microwaves[item.microwaveName] = [];
            }

            // Push the data point to the correct microwave
            microwaves[item.microwaveName].push({
                x: new Date(item.measuredAt).getTime(),
                y: item.queueCount
            });
        });

        // Convert to chart data format
        const chartData = Object.keys(microwaves).map(name => ({
            name,
            data: microwaves[name]
        }));

        // Return the chart data
        return chartData;
    } catch (error) {
        handleError({ error, errorMessage: 'Error fetching analytics data', throwError: true });
    }
};

// Read the queue stats data for today
export const readQueueStatsData = async () => {
    const knex = getKnex();

    try {
        // Today's start
        const today = getStartOfToday();

        // Query to get the average and max queue today
        const avgMaxQueueQuery = knex('queue_snapshots')
            .where('measuredAt', '>=', today)
            .avg('queueCount as averageQueueToday')
            .max('queueCount as maxQueueToday')
            .first();

        // Query to get total queues sum
        const totalQueuesSumQuery = knex.raw(`
            SELECT COALESCE(SUM(queueCount), 0) as totalQueues
            FROM queue_snapshots
            WHERE measuredAt >= ?
            AND (microwaveId, measuredAt) IN (
                SELECT microwaveId, MAX(measuredAt)
                FROM queue_snapshots
                WHERE measuredAt >= ?
                GROUP BY microwaveId
            )
        `, [today, today]);

        // Execute queries in parallel
        const [avgMaxQueueResult, totalQueuesSumResult] = await Promise.all([
            avgMaxQueueQuery,
            totalQueuesSumQuery
        ]);

        // Extract the data
        const totalQueues = parseInt(totalQueuesSumResult?.[0]?.[0].totalQueues) || 0;
        const maxQueueToday = parseInt(avgMaxQueueResult.maxQueueToday) || 0;
        const averageQueueToday = parseFloat(avgMaxQueueResult.averageQueueToday) || 0;
        const averageWaitTimeToday = calculateQueueTime(averageQueueToday);

        // Return the stats
        return {
            totalQueues,
            maxQueueToday,
            averageQueueToday,
            averageWaitTimeToday
        };
    } catch (error) {
        handleError({ error, errorMessage: 'Error fetching queue stats data', throwError: true });
    }
};

// Read daily usage data (average queue per hour from 6AM to 9PM)
export const readDailyUsageData = async () => {
    const knex = getKnex();

    try {
        // Get average queue count per hour per microwave
        const results = await knex('queue_snapshots')
            .join('microwaves', 'queue_snapshots.microwaveId', 'microwaves.id')
            .select(
                'microwaves.name as microwaveName',
                knex.raw('HOUR(queue_snapshots.measuredAt) as hour'),
                knex.raw('AVG(queue_snapshots.queueCount) as averageQueue')
            )
            .whereRaw('HOUR(queue_snapshots.measuredAt) BETWEEN 6 AND 21')
            .groupBy('microwaves.name', knex.raw('HOUR(queue_snapshots.measuredAt)'))
            .orderBy('microwaves.name')
            .orderBy(knex.raw('HOUR(queue_snapshots.measuredAt)'));

        // Format the data
        const microwaves = {};
        results.forEach(item => {
            // Initialize the array for each microwave if not exists
            if (!microwaves[item.microwaveName]) {
                microwaves[item.microwaveName] = Array.from({ length: 16 }, () => 0); // 6AM to 9PM = 16 hours
            }

            // Set the average queue at the correct hour index
            const hourIndex = item.hour - 6; // 6AM is index 0
            microwaves[item.microwaveName][hourIndex] = parseFloat(item.averageQueue);
        });

        // Convert to chart data format
        const chartData = Object.keys(microwaves).map(name => ({
            name,
            data: microwaves[name]
        }));

        // Return the chart data
        return chartData;
    } catch (error) {
        handleError({ error, errorMessage: 'Error fetching daily usage data', throwError: true });
    }
};