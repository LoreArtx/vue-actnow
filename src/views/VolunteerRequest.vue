<template>
    <div class="flex gap-5">
        <div class="bg-gray-200 w-3/5">
            <Map :center="$route.meta.request.location.coordinates" :zoom="15" :single="true"/>
        </div>  
        <v-container class="flex flex-col gap-6">
            <v-row class="flex flex-col relative">
                <div>{{$route.meta.request.title}}</div>
                <div class="text-gray-500">from: {{$route.meta.request.author}}</div>
                <div class="absolute right-0 px-4" :class="$route.meta.request.category">Category: {{$route.meta.request.category}}</div>
            </v-row>
            <v-row><div>{{$route.meta.request.description}}</div></v-row>
            <v-row class="flex-col">
                <div>We require:</div>
                <ul>
                    <li v-for="request in $route.meta.request.needs">{{request.title}}</li>
                </ul>
            </v-row>

            <v-row class="flex-auto items-end">
                <v-col>
                    <v-btn color="primary" block>Donate</v-btn>
                </v-col>
                <v-col>
                    <v-btn color="secondary" block>Send help</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </div>

</template>
<script setup>
import Map from '@/components/GoogleMaps/Map.vue';
</script>
<style>
    
</style>