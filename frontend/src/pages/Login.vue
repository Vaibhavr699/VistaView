<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
    <router-link to="/" class="absolute top-4 left-4 p-2 rounded-full bg-orange-100 border border-orange-300 text-orange-600 hover:bg-orange-200 hover:border-orange-400 transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer">
      <ArrowLeftIcon class="h-6 w-6" />
    </router-link>
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-slate-900 mb-2">
          Welcome Back 👋
        </h2>
        <p class="text-slate-600">
          Sign in to continue to <span class="font-semibold text-blue-600">VistaView</span>
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <form @submit.prevent="submitLogin" class="space-y-5">
          <!-- Email Field -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                :disabled="loading"
                class="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
                :class="{ 'border-red-300 bg-red-50': errors.email }"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="isValidEmail(form.email)" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-slate-700">
                Password
              </label>
              
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                :disabled="loading"
                class="block w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                :class="{ 'border-red-300 bg-red-50': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                :disabled="loading"
              >
                <span v-if="showPassword">Hide</span>
              <span v-else>Show</span>
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center cursor-pointer">
            <input
              id="remember-me"
              v-model="form.rememberMe"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
            />
            <label for="remember-me" class="ml-2 text-sm text-slate-600 cursor-pointer">
              Keep me signed in
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>

          <!-- General Error -->
          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <p class="ml-3 text-sm text-red-800">{{ error }}</p>
            </div>
          </div>
        </form>
      </div>

      <!-- Signup Link -->
      <div class="text-center mt-6">
        <p class="text-slate-600">
          Don't have an account?
          <router-link to="/signup" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200 cursor-pointer">
            Create one here
          </router-link>
        </p>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50 cursor-pointer" @click="showForgotPassword = false">
      <div class="bg-white rounded-2xl p-6 max-w-md w-full cursor-default" @click.stop>
        <h3 class="text-lg font-semibold text-slate-900 mb-4">Reset Password</h3>
        <p class="text-slate-600 mb-4">Enter your email address and we'll send you a link to reset your password.</p>
        <form @submit.prevent="sendPasswordReset">
          <div class="mb-4">
            <input
              v-model="resetEmail"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              required
            />
          </div>
          <div class="flex space-x-3">
            <button
              type="button"
              @click="showForgotPassword = false"
              class="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    EyeIcon,
    EyeSlashIcon,
    ArrowLeftIcon,
  },
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      loading: false,
      errors: {},
      error: null,
      showPassword: false,
      showForgotPassword: false,
      resetEmail: '',
    };
  },
  computed: {
    isFormValid() {
      return this.form.email && this.form.password;
    },
  },
  methods: {
    ...mapActions('auth', ['login', 'sendPasswordResetLink']),
    async submitLogin() {
      this.loading = true;
      this.error = null;
      this.errors = {};

      try {
        const user = await this.login(this.form);
        const target = user?.role === 'admin' ? '/admin' : '/user';
        this.$router.push(target);
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred.';
        if (err.errors) {
          this.errors = err.errors;
        }
      } finally {
        this.loading = false;
      }
    },
    isValidEmail(email) {
      // Basic email validation regex
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    },
    async sendPasswordReset() {
      if (!this.resetEmail) {
        alert('Please enter your email address.');
        return;
      }
      try {
        await this.sendPasswordResetLink(this.resetEmail);
        alert('Password reset link sent to your email.');
        this.showForgotPassword = false;
        this.resetEmail = '';
      } catch (error) {
        alert(error.message || 'Failed to send password reset link.');
      }
    },
  },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
