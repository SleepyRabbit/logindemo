/**
 * Created by houenxing on 17/1/19.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import login from './config/login';
import devcenter from './config/devcenter';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    devcenter,
  }
});
