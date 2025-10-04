<script setup>
import { computed, ref, onMounted, markRaw } from 'vue';
import { lineChartConfig } from '~/composables/charts/lineChartConfig.js';
import Card from '~/components/ui/Card.vue';

// Props
const props = defineProps({
    data: { type: Array, default: () => [] }
});

const VueApexCharts = ref(null);

// Reactive chart data series
const chartData = computed(() => {
    return props.data;
});

// Reactive chart options
const chartOptions = computed(() => {
    return { ...lineChartConfig };
});

// On component mounted
onMounted(async () => {
    try {
        const module = await import('vue3-apexcharts'); // Dynamically import VueApexCharts only on client-side
        VueApexCharts.value = markRaw(module.default);
    } catch (error) {
        console.error('Failed to load ApexCharts:', error);
    }
});
</script>

<template>
    <Card>
        <!-- Title -->
        <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Queue Trends</h3>
            <p class="text-sm text-gray-600">Real-time queue length over time</p>
        </div>

        <!-- Chart -->
        <div v-if="chartData && chartData.length > 0" class="h-80">
            <ClientOnly>
                <VueApexCharts v-if="VueApexCharts" type="line" :options="chartOptions" :series="chartData" height="320px" />
            </ClientOnly>
        </div>

        <!-- No data available -->
        <div v-else class="flex items-center justify-center h-80 text-gray-500">
            <div class="text-center">
                <i class="fas fa-chart-line text-4xl mb-2"></i>
                <p>No data available</p>
            </div>
        </div>
    </Card>
</template>