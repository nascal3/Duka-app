import Vue from 'vue'
import { Dialog } from 'element-ui';
import App from './App.vue'

import router from './router'
import store from './store'

Vue.use(Dialog);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
