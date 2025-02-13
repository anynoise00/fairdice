import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';

import App from './App.vue';
import AppView from './views/MainView.vue';

import './assets/app.css';

const routes = [{ path: '/', component: AppView }];

const router = createRouter({
  history: createMemoryHistory(),
  routes,

  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

const app = createApp(App);
app.use(router);
app.mount('#app');
