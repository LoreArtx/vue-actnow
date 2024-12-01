<template>
    <Input :formVar="searchValue" :placeholder>

    </Input>
</template>

<script setup>
    import Input from './Input.vue';
    const {searchValue, placeholder} = defineProps(['searchValue', 'placeholder'])
</script>

<style scoped>

</style>