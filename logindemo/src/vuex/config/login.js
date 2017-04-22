/**
 * Created by houenxing on 17/1/19.
 */
'use strict';

import ds from '../../deepstream/ds';

const state = {
    isLogin: Boolean((JSON.parse(sessionStorage.getItem('user')) || {}).username)  //根据判断本地是否存储有"user"来判断是否需要重新登录
  };

const mutations = {
  changeLoginState(state, data) {
    state.isLogin = data;
  },
};

const actions = {
  changeLoginState: ({commit}, data) => {
    commit('changeLoginState', data);
  },
};

const getters = {
  getLoginState: (state) => state.isLogin,
};

export default {
  state,
  mutations,
  actions,
  getters,
}
