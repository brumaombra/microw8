<script setup>
import Card from '~/components/ui/Card.vue';

// Props
const props = defineProps({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    value: { type: [Number, String], default: '' },
    icon: { type: String, default: '' },
    color: { type: String, default: '' }
});
</script>

<template>
    <Card class="flex justify-center h-32">
        <div class="flex items-center justify-between">
            <!-- Title and value -->
            <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-600 mb-1 truncate" :title="title">
                    {{ title }}
                    <i class="fas fa-info-circle text-gray-400 ml-1" :title="description"></i>
                </p>
                <p class="text-2xl font-bold text-gray-900">{{ value }}</p>
            </div>

            <!-- Icon -->
            <div :class="['h-14 w-14 flex items-center justify-center rounded-2xl text-white shadow-lg', color]">
                <i :class="[icon, 'text-2xl']"></i>
            </div>
        </div>
    </Card>
</template>