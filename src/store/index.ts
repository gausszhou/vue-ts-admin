import Vue from 'vue';
import Vuex from 'vuex';
import ui from './modules/ui';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV != "production";

export default new Vuex.Store({
  modules: {
    ui,
    user
  },
  strict: debug
})
