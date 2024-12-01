<template>
    <div class="relative">
        <label v-if="label" :for="name">{{label}}</label>
        <div v-if="formVar.error" class="absolute left-2 text-xs text-red-500">{{formVar.error}}</div>
        <input 
            :="$attrs"
            v-model="formVar.value"
            :id="name"
            :type="type" class="w-full mb-3 px-3 py-1 border"
            :class="formVar.error && 'input-error pt-4'"
             />
    </div>
</template>

<script setup>
    const {name, formVar, type, label} = defineProps({
        name: { type: String },
        formVar: { type: Object, required: true },
        type: { type: String, default: 'text' },
        label: { type: String, default: '' }
    });

</script>

<style scoped>
    .input-error{
        @apply border-red-500 border-2
    }
</style>