/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-01 22:04:27 
 * @Description: 站点数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:34:52
 */

import { fetch } from '@/util/request'

const state = {
  stationData: []
}

// getters
const getters = {
  stationData: state => state.stationData
}

// 勘察工单actions
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  stationRequest ({commit}, params) {
    fetch('fetchStation', params, (data) => {
      commit('stationSuccess', data)
    })
  }
}
// 勘察工单mutations
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  stationSuccess (state, data) {
    state.stationData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
