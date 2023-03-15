import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import 'reset-css';
import "element-ui/lib/theme-chalk/index.css";
import "nprogress/nprogress.css";
import "@/assets/fonts/iconfont.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";
import "@/assets/styles/index.scss";

import Element from '@/utils/element'
Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
