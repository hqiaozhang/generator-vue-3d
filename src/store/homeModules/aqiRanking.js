/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-05-31 22:36:25 
 * @Description: PM2.5月度统计数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:42:15
 */

import { fetch } from '@/util/request'

const state = {
  aqiRanking: {}
}

// getters
const getters = {
  aqiRanking: state => state.aqiRanking
}

// PM2.5月度统计actions
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  aqiRankingRequest ({commit}, params) {
    fetch('fetchAqiRanking', params, (data) => {
      commit('aqiRankingSuccess', data)
    })
  }
}
// PM2.5月度统计mutations
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  aqiRankingSuccess (state, data) {
    state.aqiRanking = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
