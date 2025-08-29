<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <div 
      v-for="field in fields" 
      :key="field.name" 
      class="grid grid-cols-1 sm:grid-cols-1 gap-6"
    >
      <div :class="field.fullWidth ? 'sm:col-span-6' : 'sm:col-span-3'">
        <div class="relative">
          <!-- Label -->
          <label
            :for="field.name"
            class="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold text-gray-600"
          >
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>

          <!-- Input -->
          <input
            v-if="['text','email','password','number','date'].includes(field.type)"
            :type="field.type"
            :id="field.name"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            :required="field.required"
            :disabled="field.disabled || loading"
            class="w-full rounded-xl border border-gray-300 bg-white px-2 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'border-red-400 ring-red-400': errors[field.name] }"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="field.name"
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            :rows="field.rows || 3"
            :disabled="field.disabled || loading"
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400 ring-red-400': errors[field.name] }"
          ></textarea>

          <!-- Select -->
          <select
            v-else-if="field.type === 'select'"
            :id="field.name"
            v-model="formData[field.name]"
            :disabled="field.disabled || loading"
            class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            :class="{ 'border-red-400 ring-red-400': errors[field.name] }"
          >
            <option v-if="field.placeholder" value="">{{ field.placeholder }}</option>
            <option v-for="option in field.options" :key="option.value || option" :value="option.value || option">
              {{ option.label || option }}
            </option>
          </select>

          <!-- Checkbox -->
          <div v-else-if="field.type === 'checkbox'" class="flex items-center space-x-2">
            <input
              :id="field.name"
              v-model="formData[field.name]"
              type="checkbox"
              class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label :for="field.name" class="text-sm text-gray-700">
              {{ field.description }}
            </label>
          </div>

          <!-- Radio -->
          <div v-else-if="field.type === 'radio'" class="space-y-2">
            <div v-for="option in field.options" :key="option.value || option" class="flex items-center space-x-2">
              <input
                :id="`${field.name}-${option.value || option}`"
                v-model="formData[field.name]"
                :value="option.value || option"
                type="radio"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label :for="`${field.name}-${option.value || option}`" class="text-sm text-gray-700">
                {{ option.label || option }}
              </label>
            </div>
          </div>

          <!-- Error Message -->
          <p v-if="errors[field.name]" class="mt-2 text-sm text-red-500">
            {{ errors[field.name] }}
          </p>

          <!-- Help Text -->
          <p v-if="field.helpText" class="mt-1 text-xs text-gray-500">
            {{ field.helpText }}
          </p>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('cancel')"
        :disabled="loading"
        class="cursor-pointer rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
      >
        {{ cancelText }}
      </button>

      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="cursor-pointer flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-md hover:from-indigo-600 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0c..."></path>
        </svg>
        {{ loading ? loadingText : submitText }}
      </button>
    </div>
  </form>
</template>


<script>
export default {
  name: 'DynamicForm',
  props: {
    fields: {
      type: Array,
      required: true
    },
    initialData: {
      type: Object,
      default: () => ({})
    },
    validationSchema: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    submitText: {
      type: String,
      default: 'Submit'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    loadingText: {
      type: String,
      default: 'Saving...'
    },
    validateOnInput: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: { ...this.initialData },
      errors: {},
      touched: {}
    };
  },
  computed: {
    isFormValid() {
      return Object.keys(this.errors).length === 0;
    }
  },
  methods: {
    async handleSubmit() {
      this.touched = Object.keys(this.formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});

      if (this.validationSchema) {
        try {
          await this.validationSchema.validate(this.formData, { abortEarly: false });
          this.errors = {};
          this.$emit('submit', this.formData);
        } catch (err) {
          this.errors = {};
          err.inner.forEach(error => {
            this.errors[error.path] = error.message;
          });
          this.$emit('validation-error', this.errors);
        }
      } else {
        this.$emit('submit', this.formData);
      }
    },
    async validateField(fieldName) {
      if (!this.validationSchema || !this.touched[fieldName]) return;
      
      try {
        await this.validationSchema.validateAt(fieldName, this.formData);
        this.$delete(this.errors, fieldName);
      } catch (err) {
        this.$set(this.errors, fieldName, err.message);
      }
    },
    updateField(fieldName, value) {
      this.$set(this.formData, fieldName, value);
      if (this.validateOnInput) {
        this.validateField(fieldName);
      }
    },
    resetForm() {
      this.formData = { ...this.initialData };
      this.errors = {};
      this.touched = {};
    }
  },
  watch: {
    initialData: {
      deep: true,
      handler(newVal) {
        this.formData = { ...newVal };
      }
    },
    formData: {
      deep: true,
      handler(newVal) {
        this.$emit('update:formData', newVal);
      }
    }
  },
  mounted() {
    // Initialize form data with default values
    this.fields.forEach(field => {
      if (field.default !== undefined && this.formData[field.name] === undefined) {
        this.$set(this.formData, field.name, field.default);
      }
    });
  }
};
</script>