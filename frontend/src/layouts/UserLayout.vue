<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Enhanced Navbar -->
    <nav
      class="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50"
    >
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1
                class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              >
                Dashboard
              </h1>
            </div>
          </div>

          <!-- Profile Section -->
          <div class="relative">
            <button
              @click="toggleProfileDropdown"
              class="cursor-pointer flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg"
                >
                  {{ getInitials(currentUser.name) }}
                </div>

                <div
                  v-if="showCreateTaskModal"
                  class="fixed z-50 inset-0 overflow-y-auto"
                >
                  <div
                    class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
                  >
                    <!-- Background Overlay -->
                    <div
                      class="fixed inset-0 transition-opacity"
                      @click="closeCreateTaskModal"
                    >
                      <div
                        class="absolute inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm"
                      ></div>
                    </div>

                    <!-- Modal Content -->
                    <div
                      class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up"
                    >
                      <!-- Header -->
                      <div
                        class="flex justify-between items-center px-6 py-4 border-b"
                      >
                        <div class="flex items-center space-x-2">
                          <svg
                            class="w-6 h-6 text-indigo-600"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <h3 class="text-lg font-semibold text-gray-900">
                            Create New Task
                          </h3>
                        </div>
                        <button
                          @click="closeCreateTaskModal"
                          class="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                        >
                          <svg
                            class="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <!-- Body -->
                      <div class="px-6 py-6">
                        <Form
                          :fields="taskFormFields"
                          @submit="handleCreateTaskSubmit"
                          @cancel="closeCreateTaskModal"
                          class="space-y-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="hidden md:block text-left">
                  <p class="text-sm font-semibold text-gray-900">
                    {{ currentUser.name }}
                  </p>
                  <p class="text-xs text-gray-500 capitalize">
                    {{ currentUser.role }}
                  </p>
                </div>
              </div>
              <svg
                class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors"
                :class="{ 'rotate-180': showProfileDropdown }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- Enhanced Profile Dropdown -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="showProfileDropdown"
                class="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50"
              >
                <!-- Profile Header -->
                <div
                  class="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"
                >
                  <div class="flex items-center space-x-4">
                    <div
                      class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm"
                    >
                      {{ getInitials(currentUser.name) }}
                    </div>
                    <div class="text-white">
                      <h3 class="font-semibold text-lg">
                        {{ currentUser.name }}
                      </h3>
                      <p class="text-blue-100 text-sm">
                        {{ currentUser.email }}
                      </p>
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white mt-1 capitalize"
                      >
                        {{ currentUser.role }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Profile Details -->
                <div class="px-6 py-4 space-y-3">
                  <div class="grid grid-cols-2 gap-4 text-sm">
                    
                    <div class="space-y-2">
                      <div>
                        <p
                          class="text-gray-500 text-xs font-medium uppercase tracking-wide"
                        >
                          Status
                        </p>
                        <div class="flex items-center space-x-1">
                          <div
                            class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                          ></div>
                          <span class="text-green-600 font-medium text-xs"
                            >Active</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="border-t border-gray-100 px-2 py-2">
                  <button
                    @click="openEditModal"
                    class="cursor-pointer w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                    Edit Profile
                  </button>
                  
                  <button
                    @click="handleLogout"
                    class="cursor-pointer w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="py-8">
      <main>
        <div class="max-w-full mx-auto sm:px-6 lg:px-8">
          <div class="px-4 sm:px-0">
            <!-- Header -->
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {{ currentUser?.name?.split(" ")[0] || "User" }}!
                👋
              </h2>
              <p class="text-gray-600">
                Manage your tasks and profile information
              </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div
                class="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">Total Tasks</p>
                    <p class="text-3xl font-bold text-gray-900">
                      {{ allTasks.length }}
                    </p>
                  </div>
                  <div
                    class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13V9a2 2 0 002 2h2m-4-4v4"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">Completed</p>
                    <p class="text-3xl font-bold text-green-600">
                      {{ completedTasks }}
                    </p>
                  </div>
                  <div
                    class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                class="cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-600">In Progress</p>
                    <p class="text-3xl font-bold text-yellow-600">
                      {{ inProgressTasks }}
                    </p>
                  </div>
                  <div
                    class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tasks Section -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div
                class="px-6 py-5 border-b border-gray-100 flex items-center justify-between"
              >
                <h3 class="text-xl font-semibold text-gray-900">My Tasks</h3>
                <button
                  @click="openCreateTaskModal"
                  class="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add New Task
                </button>
              </div>

              <div class="p-6">
                <div v-if="isLoadingTasks" class="text-center py-12">
                  <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
                  ></div>
                  <p class="mt-4 text-gray-600">Loading tasks...</p>
                </div>
                <div
                  v-else-if="allTasks.length === 0"
                  class="text-center py-12"
                >
                  <svg
                    class="mx-auto h-12 w-12 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13V9a2 2 0 002 2h2m-4-4v4"
                    ></path>
                  </svg>
                  <h3 class="mt-4 text-lg font-medium text-gray-900">
                    No tasks yet
                  </h3>
                  <p class="mt-2 text-gray-500">
                    Get started by creating your first task!
                  </p>
                </div>
                <div v-else class="space-y-4">
                  <div
                    v-for="task in allTasks"
                    :key="task.id"
                    class="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-2">
                          <h4 class="text-lg font-semibold text-gray-900">
                            {{ task.title }}
                          </h4>
                          <span
                            :class="{
                              'bg-yellow-100 text-yellow-800':
                                task.status === 'pending',
                              'bg-blue-100 text-blue-800':
                                task.status === 'in-progress',
                              'bg-green-100 text-green-800':
                                task.status === 'completed',
                            }"
                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          >
                            {{ task.status }}
                          </span>
                        </div>
                        <p class="text-gray-600">{{ task.description }}</p>
                      </div>
                      <div class="flex space-x-2 ml-4">
                        <button
                          @click="openEditTaskModal(task)"
                          class="cursor-pointer px-3 py-1.5 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          @click="openDeleteTaskModal(task)"
                          class="cursor-pointer px-3 py-1.5 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modals -->
            <!-- Create Task Modal -->
            <div
              v-if="showCreateTaskModal"
              class="fixed z-50 inset-0 overflow-y-auto"
            >
              <div
                class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
              >
                <!-- Background Overlay -->
                <div
                  class="fixed inset-0 transition-opacity"
                  @click="closeCreateTaskModal"
                >
                  <div
                    class="absolute inset-0 bg-blur bg-opacity-70 backdrop-blur-sm"
                  ></div>
                </div>

                <!-- Modal Content -->
                <div
                  class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up"
                >
                  <!-- Header -->
                  <div
                    class="flex justify-between items-center px-6 py-4 border-b"
                  >
                    <div class="flex items-center space-x-2">
                      <svg
                        class="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <h3 class="text-lg font-semibold text-gray-900">
                        Create New Task
                      </h3>
                    </div>
                    <button
                      @click="closeCreateTaskModal"
                      class="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                    >
                      <svg
                        class="cursor-pointer h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Body -->
                  <div class="px-6 py-6">
                    <Form
                      :fields="taskFormFields"
                      @submit="handleCreateTaskSubmit"
                      @cancel="closeCreateTaskModal"
                      class="space-y-4"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Edit Task Modal -->
            <div
              v-if="showEditTaskModal"
              class="fixed z-50 inset-0 overflow-y-auto"
            >
              <div
                class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
              >
                <!-- Background Overlay -->
                <div
                  class="fixed inset-0 transition-opacity"
                  @click="closeEditTaskModal"
                >
                  <div
                    class="absolute inset-0 bg-blur bg-opacity-70 backdrop-blur-sm"
                  ></div>
                </div>
                <!-- Modal Content -->
                <div
                  class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-fade-in-up"
                >
                  <!-- Header -->
                  <div
                    class="flex justify-between items-center px-6 py-4 border-b"
                  >
                    <h3 class="text-lg font-semibold text-gray-900">
                      Edit Task
                    </h3>
                    <button
                      @click="closeEditTaskModal"
                      class="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
                    >
                      <svg
                        class="cursor-pointer h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- Body -->
                  <div class="px-6 py-6">
                    <Form
                      :fields="taskFormFields"
                      :initial-data="currentTaskData"
                      @submit="handleUpdateTaskSubmit"
                      @cancel="closeEditTaskModal"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Edit Profile Modal -->
            <div
              v-if="showEditModal"
              class="fixed z-50 inset-0 overflow-y-auto"
            >
              <div
                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
              >
                <div
                  class="fixed inset-0 transition-opacity"
                  @click="closeEditModal"
                >
                  <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div
                  class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                >
                  <div class="bg-white px-6 pt-6 pb-4">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6">
                      Edit Profile
                    </h3>
                    <Form
                      :fields="userFormFields"
                      :initial-data="currentUserData"
                      @submit="handleUserSubmit"
                      @cancel="closeEditModal"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Delete Task Confirmation Modal -->
            <div v-if="showDeleteTaskModal">
              <Modal
                :show="showDeleteTaskModal"
                title="Delete Task"
                message="Are you sure you want to delete this task? This action cannot be undone."
                @confirm="confirmDeleteTask"
                @cancel="cancelDeleteTask"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 0.3s ease-out;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import Form from "../components/Form.vue";
import taskService from "@/services/taskService";
// Removed direct user update service; use Vuex auth action instead
import { useToast } from "vue-toastification";
import Modal from "../components/Modal.vue";

export default {
  name: "UserDashboard",
  components: {
    Form,
    Modal,
  },
  data() {
    return {
      showProfileDropdown: false,
      showCreateTaskModal: false,
      showEditTaskModal: false,
      showEditModal: false,
      showDeleteTaskModal: false,
      deleteTaskId: null,
      updatingProfile: false,
      currentTaskData: null,
      currentUserData: null,
      isLoadingTasks: false,
      allTasks: [],
      taskFormFields: [
        { name: "title", type: "text", label: "Title", required: true },
        { name: "description", type: "textarea", label: "Description" },
        {
          name: "status",
          type: "select",
          label: "Status",
          options: [
            { value: "pending", label: "Pending" },
            { value: "in-progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
          ],
        },
      ],
      userFormFields: [
        { name: "name", type: "text", label: "Full Name", required: true },
        {
          name: "email",
          type: "email",
          label: "Email Address",
          required: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    completedTasks() {
      return this.allTasks.filter((task) => task.status === "completed").length;
    },
    inProgressTasks() {
      return this.allTasks.filter((task) => task.status === "in-progress")
        .length;
    },
  },
  methods: {
    ...mapActions("auth", ["updateProfile", "logout"]),
    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    },
    getInitials(name) {
      if (!name) return "";
      return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
    },
    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    openEditModal() {
      this.currentUserData = { ...this.currentUser };
      this.showEditModal = true;
      this.showProfileDropdown = false;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.currentUserData = null;
    },
    openCreateTaskModal() {
      this.showCreateTaskModal = true;
    },
    closeCreateTaskModal() {
      this.showCreateTaskModal = false;
    },
    openEditTaskModal(task) {
      this.currentTaskData = { ...task };
      this.showEditTaskModal = true;
    },
    closeEditTaskModal() {
      this.showEditTaskModal = false;
      this.currentTaskData = null;
    },
    async handleUserSubmit(formData) {
      if (this.updatingProfile) return;
      this.updatingProfile = true;
      try {
        const payload = { id: this.currentUser.id, ...formData };
        await this.updateProfile(payload);
        useToast().success("Profile updated successfully!");
        this.closeEditModal();
      } catch (error) {
        const message = typeof error === 'string'
          ? error
          : (error?.response?.data?.message || error?.message || 'Unknown error');
        useToast().error("Failed to update profile: " + message);
      } finally {
        this.updatingProfile = false;
      }
    },
    handleLogout() {
      this.logout();
      this.$router.push("/login");
    },
    async handleCreateTaskSubmit(formData) {
      try {
        await taskService.createTask(formData);
        useToast().success("Task created successfully!");
        this.closeCreateTaskModal();
        this.fetchTasks();
      } catch (error) {
        useToast().error(
          "Failed to create task: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    async handleUpdateTaskSubmit(formData) {
      try {
        await taskService.updateTask(this.currentTaskData.id, formData);
        useToast().success("Task updated successfully!");
        this.closeEditTaskModal();
        this.fetchTasks();
      } catch (error) {
        useToast().error(
          "Failed to update task: " +
            (error.response?.data?.message || error.message)
        );
      }
    },
    openDeleteTaskModal(task) {
      this.deleteTaskId = task.id;
      this.showDeleteTaskModal = true;
    },
    async confirmDeleteTask() {
      try {
        await taskService.deleteTask(this.deleteTaskId);
        useToast().success("Task deleted successfully!");
        this.fetchTasks();
      } catch (error) {
        useToast().error(
          "Failed to delete task: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        this.cancelDeleteTask();
      }
    },
    cancelDeleteTask() {
      this.showDeleteTaskModal = false;
      this.deleteTaskId = null;
    },
    async fetchTasks() {
      // Prevent duplicate calls
      if (this.isLoadingTasks) return;

      this.isLoadingTasks = true;
      try {
        const response = await taskService.getAllTasks();
        this.allTasks = response.data;
      } catch (error) {
        // Don't retry on 401 errors to prevent rate limiting
        if (error.response?.status !== 401) {
          useToast().error(
            "Failed to fetch tasks: " +
              (error.response?.data?.message || error.message)
          );
        } else {
          // Clear tasks on 401
          this.allTasks = [];
        }
      } finally {
        this.isLoadingTasks = false;
      }
    },
  },
  async mounted() {
    // Only fetch tasks if authenticated
    const isAuthenticated = this.$store.getters["auth/isAuthenticated"];
    if (isAuthenticated) {
      await this.fetchTasks();
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".relative")) {
        this.showProfileDropdown = false;
      }
    });
  },
};
</script>
