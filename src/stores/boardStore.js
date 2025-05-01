import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useBoardStore = defineStore('board', () => {
  const board = ref({})
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
      fetchBoard(response.data.id)

      return response.data.id
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
