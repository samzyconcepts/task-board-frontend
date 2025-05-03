<template>
  <div
    class="flex items-center p-2 rounded-lg cursor-pointer"
    :class="isSelected ? 'bg-blue-300' : 'bg-gray-200'"
    @click.prevent="$emit('select', value)"
  >
    <img :src="src" :alt="alt" :width="size" :height="size" />
  </div>
</template>

<script setup>
defineProps({
  value: String,
  src: String,
  alt: String,         
  size: {
    type: Number,
    default: 30,
  },
  isSelected: Boolean,
})

defineEmits(['select']);
</script>
