<template>
  <nav :class="{'bg-gray-800 shadow-md': isAdminDashboard, 'bg-white shadow-sm': !isAdminDashboard}">
    <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        
        <!-- Logo -->
        <div class="flex-shrink-0">
          <h1 :class="{'text-white': isAdminDashboard, 'text-indigo-600': !isAdminDashboard}" class="text-xl font-bold">VistaView</h1>
        </div>

        <!-- Desktop User Controls -->
        <div class="hidden sm:flex sm:items-center sm:space-x-4">
          <span :class="{'text-gray-300': isAdminDashboard, 'text-gray-600': !isAdminDashboard}" class="font-medium">{{ currentUser ? currentUser.name : 'Guest' }}</span>
          <button 
            @click="logout"
            class="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Logout
          </button>
        </div>

        <!-- Mobile User Controls -->
        <div class="flex sm:hidden items-center space-x-2">
          <span :class="{'text-gray-300': isAdminDashboard, 'text-gray-600': !isAdminDashboard}" class="text-sm font-medium truncate max-w-[100px]">
            {{ currentUser ? currentUser.name : 'Guest' }}
          </span>
          <button 
            @click="logout"
            class="cursor-pointer px-3 py-1 text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500">
            Logout
          </button>
        </div>
        
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['currentUser']),
    isAdminDashboard() {
      return this.$route.path.startsWith('/admin');
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
