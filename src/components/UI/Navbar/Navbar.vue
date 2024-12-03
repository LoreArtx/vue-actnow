<script setup>
    const routes = [
        {path:'about', title:'About'},
        {path:'sign-in', title:'Sign In'}
        ]
</script>

<template >
    <header class="px-10 py-4 flex justify-between items-center">
        <div class="text-xl"><RouterLink to="/">ActNow</RouterLink></div>
        <nav class="flex gap-10">
            <RouterLink v-for="route in routes" :to="`/${route.path}`" :key="route.path" exact-active-class="text-red-500">{{route.title}}</RouterLink>
        </nav>
    </header>
</template>

<style >

</style>