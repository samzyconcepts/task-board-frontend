<script setup>
import clock from '../assets/clock.png'
import time from '../assets/Time_atack_duotone.svg'
</script>

<template>
  <button class="w-full cursor-pointer">
    <div class="flex items-center justify-between p-4 bg-[#F5D565] rounded-2xl">
      <div class="flex items-center gap-4">
        <div class="p-2 bg-white rounded-xl">
          <img width="25px" height="25px" :src="clock" alt="" />
        </div>
        <div class="flex-col items-start">
          <h1 class="text-xl font-bold">Task in Progress</h1>
          <p class="text-gray-700 max-w-[325px] text-start">description</p>
        </div>
      </div>
      <div class="p-2 rounded-lg bg-[#E9A23B]"><img :src="time" alt="status icon" width="25" height="25" /></div>
    </div>
  </button>
</template>
