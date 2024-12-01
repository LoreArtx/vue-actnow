<template>
  <div class="w-full">
    <label v-if="label" for="select-input" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <select
      id="select-input"
      v-model="formVar.value"
      :class="['block w-full p-2 border border-gray-300 bg-white text-sm', error ? 'border-red-500' : '']"
      @change="emitSelection"
    >
      <option value="" disabled>Select an option</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-red-500 mt-1">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps(['label','options','error', 'formVar']);
</script>
