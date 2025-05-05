<script setup>
import { ref } from 'vue'
import { useBoardStore } from '../stores/boardStore'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { defineProps } from 'vue'
import { AnimatePresence, motion } from 'motion-v'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const boardStore = useBoardStore()
const { board } = storeToRefs(boardStore)
const boardName = ref(board.value.name)
const boardDescription = ref(board.value.description)
const isSaving = ref(false)

const emit = defineEmits(['close'])

const closeModal = () => {
  if (!isSaving.value) {
    emit('close')
  }
}

const handleSubmit = async () => {
  try {
    isSaving.value = true
    if (!boardName.value || !boardDescription.value) {
      alert('Please fill in all fields.')
      return
    }

    const response = await axios.put(`/boards/${board.value._id}`, {
      name: boardName.value,
      description: boardDescription.value,
    })

    if (response.status === 200) {
      boardStore.fetchBoard(board.value._id)
      emit('close')
    } else {
      alert('Failed to update board.')
    }
  } catch (error) {
    console.error('Error updating board:', error)
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :exit="{ opacity: 0 }"
      transition="{ duration: 0.3 }"
      v-if="isOpen"
      @click.self="closeModal"
      class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        :initial="{ opacity: 0, scale: 0.95, y: 50 }"
        :animate="{
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 500, damping: 18, mass: 0.8 },
        }"
        :exit="{ opacity: 0, scale: 0.95, y: 50 }"
        class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 class="mb-4 text-2xl font-bold">Edit Board</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Board Name</label>
            <input
              type="text"
              id="name"
              v-model="boardName"
              :disabled="isSaving"
              required
              class="block w-full mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:outline-2 focus:outline-[#E9A23B] focus:border-none p-2"
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700"
              >Description</label
            >
            <textarea
              id="description"
              v-model="boardDescription"
              :disabled="isSaving"
              required
              class="block w-full mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:outline-2 focus:outline-[#E9A23B] focus:border-none p-2"
            ></textarea>
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              class="px-4 py-2 text-white bg-[#fdcc83] hover:bg-[#E9A23B] rounded-md"
              :disabled="isSaving"
            >
              <span v-if="!isSaving">Save Changes</span>
              <span v-else>
                <svg
                  class="w-5 h-5 mr-2 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v1m0 14v1m8.485-10.485l-.707.707M6.343 6.343l-.707.707m12.728 12.728l-.707-.707M6.343 17.657l-.707-.707M4 12h1m14 0h1m-7-8a8 8 0 100 16 8 8 0 000-16z"
                  />
                </svg>
              </span>
            </button>
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-800 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  </AnimatePresence>
</template>
