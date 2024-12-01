<template>

    <Navbar/>
    <slot/>
    <Footer/>

</template>

<script setup>
    import Navbar from '@/components/UI/Navbar/Navbar.vue';
    import Footer from '@/components/UI/Footer.vue';
</script>

<style lang="scss" scoped>

</style>