<script setup>
import { computed } from 'vue';
import Card from '~/components/ui/Card.vue';
import { formatSeconds } from '~/composables/useFormatter.js';

// Props
const props = defineProps({
    microwave: { type: Object, required: true }
});

// Computed property for queue color
const queueColor = computed(() => {
    if (props.microwave.queue <= 2) return 'bg-green-200 text-green-700';
    if (props.microwave.queue <= 5) return 'bg-yellow-200 text-yellow-700';
    return 'bg-red-200 text-red-700';
});
</script>

<template>
    <Card>
        <!-- Microwave name -->
        <div class="rounded-xl p-3 mb-4 text-center font-extrabold text-lg bg-blue-100 text-blue-800">
            {{ props.microwave.name }}
        </div>

        <!-- Stats -->
        <div class="space-y-4">
            <!-- Current queue -->
            <div :class="`text-center rounded-xl p-4 ${queueColor}`">
                <p class="text-4xl font-black mb-1">{{ props.microwave.queue }}</p>
                <p class="text-sm font-medium opacity-90">People in Queue</p>
            </div>

            <!-- Average wait time -->
            <div class="text-center bg-white border-2 border-gray-100 rounded-xl p-3 space-y-2">
                <i class="fas fa-clock text-gray-400"></i>
                <p class="text-sm font-medium text-gray-500 tracking-wide">Wait Time</p>
                <p class="text-2xl font-extrabold text-gray-600">{{ formatSeconds(props.microwave.waitTime) }}</p>
            </div>
        </div>
    </Card>
</template>