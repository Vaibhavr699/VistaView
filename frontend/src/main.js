import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuexPersist from './utils/vuex-persist';
import * as directives from './directives';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

// Import Flowbite after Tailwind
import 'flowbite';

// Import global styles
import './assets/css/main.css';

const app = createApp(App);





// Toast configuration
const toastOptions = {
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

// Use plugins
app.use(store);
app.use(router);
app.use(Toast, toastOptions);

// Initialize Vuex persistence
vuexPersist(store);

// Register global directives
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key]);
});

// Global error handler
app.config.errorHandler = (err) => {
  console.error('Vue error:', err);
  // You could dispatch to a store error module here
  // store.dispatch('errors/setError', err);
};

// Make store globally available for API interceptors
window.store = store;

// Initialize authentication state before mounting the app
async function initializeApp() {
  await store.dispatch('auth/initializeAuth');
  // Mount the app
  app.mount('#app');
}
initializeApp();

// Only for development - remove in production
if (import.meta.env.DEV) {
  window.app = app; // Make app accessible in browser console
}