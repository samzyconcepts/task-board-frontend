<script setup>
import clock from '../assets/clock.png'
import time from '../assets/Time_atack_duotone.svg'
import { defineProps, computed } from 'vue'
import closeRing from '../assets/close_ring_duotone.svg'
import doneRound from '../assets/Done_round_duotone.svg'
import dumbbell from '../assets/dumbbell.png'
import teacup from '@/assets/teacup.png'
import books from '@/assets/book.png'
import laptop from '@/assets/laptop.png'
import comment from '@/assets/comment.png'

const props = defineProps({
  task: Object,
})

const { name, description, icon, status } = props.task

const statusClasses = computed(() => ({
  'flex items-center justify-between p-4 rounded-2xl': true,
  'bg-[#F5D565]': status === 'in-progress',
  'bg-[#E9EDF1]': status === 'todo',
  'bg-[#F8C4C4]': status === "won't do",
  'bg-[#A8E4B1]': status === 'completed',
}))

const statusRightIconClasses = computed(() => ({
  'p-2 rounded-lg': true,
  'bg-[#E9A23B]': status === 'in-progress',
  'bg-red-500': status === "won't do",
  'bg-green-500': status === 'completed',
  hidden: status === 'todo',
}))

const statusIconPath = computed(() => {
  switch (status) {
    case 'in-progress':
      return time
    case "won't do":
      return closeRing
    case 'completed':
      return doneRound
    default:
      return ''
  }
})

const iconPath = computed(() => {
  switch (icon) {
    case 'clock':
      return clock
    case 'dumbbell':
      return dumbbell
    case 'teacup':
      return teacup
    case 'books':
      return books
    case 'laptop':
      return laptop
    case 'comment':
      return comment
    default:
      return ''
  }
});
</script>

<template>
  <button class="w-full cursor-pointer">
    <div :class="statusClasses">
      <div class="flex items-center gap-4">
        <div class="p-2 bg-white rounded-xl">
          <img width="25px" height="25px" :src="iconPath" :alt="icon" />
        </div>
        <div class="flex-col items-start">
          <h2 class="text-xl font-bold text-left">{{ name }}</h2>
          <p class="text-gray-700 max-w-[325px] text-start">{{ description }}</p>
        </div>
      </div>
      <div v-if="status !== 'todo'" :class="statusRightIconClasses">
        <img :src="statusIconPath" alt="status icon" width="25" height="25" />
      </div>
    </div>
  </button>
</template>
