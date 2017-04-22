/**
 * Created by houenxing on 17/2/27.
 */
'use strict';

const state = {
  // devices: [{
  //   id: '',
  // }],
  devices: [
    {
      id: '255',
    },
    {
      id: '256',
    },
    {
      id: '257',
    },
  ],
  activeNum: null,
  activeDev: null,
};

const mutations = {
  // addDevice(state, id) {
  //
  // },
  setActiveNum (state, num) {
    state.activeNum = num;
    state.activeDev = state.devices[num];
  },
};

const actions = {
  setActiveNum: ({commit}, num) => {
    commit('setActiveNum', num);
  },
};

const getters = {
  getDevices: state => state.devices,
  getActiveNum: state => state.activeNum,
  getActiveDev: state => state.activeDev,
  getActiveId: state => state.activeDev.id,
};

export default {
  state,
  mutations,
  actions,
  getters,
}
