<template>
  <label
    :for="`status-${value}`"
    :class="`relative flex items-center gap-4 p-2 transition-all duration-300 border-2 border-gray-300 cursor-pointer rounded-xl ${isSelected ? 'border-blue-500' : ''} hover:bg-blue-100`"
    @click.prevent="$emit('select', value)"
  >
    <input
      type="radio"
      name="status"
      :id="`status-${value}`"
      :value="value"
      class="sr-only peer"
      :checked="isSelected"
      readonly
    />

    <div class="flex items-center gap-3">
      <div :class="statusIconClasses">
        <img :src="src" :alt="value" width="25" height="25" />
      </div>
      <span>{{ label }}</span>
    </div>

    <div
      class="flex items-center justify-center w-5 h-5 border-2 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600"
    >
      <img
        src="../assets/Done_round.svg"
        alt="done icon"
        width="20"
        height="20"
        :class="`z-10 ${isSelected ? '' : 'hidden'}`"
      />
    </div>
  </label>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  value: String,
  label: String,
  src: String,
  isSelected: Boolean,
})

defineEmits(['select'])

const statusIconClasses = computed(() => ({
  'p-2 rounded-xl': true,
  'bg-[#E9A23B]': props.value === 'in-progress',
  'bg-red-500': props.value === "won't do",
  'bg-green-500': props.value === 'completed',
}))
</script>
