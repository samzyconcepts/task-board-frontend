<script setup>
// import AddTaskModal from './components/addTaskModal.vue';
import { onBeforeUnmount, onMounted } from 'vue'
import BoardHeader from './components/BoardHeader.vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import TasksContainer from './components/TasksContainer.vue'
import { useBoardStore } from './stores/boardStore'
import { storeToRefs } from 'pinia'

const boardStore = useBoardStore()

const { board, loading } = storeToRefs(boardStore)

onMounted(() => {
  let boardId = localStorage.getItem('boardId') || window.location.pathname.slice(1)

  try {
    // Check if boardId is valid
    if (!boardId) {
      boardStore.createBoard()
      boardId = board._id

      // Save to localstorage and change url
      localStorage.setItem('boardId', boardId)
      window.history.pushState({}, '', `/${boardId}`)
    } else {
      boardStore.fetchBoard(boardId)
      localStorage.setItem('boardId', boardId)
    }
  } catch (error) {
    console.error('Error fetching board:', error)
  }
})

// Cleanup function to remove the boardId from localStorage
onBeforeUnmount(() => {
  localStorage.removeItem('boardId')
});
</script>

<template>
  <!--
      My Task Board
      Tasks to keep organised
      Enter a short description
      In Progress
      Completed
      Won’t do
      Task in Progress
      Task Completed
      Task Won’t Do
      Task To Do
      Add new task
  -->
  <section class="grid items-center w-4/12 py-10 mx-auto">
    <div v-if="loading">
      <SkeletonLoader type="rectangle" bgClass="bg-gray-300" cssClass="h-24 mb-4 rounded" />
      <SkeletonLoader class="h-2.5 w-48 mb-4" />
      <SkeletonLoader class="h-2 mb-2.5" />
    </div>

    <div v-else-if="board">
      <BoardHeader :name="board.name" :description="board.description" />
      <TasksContainer />
      <!-- <AddTaskModal /> -->
    </div>
  </section>
</template>
