/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-05-31 22:36:25 
 * @Description: 地区top10数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-15 22:42:24
 */

import { fetch } from '@/util/request'

const state = {
  districtTopList: []
}
// getters
const getters = {
  districtTopList: state => state.districtTopList
}
// 地区top10actions
const actions = {
  /**
   * @description 获取地区top10数据
   * @param {function} {commit}
   */
  districtTopRequest ({commit}, params) {
    fetch('fetchDistrictTop', params, (data) => {
      commit('districtTopSuccess', data)
    })
  }
}
// 地区top10mutations
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  districtTopSuccess (state, data) {
    state.districtTopList = data.topList
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
