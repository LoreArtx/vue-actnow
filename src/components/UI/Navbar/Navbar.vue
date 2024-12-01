<script setup>
    const routes = [
        {path:'about', title:'About'},
        {path:'sign-in', title:'Sign In'}
        ]
</script>

<template >
    <header class="bg-gray-200 px-10 py-4 flex justify-between" id="navbar">
        <div class="text-xl"><RouterLink to="/">MEDHELP</RouterLink></div>
        <nav class="flex gap-10">
            <RouterLink v-for="route in routes" :to="`/${route.path}`" :key="route.path" exact-active-class="text-red-500">{{route.title}}</RouterLink>
        </nav>
    </header>
</template>

<style >

</style>