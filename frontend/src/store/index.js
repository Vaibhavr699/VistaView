import { createStore } from 'vuex';
import auth from './auth';
import toast from './toast';
import users from './users';
import tasks from './tasks';

const store = createStore({
  modules: {
    auth,
    toast,
    users,
    tasks
  }
});


export default store;