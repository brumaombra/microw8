<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import MicrowaveCard from '~/components/analytics/MicrowaveCard.vue';
import QueueHistoryChart from '~/components/analytics/QueueHistoryChart.vue';
import QueueStats from '~/components/analytics/QueueStats.vue';
import DailyUsageChart from '~/components/analytics/DailyUsageChart.vue';
import SectionTitle from '~/components/SectionTitle.vue';

const globalStore = useGlobalStore();
const loading = ref(true);
let interval = null;

// Load the current queue data 
const loadQueueData = async () => {
    try {
        const result = await $fetch('/api/queue-data');
        return result;
    } catch (error) {
        console.error('Error fetching current queue data:', error);
        return {};
    }
};

// Update queue data in store
const updateQueueData = async () => {
    const queueData = await loadQueueData();
    globalStore.value.queueData = queueData;
};

// Load page data
const loadData = async () => {
    try {
        loading.value = false;
        await updateQueueData(); // Load the data
    } catch (error) {
        console.error('Error loading analytics:', error);
    } finally {
        loading.value = false;
    }
};

// On component mounted
onMounted(async () => {
    // Initial load
    await loadData();

    // Start the polling
    const runtimeConfig = useRuntimeConfig();
    const pollingInterval = runtimeConfig.public.pollingInterval * 1000;
    interval = setInterval(async () => {
        await updateQueueData();
    }, pollingInterval);
});

// On component unmounted
onUnmounted(() => {
    if (interval) {
        clearInterval(interval);
    }
});

// Page metadata
useHead({
    title: 'MicroW8 - Analytics Dashboard',
});
</script>

<template>
    <div class="mx-auto space-y-10">
        <!-- Header -->
        <div>
            <h1 class="text-3xl font-bold mb-2">Microwave Analytics Dashboard</h1>
            <p class="text-gray-600">Monitor queue performance and usage patterns across all microwaves</p>
        </div>

        <!-- Current Status -->
        <div>
            <!-- Title -->
            <SectionTitle title="Current Status" />

            <!-- Microwave Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MicrowaveCard v-for="microwave in globalStore.queueData?.currentStatus" :key="microwave.id" :microwave="microwave" />
            </div>
        </div>

        <!-- Analytics Overview -->
        <div>
            <!-- Title -->
            <SectionTitle title="Analytics Overview" />

            <!-- Stats and charts -->
            <div class="space-y-8">
                <!-- Stats -->
                <QueueStats :stats="globalStore.queueData?.queueStats" />

                <!-- Queue Trends -->
                <QueueHistoryChart :data="globalStore.queueData?.historyChart" />
            </div>
        </div>

        <!-- Daily Usage -->
        <div>
            <!-- Title -->
            <SectionTitle title="Daily Usage Patterns" />

            <!-- Daily Usage Charts -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DailyUsageChart v-for="microwave in globalStore.queueData?.dailyUsage" :key="microwave.name" :microwave="microwave" />
            </div>
        </div>

        <!-- Loading overlay for initial load -->
        <div v-if="loading" class="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
            <div class="text-center">
                <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p class="text-lg font-medium text-gray-700">Loading dashboard...</p>
            </div>
        </div>
    </div>
</template>