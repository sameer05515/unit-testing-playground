import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import FilesBrowser from './views/FilesBrowser.vue';
import ScanView from './views/ScanView.vue';
import DeletedFiles from './views/DeletedFiles.vue';

const routes = [
  { path: '/', component: FilesBrowser },
  { path: '/scan', component: ScanView },
  { path: '/deleted', component: DeletedFiles }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');

