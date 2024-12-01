<template>
    <CustomControl class="left-10" position="BOTTOM_LEFT">
        <div class="flex flex-auto">
            <div 
                v-for="category in categories"
                :class="['categoryElement', `category-${category.toLowerCase()}`,  { active: category === categoryFilter }]"

                @click="$emit('filter',category)"
               >{{category}}</div>
        </div>
    </CustomControl>
</template>

<script setup>
    import { CustomControl } from 'vue3-google-map';
    const props = defineProps(['categoryFilter'])

    const categories = [
        'All',
        'Military',
        'Medical',
        'Vehicle',
        'Energy',
        'Other'
    ]
</script>

<style scoped>
    .categoryElement{
        @apply first:rounded-l-lg last:rounded-r-lg cursor-pointer hover:bg-gray-400 px-4 py-2  flex justify-center items-center flex-1 bg-white
    }

    .category-military{
        @apply bg-red-500 text-white
    }

    .category-medical{
        @apply bg-green-500 text-white
    }

    .category-vehicle{
        @apply bg-gray-500 text-white
    }

    .category-energy{
        @apply bg-blue-500 text-white
    }

    .category-other{
        @apply bg-purple-500 text-white
    }


    .active{
        @apply font-bold border-2
    }
</style>