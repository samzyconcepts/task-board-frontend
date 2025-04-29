<script setup>
import roundDuo from "@/assets/Add_round_duotone.svg";
</script>

<template>
  <button class="w-full bg-transparent cursor-pointer">
    <div class="bg-[#FBE8CF] rounded-2xl p-4">
      <div class="flex items-center gap-4">
        <div class="p-2 rounded-lg bg-amber-400">
          <img :src="roundDuo" alt="icon custom completed" width="25" height="25" />
        </div>
        <span class="font-bold text-gray-600 text-md">Add new task</span>
      </div>
    </div>
  </button>
</template>
