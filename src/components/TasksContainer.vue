<script setup>
import { onMounted, defineProps, ref } from 'vue'
import NewTaskBtn from './newTaskBtn.vue'
import TaskCard from './TaskCard.vue'
import { useTaskStore } from '@/stores/TaskStore'
import { storeToRefs } from 'pinia'
import AddTaskModal from './addTaskModal.vue'

const props = defineProps({
  boardId: String,
})

const taskStore = useTaskStore()
const { tasks, loading } = storeToRefs(taskStore)
const isModalOpen = ref(false)
const selectedTaskId = ref(null)

const openModalWithTask = (taskId) => {
  selectedTaskId.value = taskId
  console.log('Selected task ID:', selectedTaskId.value)
  isModalOpen.value = true
}

const openNewTaskModal = () => {
  selectedTaskId.value = null
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedTaskId.value = null
}

onMounted(async () => {
  try {
    await taskStore.fetchTasks(props.boardId)
  } catch (err) {
    console.error('Error fetching task', err)
  }
});
</script>

<template>
  <section class="my-8 space-y-4">
    <div v-if="loading">Loading Task</div>
    <div v-else v-for="task in tasks" v-bind:key="task._id">
      <TaskCard :task="task" @click="openModalWithTask(task._id)" />
    </div>
    <NewTaskBtn @click="openNewTaskModal" />
  </section>
  <AddTaskModal :is-open="isModalOpen" :task-id="selectedTaskId" @close="closeModal"  />
</template>
