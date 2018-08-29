/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-29 22:00:49 
 * @Description: 热点网格统计结果
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-29 22:08:27
 */



import { fetch } from '@/util/request'

const state = {
  hotCountResults: []
}

// getters
const getters = {
  hotCountResults: state => state.hotCountResults
}

// 异常点信息actions
const actions = {
  /**
   * @description 获取热点网格统计结果数据
   * @param {function} {commit}
   */
  hotCountResultsRequest ({commit}, cityId) {
    fetch('fetchHotCountResults', cityId, (data) => {
      commit('hotCountResultsSuccess', data)
    })
  }
}
// 异常点信息mutations
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  hotCountResultsSuccess (state, data) {
    state.hotCountResults = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
