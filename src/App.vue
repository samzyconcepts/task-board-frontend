<script setup>
import { onMounted, ref } from 'vue'
import BoardHeader from './components/BoardHeader.vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import TasksContainer from './components/TasksContainer.vue'
import { useBoardStore } from './stores/boardStore'
import { storeToRefs } from 'pinia'
import EditBoardModal from './components/editBoardModal.vue'

const boardStore = useBoardStore()

const { board, loading } = storeToRefs(boardStore)
const isEditModalOpen = ref(false)
// import AddTaskModal from './components/addTaskModal.vue';
const closeEditModal = () => {
  isEditModalOpen.value = false
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

onMounted(async () => {
  let boardId = localStorage.getItem('boardId') || window.location.pathname.slice(1)

  try {
    // Check if boardId is valid
    if (!boardId) {
      const createBoardId = await boardStore.createBoard()
      boardId = createBoardId

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
});

// Cleanup function to remove the boardId from localStorage
// onBeforeUnmount(() => {
//   localStorage.removeItem('boardId')
// });
</script>

<template>
  <section class="grid items-center w-4/12 py-10 mx-auto">
    <div v-if="loading">
      <SkeletonLoader type="rectangle" bgClass="bg-gray-300" cssClass="h-24 mb-4 rounded" />
      <SkeletonLoader class="h-2.5 w-48 mb-4" />
      <SkeletonLoader class="h-2 mb-2.5" />
    </div>

    <div v-else-if="board">
      <BoardHeader :name="board.name" :description="board.description" @edit="openEditModal" />
      <TasksContainer :boardId="board && board._id"/>
      <EditBoardModal :isOpen="isEditModalOpen" @close="closeEditModal" />
    </div>
  </section>
</template>
