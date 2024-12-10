<template>
    <div>
        <FilterRequests 
        @filterByAuthor="filterByAuthor"
        @filterByNeedTitle="filterByNeedTitle"
        @filterByCategory="filterByCategory"/>
        
        <v-container class="flex flex-wrap gap-5">
            <v-card 
            v-for="request in filteredRequests"
            :href="`/request-for-volunteering/${request._id}`"
            :subtitle="request.author"
            class="min-w-[300px] flex-1"
            width="300">
                <template v-slot:title>
                    {{ request.title }}
                </template>

                <v-card-text component="ul" :class="`${request.category}-card text-white pt-4 h-full flex flex-col`">
                    <span v-for="need in request.needs">{{ need.title }}</span>
                </v-card-text>
            </v-card>
        </v-container>

        <div v-if="filteredRequests.length === 0">No results</div>
    </div>
</template>

<script setup>
    import useRequests from '@/stores/volunteer-requests';
    import FilterRequests from '@/components/FilterRequests.vue';
    import { computed, reactive } from 'vue';
    const {requests} = useRequests()

    // requests with author
    const requestsByAuthor = reactive({
        query:'',
        array:[]
    })

    const filterByAuthor = (requests, query)=>{
        requestsByAuthor.array = requests
        requestsByAuthor.query = query
    }

    // requests with needs
    const requestsByNeed = reactive({
        query:'',
        array:[]
    })

    const filterByNeedTitle = (requests, query)=>{
        requestsByNeed.array = requests
        requestsByNeed.query = query
    }


    // request with category
    const requestsByCategory = reactive({
        category:'',
        array:[]
    })

    const filterByCategory = (requests, category)=>{
        requestsByCategory.array = requests
        requestsByCategory.category = category
    }

    const filteredRequests = computed(() => {
        if (requestsByAuthor.query && requestsByNeed.query && requestsByCategory.category) {
            return requestsByAuthor.array.filter(el => 
                requestsByNeed.array.includes(el) && 
                requestsByCategory.array.includes(el)
            );
        }

        if (requestsByAuthor.query && requestsByNeed.query) {
            return requestsByAuthor.array.filter(el => requestsByNeed.array.includes(el));
        }

        if (requestsByAuthor.query && requestsByCategory.category) {
            return requestsByAuthor.array.filter(el => requestsByCategory.array.includes(el));
        }

        if (requestsByNeed.query && requestsByCategory.category) {
            return requestsByNeed.array.filter(el => requestsByCategory.array.includes(el));
        }

        if (requestsByAuthor.query) {
            return requestsByAuthor.array;
        }

        if (requestsByNeed.query) {
            return requestsByNeed.array;
        }

        if (requestsByCategory.category) {
            return requestsByCategory.array;
        }

        return requests;
    });
</script>

<style>
.military-card{
    @apply bg-red-500 rounded
}

.medical-card{
    @apply bg-green-500 rounded
}

.vehicle-card{
    @apply bg-gray-500 rounded
}

.energy-card{
    @apply bg-blue-500 rounded
}

.other-card{
    @apply bg-purple-500 rounded
}
</style>