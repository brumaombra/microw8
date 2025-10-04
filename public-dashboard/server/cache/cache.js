import { handleError } from '~/server/utils/error.js';
import { readMicrowavesWithLatestQueue } from '~/server/db/microwaves.js';
import { readHistoryChartData, readQueueStatsData, readDailyUsageData } from '~/server/db/analytics.js';

// Cached queue data
let queueData = null;

// Load all queue data and cache it
export const refreshQueueData = async () => {
    try {
        // Read all the various data in parallel
        const [
            currentStatus,
            queueStats,
            historyChart,
            dailyUsage
        ] = await Promise.all([
            readMicrowavesWithLatestQueue(),
            readQueueStatsData(),
            readHistoryChartData(),
            readDailyUsageData()
        ]);

        // Return the combined data
        const data = {
            currentStatus: currentStatus,
            queueStats: queueStats,
            historyChart: historyChart,
            dailyUsage: dailyUsage
        };

        // Cache the data
        queueData = data;
        return data;
    } catch (error) {
        handleError({ error, message: 'Error fetching queue data', throwError: true });
    }
};

// Get cached queue data
export const getCachedQueueData = async () => {
    if (!queueData) await refreshQueueData(); // Load data if not already loaded
    return queueData;
};