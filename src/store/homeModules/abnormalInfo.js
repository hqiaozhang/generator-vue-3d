/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-05-31 22:36:25 
 * @Description: 异常点信息数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-07 22:23:08
 */

import { fetch } from '@/util/request'

const state = {
  abnormalInfo: []
}

// getters
const getters = {
  abnormalInfo: state => state.abnormalInfo
}

// 异常点信息actions
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  abnormalInfoRequest ({commit}, cityId) {
    fetch('fetchAbnormalInfo', cityId, (data) => {
      commit('abnormalInfoSuccess', data)
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
  abnormalInfoSuccess (state, data) {
    state.abnormalInfo = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
