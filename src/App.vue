<script setup>
// import AddTaskModal from './components/addTaskModal.vue';
import BoardHeader from './components/BoardHeader.vue'
import TasksContainer from './components/TasksContainer.vue';
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
    <BoardHeader />
    <TasksContainer />
    <!-- <AddTaskModal /> -->
  </section>
</template>
