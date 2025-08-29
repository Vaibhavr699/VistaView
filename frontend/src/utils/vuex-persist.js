export default function (store) {
  // Don't use vuex-persist for auth state - let auth module handle it
  // This prevents conflicts with auth.initializeAuth
  
  // Only persist non-auth state if needed
  const persistState = (state) => {
    const { auth, ...rest } = state;
    return rest;
  };

  // Initialize store from localStorage if data exists (excluding auth)
  if (typeof localStorage !== 'undefined' && localStorage.getItem('vuex')) {
    try {
      const persistedState = JSON.parse(localStorage.getItem('vuex'));
      const currentState = store.state;
      
      // Merge persisted state with current state, excluding auth
      const mergedState = {
        ...currentState,
        ...persistedState,
        auth: currentState.auth // Keep auth from current state
      };
      
      store.replaceState(mergedState);
    } catch (e) {
      console.error('Failed to parse persisted Vuex state:', e);
    }
  }

  // Subscribe to store changes - exclude auth module
  store.subscribe((mutation, state) => {
    const stateToPersist = persistState(state);
    localStorage.setItem('vuex', JSON.stringify(stateToPersist));
  });
}
