<script setup>
import { computed } from 'vue';
import { formatNumber, formatSeconds } from '~/composables/useFormatter.js';
import StatCard from '~/components/StatCard.vue';

// Props
const props = defineProps({
    stats: { type: Object, default: () => ({}) }
});

// Computed properties for stats display
const statCards = computed(() => [{
    title: 'Total Queues Length',
    description: 'Current number of people waiting in the queues across all microwaves.',
    value: props.stats.totalQueues || 0,
    icon: 'fas fa-hourglass-half',
    color: 'bg-orange-500'
}, {
    title: 'Peak Queue',
    description: 'Highest number of people in the queue for all the microwaves today.',
    value: props.stats.maxQueueToday || 0,
    icon: 'fas fa-arrow-up',
    color: 'bg-red-500'
}, {
    title: 'Average Queue',
    description: 'Average number of people in the queue for all the microwaves today.',
    value: formatNumber(props.stats.averageQueueToday || 0),
    icon: 'fas fa-users',
    color: 'bg-green-500'
}, {
    title: 'Average Wait Time',
    description: 'Average wait time for all the microwaves today.',
    value: formatSeconds(props.stats.averageWaitTimeToday || 0),
    icon: 'fas fa-clock',
    color: 'bg-yellow-500'
},]);
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="stat in statCards" :key="stat.title">
            <StatCard :title="stat.title" :description="stat.description" :value="stat.value" :icon="stat.icon" :color="stat.color" />
        </div>
    </div>
</template>