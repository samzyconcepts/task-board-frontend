<script setup>
import NewTaskBtn from './newTaskBtn.vue'
import TaskCard from './TaskCard.vue'
</script>

<template>
  <section class="my-8 space-y-4">
    <TaskCard />
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
