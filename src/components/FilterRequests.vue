<template>
    <div class="grid grid-cols-8 gap-3">
        <v-text-field class="col-span-3" v-model="organisationName" @update:model-value="findByOrganisation" placeholder="Author / Organisation"></v-text-field>

        <v-text-field class="col-span-3" v-model="needTitle" @update:model-value="findByNeedTitle" placeholder="Need"></v-text-field>

        <v-select class="col-span-2" :items="selectOptions" label="Category" v-model="categoryOption" @update:model-value="findByCategory"></v-select>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import useRequests from '@/stores/volunteer-requests';
    const organisationName = ref('')
    const needTitle = ref('')
    const categoryOption = ref('All')
    const emit = defineEmits(['filterByAuthor', 'filterByNeedTitle', 'filterByCategory'])
    const findByOrganisation = ()=>{
        const {getRequestsByAuthor} = useRequests()
        emit('filterByAuthor',getRequestsByAuthor(organisationName.value),organisationName.value)

    }

    const findByNeedTitle = ()=>{
        const {getRequestsByNeedTitle} = useRequests()
        emit('filterByNeedTitle', getRequestsByNeedTitle(needTitle.value),needTitle.value)
    }

    const findByCategory = ()=>{
        const {getRequestsByCategory, requests} = useRequests()
        let newRequests = []
        if(categoryOption.value === 'All')
            newRequests = requests
        else newRequests = getRequestsByCategory(categoryOption.value.toLocaleLowerCase())

        emit('filterByCategory', newRequests, categoryOption.value)
    }


    const selectOptions = [
        'All', 'Military', 'Medical', 'Vehicle', 'Energy', 'Other'
    ];
</script>

<style scoped>

</style>