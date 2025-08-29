<template>
  <div :class="{ dark: isDarkMode }" class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <Navbar @toggle-dark-mode="toggleDarkMode" :is-dark-mode="isDarkMode" />

    <div class="p-6 max-w-full mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Admin Dashboard
        </h2>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div
          class="cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl 
                 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <p class="text-slate-500 dark:text-slate-400">Total Users</p>
          <h3 class="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {{ totalUsers }}
          </h3>
        </div>

        <div
          class="cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl 
                 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <p class="text-slate-500 dark:text-slate-400">Active Users</p>
          <h3 class="mt-1 text-2xl font-semibold text-emerald-600">
            {{ activeUsers }}
          </h3>
        </div>

        <div
          class="cursor-pointer p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl 
                 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
        >
          <p class="text-slate-500 dark:text-slate-400">Admins</p>
          <h3 class="mt-1 text-2xl font-semibold text-indigo-600">
            {{ admins }}
          </h3>
        </div>
      </div>

      <!-- Users Table -->
      <div
        class="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm"
      >
        <table class="min-w-full">
          <thead>
            <tr
              class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-left"
            >
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">ID</th>
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">Name</th>
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">Email</th>
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">Role</th>
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">Status</th>
              <th class="py-3 px-4 text-xs font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id || user._id"
              class="border-t border-slate-200 dark:border-slate-800 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <td class="py-3 px-4 text-slate-900 dark:text-slate-100">
                {{ user.id || user._id }}
              </td>
              <td class="py-3 px-4 text-slate-900 dark:text-slate-100">
                {{ user.name }}
              </td>
              <td class="py-3 px-4 text-slate-700 dark:text-slate-300">
                {{ user.email }}
              </td>
              <td class="py-3 px-4">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="
                    user.role === 'admin'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  "
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="py-3 px-4">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  :class="
                    user.status === 'active'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  "
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="py-3 px-4 space-x-2">
                <button
                  @click="openDeleteModal(user)"
                  class="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium 
                         bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-colors duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="!loading && users.length === 0">
              <td
                colspan="6"
                class="py-6 px-4 text-center text-slate-500 dark:text-slate-400"
              >
                No users found.
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="loading"
          class="p-6 text-center text-slate-500 dark:text-slate-400"
        >
          Loading users...
        </div>
      </div>
    </div>

    <!-- Confirmation Modal -->
    <Modal
      :show="showModal"
      :title="modalTitle"
      :message="modalMessage"
      @confirm="confirmModal"
      @cancel="cancelModal"
    />
  </div>
</template>


<script>
import Navbar from '../components/Navbar.vue'
import Modal from '../components/Modal.vue'
import { getAllUsers, deleteUser } from '../services/userService.js';

export default {
  components: { Navbar, Modal },
  data() {
    return {
      isDarkMode: false,
      users: [],
      totalUsers: 0,
      activeUsers: 0,
      admins: 0,
      inactiveUsers: 0,
      loading: false,
      
      // modal
      showModal: false,
      modalTitle: 'Confirm Action',
      modalMessage: '',
      modalAction: null,
      targetUser: null
    }
  },
  async mounted() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true'
    const isAuthenticated = this.$store.getters['auth/isAuthenticated']
    const isAdmin = this.$store.getters['auth/isAdmin']
    if (isAuthenticated && isAdmin) {
      await this.fetchUsers()
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('darkMode', this.isDarkMode)
    },
    async fetchUsers() {
      if (this.loading) return;
      this.loading = true;
      try {
        const response = await getAllUsers();
        const payload = response.data.users || response.data;
        this.users = Array.isArray(payload) ? payload : [];
        this.totalUsers = this.users.length;
        this.activeUsers = this.users.filter(u => u.status === 'active').length;
        this.admins = this.users.filter(u => u.role === 'admin').length;
        this.inactiveUsers = this.users.filter(u => u.status === 'banned').length;
      } catch (error) {
        this.$store.dispatch('toast/showToast', {
          message: error.response?.data?.message || 'Failed to fetch users',
          type: 'error'
        }, { root: true });
        if (error.response?.status === 401) {
          this.users = [];
        }
      } finally {
        this.loading = false;
      }
    },
    openDeleteModal(user) {
      this.modalAction = 'delete';
      this.targetUser = user;
      this.modalTitle = 'Delete User';
      this.modalMessage = `Are you sure you want to permanently delete ${user.email}? This action cannot be undone.`;
      this.showModal = true;
    },
    openBanModal(user) {
      this.modalAction = 'ban';
      this.targetUser = user;
      this.modalTitle = 'Ban User';
      this.modalMessage = `Are you sure you want to ban ${user.email}? They will lose access.`;
      this.showModal = true;
    },
    openUnbanModal(user) {
      this.modalAction = 'unban';
      this.targetUser = user;
      this.modalTitle = 'Unban User';
      this.modalMessage = `Are you sure you want to unban ${user.email}? They will regain access.`;
      this.showModal = true;
    },
    async confirmModal() {
      if (!this.modalAction || !this.targetUser) return;
      try {
        if (this.modalAction === 'delete') {
          await deleteUser(this.targetUser.id || this.targetUser._id);
          this.$store.dispatch('toast/showToast', { message: 'User deleted successfully', type: 'success' }, { root: true });
          // Optimistically remove from list
          const id = this.targetUser.id || this.targetUser._id;
          this.users = this.users.filter(u => (u.id || u._id) !== id);
          this.totalUsers = this.users.length;
          this.activeUsers = this.users.filter(u => u.status === 'active').length;
          this.admins = this.users.filter(u => u.role === 'admin').length;
          this.inactiveUsers = this.users.filter(u => u.status === 'banned').length;
        }
        // Background refresh
        this.fetchUsers();
      } catch (error) {
        this.$store.dispatch('toast/showToast', { message: error.response?.data?.message || 'Action failed', type: 'error' }, { root: true });
      } finally {
        this.cancelModal();
      }
    },
    cancelModal() {
      this.showModal = false;
      this.modalAction = null;
      this.targetUser = null;
    }
  }
}
</script>
