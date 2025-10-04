<script setup>
// Props
const props = defineProps({
    title: { type: String, required: true }
});
</script>

<template>
    <div class="flex items-center mb-6">
        <!-- Title -->
        <h2 class="text-2xl font-bold text-gray-700">
            {{ title }}
        </h2>
    </div>
</template>