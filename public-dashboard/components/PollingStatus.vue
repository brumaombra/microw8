<template>
    <div class="flex items-center px-3 py-2 rounded-xl border border-gray-200 transition-all duration-300">
        <!-- Status indicator -->
        <div>
            <i class="fas fa-circle text-green-500 text-sm animate-pulse" />
        </div>

        <!-- Status text -->
        <div class="hidden md:inline ms-2 text-sm font-medium text-gray-700">
            Updating...
        </div>
    </div>
</template>

<style scoped>
/* Custom pulse animation for better visibility */
@keyframes custom-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: custom-pulse 2s cubic-bezier(0.3, 0, 0.6, 1) infinite;
}
</style>