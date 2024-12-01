<template>
    <div class="flex justify-between gap-5">
        <div class="bg-gray-200 w-3/4">
            <Map :center="{lat:49.0384, lng:31.4513}" :zoom="6"/>
        </div>
        <RequestsAside/>
    </div>
</template>
<script setup>
    import RequestsAside from '@/components/RequestsAside.vue';
    import Map from '@/components/GoogleMaps/Map.vue';
</script>