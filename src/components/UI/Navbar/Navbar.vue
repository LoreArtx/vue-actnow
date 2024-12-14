<script setup>
    import { isAuth, userToken } from '@/plugins/auth';
    import { jwtDecode } from 'jwt-decode';
    let routes = [
        {path:'create-request', title:'Create Own Request'},
        {path:'why-trust-us', title:'Why Trust Us'},
        {path:'about', title:'About'},
    ]

    if(isAuth.value){
        if(jwtDecode(userToken.value).user.role === 'admin')
            routes.push({path:'dashboard', title:'Dashboard'})
        
        routes.push({path:'profile', title:'Profile'})
    }else{
        routes.push({path:'sign-in', title:'Sign in'})
    }

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