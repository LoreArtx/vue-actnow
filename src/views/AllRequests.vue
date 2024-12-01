<template>
    <div>
        <FilterRequests 
        @filterByAuthor="filterByAuthor"
        @filterByNeedTitle="filterByNeedTitle"
        @filterByCategory="filterByCategory"/>
        <RouterLink v-for="request in filteredRequests" :to="`/request-for-volunteering/${request._id}`" class="underline text-blue-500 mb-5 block">
            {{ request.title }} --- {{ request.author }}
        </RouterLink>
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

<style scoped>

</style>