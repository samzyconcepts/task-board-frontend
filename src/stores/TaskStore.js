import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchTasks = async (boardId) => {
    if (!boardId) {
      error.value = 'Board ID is required'
      return
    }
    loading.value = true

    try {
      const response = await axios.get(`/boards/${boardId}`)
      tasks.value = response.data.board.tasks
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createTask = async (title, description, status, icon, boardId) => {
    if (!boardId || !title || !description || !status || !icon) {
      error.value = 'All fields are required'
      return
    }

    loading.value = true
    try {
      const response = await axios.post('/tasks', {
        title,
        description,
        status,
        icon,
        boardId,
      })

      tasks.value.push(response.data)
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const getTaskById = (taskId) => {
    if (!taskId) {
      error.value = 'Task ID is required'
      return null
    }
    const task = tasks.value.find((task) => task._id === taskId)
    if (!task) {
      error.value = 'Task not found'
      return null
    }
    return task
  }


  const updateTask = async (taskId, title, description, status, icon) => {
    if (!taskId || !title || !description || !status || !icon) {
      error.value = 'All fields are required'
      return
    }
    loading.value = true
    try {
      const response = await axios.put(`/tasks/${taskId}`, {
        title,
        description,
        status,
        icon,
      })

      const index = tasks.value.findIndex((task) => task._id === taskId)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (taskId) => {
    if (!taskId) {
      error.value = 'Task ID is required'
      return
    }
    loading.value = true
    try {
      await axios.delete(`/tasks/${taskId}`)
      tasks.value = tasks.value.filter((task) => task._id !== taskId)
    } catch (err) {
      error.value = err.response.data.message || 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
  }
})
