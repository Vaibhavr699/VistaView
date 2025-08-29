<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative">
    <router-link to="/" class="absolute top-4 left-4 p-2 rounded-full bg-orange-100 border border-orange-300 text-orange-600 hover:bg-orange-200 hover:border-orange-400 transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer">
      <ArrowLeftIcon class="h-6 w-6" />
    </router-link>
    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        
        <h2 class="text-3xl font-bold text-slate-900 mb-2">
          Create Account
        </h2>
        <p class="text-slate-600">
          Join us today and get started
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <form @submit.prevent="register" class="space-y-5">
          <!-- Name Field -->
          <div class="space-y-1">
            <label for="name" class="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <div class="relative">
              <input
                id="name"
                v-model="form.name"
                name="name"
                type="text"
                required
                class="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                :class="{ 'border-red-300 bg-red-50': errors.name }"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="form.name" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="space-y-1">
            <label for="email" class="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
            <label for="password" class="block text-sm font-medium text-slate-700">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a strong password"
                :class="{ 'border-red-300 bg-red-50': errors.password }"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-slate-400 hover:text-slate-600" />
                <EyeSlashIcon v-else class="h-5 w-5 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            
            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="space-y-2">
              <div class="flex space-x-1">
                <div v-for="i in 4" :key="i" class="h-1 flex-1 rounded-full transition-colors duration-300"
                  :class="passwordStrength >= i ? getStrengthColor(passwordStrength) : 'bg-slate-200'">
                </div>
              </div>
              <p class="text-xs text-slate-600">
                Password strength: <span :class="getStrengthTextColor(passwordStrength)">{{ getStrengthText(passwordStrength) }}</span>
              </p>
            </div>
            <p v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password Field -->
          <div class="space-y-1">
            <label for="confirm-password" class="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div class="relative">
              <input
                id="confirm-password"
                v-model="form.confirmPassword"
                name="confirm-password"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
                :class="{ 'border-red-300 bg-red-50': errors.confirmPassword }"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg v-if="form.confirmPassword && form.password === form.confirmPassword" class="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p v-if="errors.confirmPassword" class="text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-start">
            <input
              id="terms"
              v-model="form.acceptTerms"
              name="terms"
              type="checkbox"
              class="cursor-pointer h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label for="terms" class="ml-3 text-sm text-slate-600">
              I agree to the 
              <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Terms of Service</a> 
              and 
              <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Creating Account...' : 'Create Account' }}
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

      <!-- Login Link -->
      <div class="text-center mt-6">
        <p class="text-slate-600">
          Already have an account?
          <router-link to="/login" class="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
            Sign in here
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    ArrowLeftIcon,
    EyeIcon,
    EyeSlashIcon,
  },
  name: 'ModernSignup',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
      },
      loading: false,
      error: null,
      errors: {},
      showPassword: false
    };
  },
  computed: {
    passwordStrength() {
      const password = this.form.password;
      if (!password) return 0;
      
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
      if (/\d/.test(password)) strength++;
      if (/[^a-zA-Z\d]/.test(password)) strength++;
      
      return strength;
    },
    isFormValid() {
      return this.form.name && 
             this.isValidEmail(this.form.email) && 
             this.form.password && 
             this.form.password === this.form.confirmPassword &&
             this.form.acceptTerms &&
             Object.keys(this.errors).length === 0;
    }
  },
  watch: {
    'form.password'() {
      this.validatePassword();
    },
    'form.confirmPassword'() {
      this.validateConfirmPassword();
    },
    'form.email'() {
      this.validateEmail();
    },
    'form.name'() {
      this.validateName();
    }
  },
  methods: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validateName() {
      if (!this.form.name.trim()) {
        this.errors.name = 'Full name is required';
      } else if (this.form.name.trim().length < 2) {
        this.errors.name = 'Name must be at least 2 characters';
      } else {
        delete this.errors.name;
      }
    },
    validateEmail() {
      if (!this.form.email) {
        this.errors.email = 'Email is required';
      } else if (!this.isValidEmail(this.form.email)) {
        this.errors.email = 'Please enter a valid email address';
      } else {
        delete this.errors.email;
      }
    },
    validatePassword() {
      if (!this.form.password) {
        this.errors.password = 'Password is required';
      } else if (this.form.password.length < 8) {
        this.errors.password = 'Password must be at least 8 characters';
      } else if (this.passwordStrength < 2) {
        this.errors.password = 'Password is too weak';
      } else {
        delete this.errors.password;
      }
    },
    validateConfirmPassword() {
      if (!this.form.confirmPassword) {
        this.errors.confirmPassword = 'Please confirm your password';
      } else if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Passwords do not match';
      } else {
        delete this.errors.confirmPassword;
      }
    },
    getStrengthColor(strength) {
      const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
      return colors[strength - 1] || 'bg-slate-200';
    },
    getStrengthText(strength) {
      const texts = ['Very Weak', 'Weak', 'Fair', 'Strong'];
      return texts[strength - 1] || 'Very Weak';
    },
    getStrengthTextColor(strength) {
      const colors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600'];
      return colors[strength - 1] || 'text-red-600';
    },
    async register() {
      // Clear previous errors
      this.error = null;
      this.errors = {};

      // Validate all fields
      this.validateName();
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmPassword();

      // Check if form is valid
      if (!this.isFormValid) {
        this.error = 'Please fix the errors above';
        return;
      }

      this.loading = true;

      try {
        await this.$store.dispatch('auth/register', {
          name: this.form.name.trim(),
          email: this.form.email.toLowerCase().trim(),
          password: this.form.password
        });
        // Show success toast and redirect to login
        if (this.$store && this.$store.dispatch) {
          this.$store.dispatch('toast/showToast', {
            message: 'Account created successfully. You can login now.',
            type: 'success'
          }, { root: true });
        }
        // Ensure no auth state is left from registration response without showing logout toast
        if (this.$store && this.$store.dispatch) {
          try { await this.$store.dispatch('auth/logout', { silent: true }); } catch (e) { /* no-op */ }
        }
        // Add a small delay before redirecting to allow the toast to be seen
        setTimeout(() => {
          this.$router.push('/login');
        }, 1000); // 1 second delay
      } catch (error) {
        console.error('Registration error:', error);
        const message = error?.message || 'An error occurred during registration';
        this.error = message;
        if (this.$toast) {
          this.$toast.error(message);
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>