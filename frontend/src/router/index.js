import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../pages/Signup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import('../pages/Home.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/user',
    name: 'UserDashboard',
    component: () => import('../layouts/UserLayout.vue'),
    meta: { requiresAuth: true },
    children: []
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  // Ensure auth is initialized before enforcing guards (prevents role flashes on reload)
  if (!store.getters['auth/isInitialized']) {
    try {
      await store.dispatch('auth/initializeAuth');
    } catch (error) {
      localStorage.removeItem('token');
    }
  }
  
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  const isAdmin = store.getters['auth/isAdmin'];
  
  // Prevent redirect loops by checking current path
  const isGoingToLogin = to.path === '/login';
  const isGoingToSignup = to.path === '/signup';
  const isGoingToAdmin = to.path === '/admin';
  const isGoingToUser = to.path === '/user';
  
  // Check authentication requirements
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login only if not already going there
    if (!isGoingToLogin) {
      next('/login');
    } else {
      next();
    }
    return;
  }
  
  // Check admin requirements
  if (to.meta.requiresAdmin && isAuthenticated && !isAdmin) {
    // Redirect to user dashboard only if not already there
    if (!isGoingToUser) {
      next('/user');
    } else {
      next();
    }
    return;
  }

  // Admins default to /admin on base or user paths after initialization
  if (isAuthenticated && isAdmin) {
    if (to.path === '/' || to.path === '/user') {
      next('/admin');
      return;
    }
  }

  // Prevent admins from accessing user dashboard
  if (isAuthenticated && isAdmin && isGoingToUser) {
    if (!isGoingToAdmin) {
      next('/admin');
    } else {
      next();
    }
    return;
  }
  
  // Redirect authenticated users away from login/signup
  if (isAuthenticated && (isGoingToLogin || isGoingToSignup)) {
    const targetRoute = isAdmin ? '/admin' : '/user';
    if (to.path !== targetRoute) {
      next(targetRoute);
    } else {
      next();
    }
    return;
  }
  
  // Allow navigation
  next();
});

export default router;