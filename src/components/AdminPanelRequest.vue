<template>
    <v-list lines="1">
        <RouterLink :to="{name:'request-for-voluenteering-settings'}">
            <v-list-item value="Update" title="Update"></v-list-item>
        </RouterLink>
        
        <v-list-item value="Close" title="Close the request"></v-list-item>
    </v-list>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>