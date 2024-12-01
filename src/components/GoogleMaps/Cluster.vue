<template>
        <MarkerCluster>
            <RequestMarker v-for="request in filteredRequests"
             :key="request._id"
              :request="request"></RequestMarker>
        </MarkerCluster>
</template>

<script setup>
    import { MarkerCluster } from 'vue3-google-map';
    import RequestMarker from '@/components/GoogleMaps/RequestMarker.vue';
    
    import { computed } from 'vue';
    import useRequests from '@/stores/volunteer-requests';

    const props = defineProps(['categoryFilter'])
    
    const {requests} = useRequests()

    const filteredRequests = computed(()=>{
        return props.categoryFilter !== "All"?
        requests.filter(r=>r.category === props.categoryFilter.toLocaleLowerCase())
        :
        requests

    })
</script>