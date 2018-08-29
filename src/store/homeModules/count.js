/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-05-31 22:36:25 
 * @Description: 勘察工单数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:49:12
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
    fetch('fetchWorkListCount', {...params}, (data) => {
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
