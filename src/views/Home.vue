<template>
    <v-row class="flex gap-5">
        <v-col cols="8">
            <Map class="min-w-[500px]" :center="{lat:49.0384, lng:31.4513}" :zoom="6"/>
        </v-col>
        <v-col>
            <RequestsAside/>
        </v-col>
    </v-row>
</template>
<script setup>
    import RequestsAside from '@/components/RequestsAside.vue';
    import Map from '@/components/GoogleMaps/Map.vue';
</script>