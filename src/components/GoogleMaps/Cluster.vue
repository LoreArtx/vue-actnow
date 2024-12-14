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
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';
    import useRequests from '@/stores/volunteer-requests';

    const props = defineProps(['categoryFilter'])
    
    const {requests} = storeToRefs(useRequests())
    
    const filteredRequests = computed(()=>{
        return props.categoryFilter !== "All"?
        requests.value.filter(r=>(r.category === props.categoryFilter.toLocaleLowerCase()) && !r.closed)
        :
        requests.value.filter(r=>!r.closed)

    })

    // onMounted(() => {
    //     startFetchingRequests();
    // });

    // onUnmounted(() => {
    //     stopFetchingRequests();
    // });
</script>