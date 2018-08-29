/*
 * @Author: zhanghongqiao 
 * @Date: 2018-06-11 17:04:17 
 * @Email: 991034150@qq.com 
 * @Description: 空气质量数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:42:11
 */


import { fetch } from '@/util/request'

const state = {
  count: {}
}

// getters
const getters = {
  count: state => state.count
}

// 勘察工单actions
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  workListCountRequest ({commit}, params) {
    fetch('fetchWorkListCount', params, (data) => {
      commit('workListCountSuccess', data)
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
  workListCountSuccess (state, data) {
    state.count = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
