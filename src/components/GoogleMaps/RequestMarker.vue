<template>
    <div class="relative">
        <AdvancedMarker :options="{position:request.location.coordinates, content: getCustomMarker()}" @click="handleToggle">
                    <InfoWindow class="h-[200px]">
                        <RouterLink :to="'/request-for-volunteering/'+request._id">
                            <h2 class="text-lg mb-2 hover:underline">{{request.title}}</h2>
                            <Tag :category="request.category"/>
                        </RouterLink>
                    </InfoWindow>
        </AdvancedMarker>
    </div>
</template>

<script setup>
    import { AdvancedMarker, InfoWindow  } from 'vue3-google-map';
    import Tag from '../UI/Tag.vue';
    import { ref } from 'vue';
    const {request} = defineProps(['request'])

    const getCustomMarker = () => {
        const marker = document.createElement("div");
        marker.className = `customMarker ${request.category}`;
        return marker;
    };

    const isVisible = ref(false)
    const handleToggle = ()=>{
        isVisible.value = !isVisible.value
    }
</script>

<style>
    .customMarker{
        @apply  size-4 rounded cursor-pointer bg-white border-4
    }
    
</style>