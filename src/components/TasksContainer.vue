<script setup>
import { onMounted, defineProps } from 'vue'
import NewTaskBtn from './newTaskBtn.vue'
import TaskCard from './TaskCard.vue'
import { useTaskStore } from '@/stores/TaskStore'
import { storeToRefs } from 'pinia'

const props = defineProps({
  boardId: String,
})

const taskStore = useTaskStore()
const { tasks, loading } = storeToRefs(taskStore)

onMounted(async () => {
  // This is where you can fetch data or perform any setup when the component is mounted
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
      <TaskCard :task="task" />
    </div>
    <NewTaskBtn />
  </section>
</template>

<!--
inProgress: {
            bgColor: 'bg-[#F5D565]',
            icon: '/Time_atack_duotone.svg',
            defaultTitle: 'Task in Progress',
            rightIcon: {
                bgColor: 'bg-[#E9A23B]',
                icon: '/Time_atack_duotone.svg'
            }
        },
        toDo: {
            bgColor: 'bg-[#E9EDF1]',
            icon: '/Done_round.svg',
            defaultTitle: 'Task To Do'
        },
        dontDo: {
            bgColor: 'bg-[#F8C4C4]',
            icon: '/Done_round.svg',
            defaultTitle: 'Task Wont Do',
            rightIcon: {
                bgColor: 'bg-red-500',
                icon: '/close_ring_duotone.svg'
            }
        },
        completed: {
            bgColor: 'bg-[#A8E4B1]',
            icon: '/Done_round.svg',
            defaultTitle: 'Task Completed',
            rightIcon: {
                bgColor: 'bg-green-500',
                icon: '/Done_round.svg'
            }
        }
-->
