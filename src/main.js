import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App);
// 192.168.18.56
app.config.globalProperties.hostname = "http://localhost:8080"
app.use(router)
app.use(VueAxios, axios)
app.use(VueLoading)
app.mount('#app')