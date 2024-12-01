<template >
    <aside class="bg-gray-200 w-1/4 rounded h-[500px] flex flex-col gap-0.5 overflow-auto">
        <div class="flex items-center justify-between">
            <h1 class="text-lg px-2">The latest</h1>
             <RouterLink to="/all-requests" class="text-sm underline text-blue-500 mr-5">View all</RouterLink>
            </div>

        <RouterLink v-for="request in requests.slice(0,7)" :to="`/request-for-volunteering/${request._id}`" class="bg-gray-100 hover:opacity-70 p-2 flex-1" :class="request.category">
            <div class="flex items-center">
                {{request.author}}
            </div>
            <span class="text-sm text-white">{{ getNeedsString(request) }}</span>
        </RouterLink>
    </aside>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import useRequests from '@/stores/volunteer-requests';

const {requests} = useRequests()

const getNeedsString = (request)=>{
    return `We need: ${request.needs.map(item=>item.title).join(",")}`.slice(0, 44).concat("...")
}


</script>
<style>
    
</style>