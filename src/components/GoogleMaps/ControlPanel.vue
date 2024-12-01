<template>
    <CustomControl class="left-10" position="BOTTOM_LEFT">
        <div class="flex flex-auto">
            <div 
                v-for="category in categories"
                :class="['categoryElement', category.toLowerCase(),  { active: category === categoryFilter }]"

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
        @apply first:rounded-l-lg last:rounded-r-lg cursor-pointer hover:bg-gray-400 px-4 py-2  flex justify-center items-center flex-1
    }

    .active{
        @apply font-bold border-2 border-white
    }
</style>