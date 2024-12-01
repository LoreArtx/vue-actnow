<template>
    <div class="flex gap-5">
        <div class="bg-gray-200 w-2/5">
            <Map :center="$route.meta.request.location.coordinates" :zoom="15" :single="true"/>
        </div>  
        <section class="flex flex-col gap-6">
            <div>{{$route.meta.request.title}}</div>

            <div>
                from: {{$route.meta.request.author}}
            </div>

            <div>{{$route.meta.request.description}}</div>

            <div>Category: {{$route.meta.request.category}}</div>

            <div>
                We require:
                <ul>
                    <li v-for="request in $route.meta.request.needs">{{request.title}}</li>
                </ul>
            </div>

        </section>
    </div>

</template>
<script setup>
import Map from '@/components/GoogleMaps/Map.vue';
</script>
<style>
    
</style>