<script setup>
import { defineProps, reactive, watch } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'
import SelectableIcon from './SelectableIcon.vue'
import SelectableStatus from './SelectableStatus.vue'

const taskStore = useTaskStore()

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  taskId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['close'])

const iconList = [
  { value: 'laptop', src: 'src/assets/laptop.png', alt: 'laptop', size: 30 },
  { value: 'comment', src: 'src/assets/comment.png', alt: 'comment', size: 30 },
  { value: 'teacup', src: 'src/assets/teacup.png', alt: 'teacup', size: 25 },
  { value: 'dumbbell', src: 'src/assets/dumbbell.png', alt: 'dumbbell', size: 25 },
  { value: 'books', src: 'src/assets/book.png', alt: 'books', size: 25 },
  { value: 'clock', src: 'src/assets/clock.png', alt: 'clock', size: 25 },
]

const statusList = [
  { value: 'in-progress', label: 'In Progress', src: 'src/assets/Time_atack_duotone.svg' },
  { value: 'completed', label: 'Completed', src: 'src/assets/Done_round_duotone.svg' },
  { value: "won't do", label: "Won't do", src: 'src/assets/close_ring_duotone-1.svg' },
]

// Form fields
const form = reactive({
  taskName: 'Task in Progress',
  taskDescription: '',
  taskStatus: 'inProgress',
  taskIcon: 'clock',
})

// Populate field if editing
watch(
  () => props.taskId,
  async (newTaskId) => {
    if (newTaskId) {
      const task = await taskStore.getTaskById(newTaskId)
      form.taskName = task.name || ''
      form.taskDescription = task.description || ''
      form.taskStatus = task.status || ''
      form.taskIcon = task.icon || ''
    } else {
      form.taskName = 'Task in Progress'
      form.taskDescription = ''
      form.taskStatus = 'in-progress'
      form.taskIcon = 'clock'
    }
  },
  { immediate: true },
)

function closeModal() {
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    @click.self="closeModal"
    class="fixed inset-0 transition-opacity duration-300 ease-in-out bg-black/50"
  >
    <aside
      class="fixed top-0 right-0 h-screen w-[630px] p-3 bg-transparent transform transition-transform duration-300 ease-in-out"
    >
      <div class="flex flex-col h-full bg-white rounded-lg">
        <form class="h-full">
          <div class="relative flex flex-col items-center justify-start w-full h-full p-5">
            <div class="flex justify-between w-full mb-4">
              <h4 class="text-xl font-semibold">Task details</h4>
              <button
                class="p-2 border border-gray-300 rounded-lg cursor-pointer"
                @click.prevent="closeModal"
              >
                <img
                  src="../assets/close_ring_duotone-1.svg"
                  alt="close nav"
                  width="20"
                  height="20"
                />
              </button>
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label class="text-sm text-gray-400" htmlFor="taskname">Task name</label>
              <input
                id="taskname"
                name="taskName"
                v-model="form.taskName"
                required
                type="text"
                placeholder="Task name"
                class="p-2 text-lg border border-gray-300 rounded-lg focus:outline-2 focus:outline-blue-500 focus:border-none"
                autoFocus
              />
            </div>
            <div class="flex flex-col w-full gap-1 mb-3">
              <label class="text-sm text-gray-400" htmlFor="taskDescription">Description</label>
              <textarea
                name="taskDescription"
                v-model="form.taskDescription"
                placeholder="Enter a short description"
                class="w-full h-40 p-2 text-gray-500 align-top border border-gray-300 rounded-md text-start"
                maxLength="400"
              />
            </div>

            <div class="w-full my-3">
              <p class="mb-2 text-sm text-gray-400">Icon</p>
              <div class="flex w-full gap-3">
                <SelectableIcon
                  v-for="icon in iconList"
                  :key="icon.value"
                  :value="icon.value"
                  :src="icon.src"
                  :alt="icon.alt"
                  :size="icon.size"
                  :isSelected="form.taskIcon === icon.value"
                  @select="form.taskIcon = $event"
                />
              </div>
            </div>

            <div class="flex flex-col w-full mb-3">
              <p class="mb-2 text-sm text-gray-400">Status</p>
              <fieldset class="flex flex-wrap gap-3" role="radiogroup" aria-label="Task Status">
                <SelectableStatus
                  v-for="status in statusList"
                  :key="status.value"
                  :value="status.value"
                  :label="status.label"
                  :src="status.src"
                  :isSelected="form.taskStatus === status.value"
                  @select="form.taskStatus = $event"
                />
              </fieldset>
            </div>

            <footer class="flex items-end justify-end w-full h-full gap-5 text-white">
              <button
                v-if="props.taskId"
                class="flex items-center gap-3 py-1 px-5 bg-[#3662E3] border-none rounded-2xl not-disabled:cursor-pointer disabled:bg-gray-300 cursor-default"
              >
                Delete
                <img src="../assets/Trash.svg" alt="Trash Icon" width="15" height="15" />
              </button>
              <button
                class="flex items-center gap-3 py-1 px-5 bg-[#3662E3] border-none rounded-2xl cursor-pointer"
              >
                Save
                <img
                  src="../assets/Done_round.svg"
                  alt="Trash Icon"
                  width="15"
                  height="15"
                  class="pt-1"
                />
              </button>
            </footer>
          </div>
        </form>
      </div>
    </aside>
  </div>
</template>
