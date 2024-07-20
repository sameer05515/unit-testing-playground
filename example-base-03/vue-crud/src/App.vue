<!-- src/App.vue -->
<template>
  <div id="app">
    <StudentComponent />
  </div>
</template>

<script>
import StudentComponent from './components/StudentComponent.vue';

export default {
  name: 'App',
  components: {
    StudentComponent
  }
};
</script>

<style>
/* Add your styles here */
</style>
