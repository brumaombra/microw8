// Calculate the queue time based on average wait and number in queue
export const calculateQueueTime = queueLength => {
    const avgWait = 60; // Average wait time in seconds
    return avgWait * queueLength; // Total wait time in seconds
};

// Get 30 days ago date
export const get30DaysAgoDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
};

// Get the start of today
export const getStartOfToday = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};