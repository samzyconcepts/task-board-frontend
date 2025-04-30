import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useBoardStore = defineStore('board', () => {
  const board = ref({
    _id: null,
    name: 'My Task Board',
    description: 'Tasks to keep organised',
    tasks: [],
  })
  const loading = ref(false)
  const error = ref(null)

  const fetchBoard = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`/boards/${id}`)
      board.value = response.data.board
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }
  const createBoard = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post('/boards')
      board.value = response.data.board
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    board,
    loading,
    error,
    fetchBoard,
    createBoard,
  }
})
