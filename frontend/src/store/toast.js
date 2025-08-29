import { useToast } from 'vue-toastification';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    showToast({ commit }, { message, type = 'info', options = {} }) {
      const toast = useToast();
      
      const defaultOptions = {
        position: 'top-right',
        timeout: 3000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: 'button',
        icon: true,
        rtl: false
      };

      const toastOptions = { ...defaultOptions, ...options };

      switch (type) {
        case 'success':
          toast.success(message, toastOptions);
          break;
        case 'error':
          toast.error(message, toastOptions);
          break;
        case 'warning':
          toast.warning(message, toastOptions);
          break;
        case 'info':
        default:
          toast.info(message, toastOptions);
          break;
      }
    }
  },
  getters: {}
}; 