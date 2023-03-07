import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from 'moment'

// scss
import '@/css/reset.css'

const app = Vue.createApp(App);
app.use(store).use(router).mount('#app');
app.use(VueAxios, axios);

// date format
app.use(moment);