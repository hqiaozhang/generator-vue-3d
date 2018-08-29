/*
 * @Author: zhanghongqiao 
 * @Date: 2018-06-08 10:28:47 
 * @Email: 991034150@qq.com 
 * @Description: 优良天数
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:42:53
 */


import { fetch } from '@/util/request'

const state = {
  goodDays: {}
}

// getters
const getters = {
  goodDays: state => state.goodDays
}

// 勘察工单actions
const actions = {
  /**
   * @description 获取优良天数数据
   * @param {function} {commit}
   */
  goodDaysRequest ({commit}, params) {
    fetch('fetchGoodDays', params, (data) => {
      commit('goodDaysSuccess', data)
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
  goodDaysSuccess (state, data) {
    state.goodDays = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
