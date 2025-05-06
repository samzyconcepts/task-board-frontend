<script setup>
import { onMounted, ref, watch } from 'vue'
import BoardHeader from './components/BoardHeader.vue'
import SkeletonLoader from './components/SkeletonLoader.vue'
import TasksContainer from './components/TasksContainer.vue'
import { useBoardStore } from './stores/boardStore'
import { storeToRefs } from 'pinia'
import EditBoardModal from './components/editBoardModal.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const boardStore = useBoardStore()

const { board, loading } = storeToRefs(boardStore)
const isEditModalOpen = ref(false)

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const handleBoard = async (boardId) => {
  try {
    // Check if boardId is valid
    if (!boardId) {
      const createBoardId = await boardStore.createBoard()
      boardId = createBoardId

      // Save to localstorage and change url
      localStorage.setItem('boardId', boardId)
      window.history.pushState({}, '', `/${boardId}`)
      await boardStore.fetchBoard(boardId)
    } else {
      await boardStore.fetchBoard(boardId)
      localStorage.setItem('boardId', boardId)
    }
  } catch (error) {
    console.error('Error fetching board:', error)
  }
}

onMounted(async () => {
  // Reset localStorage if visiting the root url
  if (!route.params.boardId) {
    localStorage.removeItem("boardId");
  }

  const boardId = route.params.boardId || localStorage.getItem('boardId')
  await handleBoard(boardId)
})

watch(
  () => route.params.boardId,
  async (newBoardId) => {
    if (newBoardId) {
      await handleBoard(newBoardId)
    }
  },
)
</script>

<template>
  <section class="grid items-center w-11/12 py-10 mx-auto md:w-8/12 lg:w-4/12">
    <div v-if="loading">
      <SkeletonLoader type="rectangle" bgClass="bg-gray-300" cssClass="h-24 mb-4 rounded" />
      <SkeletonLoader class="h-2.5 w-48 mb-4" />
      <SkeletonLoader class="h-2 mb-2.5" />
    </div>

    <div v-else-if="board">
      <BoardHeader :name="board.name" :description="board.description" @edit="openEditModal" />
      <TasksContainer :boardId="board && board._id" :key="board._id" />
      <EditBoardModal :isOpen="isEditModalOpen" @close="closeEditModal" />
    </div>
  </section>
</template>
