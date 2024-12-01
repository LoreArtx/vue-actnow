<script setup>

</script>

<template>
    <component :is="$route.meta.layout || 'div'">
        <RouterView class="flex-auto mx-10 my-4"/>
    </component>
</template>

<style scoped>

</style>
