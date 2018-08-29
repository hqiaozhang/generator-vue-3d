/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-29 22:00:49 
 * @Description: 热点网格数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-04 15:45:04
 */

import { fetch } from '@/util/request'

const state = {
  hotList: []
}

// getters
const getters = {
  hotList: state => state.hotList
}

// 异常点信息actions
const actions = {
  /**
   * @description 获取热点网格统计结果数据
   * @param {function} {commit}
   */
  hotListRequest ({ commit }, params) {
    fetch('fetchHotlist', params, (data) => {
      commit('hotListSuccess', data)
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
  hotListSuccess (state, data) {
    console.log(data)
    state.hotList = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
