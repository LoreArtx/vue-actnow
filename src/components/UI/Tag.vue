<template>
    <span :="$attrs" :class="classes">
        {{ props.category }}
    </span>
</template>

<script setup>
    const props = defineProps(['category'])
    let classes = `base ${props.category}`
</script>

<style scoped>
    .base{
        @apply rounded border-2 border-white text-white p-1
    }
</style>