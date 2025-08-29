<script setup>
import { useStore } from 'vuex';
import { onMounted } from 'vue';

const store = useStore();

// Initialize any app-wide data when component mounts
onMounted(() => {
  console.log('App mounted');
  // You could initialize user authentication status here
  // store.dispatch('auth/initialize');
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<style scoped>
/* Add any component-specific styles here */
.container {
  max-width: 1200px;
}
</style>