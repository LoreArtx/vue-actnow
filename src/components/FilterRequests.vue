<template>
    <div class="grid grid-cols-8 gap-3">
        <SearchBar class="col-span-3" :searchValue="organisationName" @input="findByOrganisation" placeholder="Author / Organisation"></SearchBar>

        <SearchBar class="col-span-3" :searchValue="needTitle" @input="findByNeedTitle" placeholder="Need"></SearchBar>

        <v-select class="col-span-2" :items="selectOptions" label="Category" :formVar="categoryOption" @change="findByCategory"></v-select>
    </div>
</template>

<script setup>
    import SearchBar from './UI/SearchBar.vue';
    import Select from './UI/Select.vue';
    import { reactive } from 'vue';
    import useRequests from '@/stores/volunteer-requests';
    const organisationName = reactive({value:'', error:''})
    const needTitle = reactive({value:'', error:''})
    const categoryOption = reactive({value:'', error:''})
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
        const {getRequestsByCategory} = useRequests()
        emit('filterByCategory', getRequestsByCategory(categoryOption.value), categoryOption.value)
    }


    const selectOptions = [
        'Military', 'Medical', 'Vehicle', 'Energy', 'Other'
    ];
</script>

<style scoped>

</style>