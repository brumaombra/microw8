<script setup>
import { computed, ref, onMounted, markRaw } from 'vue';
import { gaussianChartConfig } from '~/composables/charts/gaussianChartConfig.js';
import Card from '~/components/ui/Card.vue';

// Props
const props = defineProps({
    microwave: { type: Object, required: true }
});

const VueApexCharts = ref(null);

// Reactive chart data series
const chartData = computed(() => {
    return [{
        name: props.microwave.name,
        data: props.microwave.data
    }];
});

// Reactive chart options
const chartOptions = computed(() => {
    return { ...gaussianChartConfig };
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
            <h3 class="text-lg font-semibold text-gray-900">{{ microwave.name }} Daily Usage</h3>
            <p class="text-sm text-gray-600">Average queue length by hour (6AM - 9PM)</p>
        </div>

        <!-- Chart -->
        <div v-if="chartData && chartData[0].data && chartData[0].data.length > 0" class="h-80">
            <ClientOnly>
                <VueApexCharts v-if="VueApexCharts" type="bar" :options="chartOptions" :series="chartData" height="320px" />
            </ClientOnly>
        </div>

        <!-- No data available -->
        <div v-else class="flex items-center justify-center h-80 text-gray-500">
            <div class="text-center">
                <i class="fas fa-chart-bar text-4xl mb-2"></i>
                <p>No usage data available</p>
            </div>
        </div>
    </Card>
</template>