<template >
    <aside>
        <div class="flex items-center justify-between">
            <h1 class="text-lg px-2">The latest</h1>
            <RouterLink to="/all-requests" class="text-sm underline text-blue-500 mr-5">View all</RouterLink>
        </div>
        <v-list lines="two" class="flex flex-col gap-2 h-[470px] overflow-auto">
            <RouterLink v-for="request in requests.slice(0,7)" :to="`/request-for-volunteering/${request._id}`" class="hover:opacity-70 flex-1" :class="request.category">
                <v-list-item  :value="request" :title="request.author" :subtitle="getNeedsString(request)"/>
            </RouterLink>
        </v-list>
    </aside>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import useRequests from '@/stores/volunteer-requests';

const {requests} = useRequests()

const getNeedsString = (request)=>{
    return `We need: ${request.needs.map(item=>item.title).join(",")}`.slice(0, 43).concat("...")
}

</script>
<style>
    
</style>