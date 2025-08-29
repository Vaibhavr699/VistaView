<template>
  <div v-if="show" :class="`rounded-md p-4 mb-4 ${typeClasses[type]}`">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <component :is="iconComponent" class="h-5 w-5" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium">
          {{ title }}
        </h3>
        <div v-if="message" class="mt-2 text-sm">
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon, ExclamationIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/vue/outline';

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success',
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      typeClasses: {
        success: 'bg-green-50 text-green-800',
        error: 'bg-red-50 text-red-800',
        warning: 'bg-yellow-50 text-yellow-800',
        info: 'bg-blue-50 text-blue-800'
      },
      icons: {
        success: CheckCircleIcon,
        error: XCircleIcon,
        warning: ExclamationIcon,
        info: InformationCircleIcon
      }
    };
  },
  computed: {
    iconComponent() {
      return this.icons[this.type];
    }
  },
  watch: {
    show(newVal) {
      if (newVal && this.duration > 0) {
        setTimeout(() => {
          this.$emit('close');
        }, this.duration);
      }
    }
  }
};
</script>