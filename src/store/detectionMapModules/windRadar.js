/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-02 11:09:45 
 * @Description: 风力玫瑰图数据获取
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-18 20:59:46
 */

import { fetch } from '@/util/request'

const state = {
  windRadar: []
}

// getters
const getters = {
  windRadar: state => state.windRadar
}

// 站点列表actions
/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 获取站点列表数据
   * @param {function} {commit}
   */
  windRadarRequest ({commit}, params) {
    
    fetch('fetchWindRadar', params, (data) => {
       commit('windRadarSuccess', data)
    })
  }
}
// 站点列表mutations
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  windRadarSuccess (state, data) {
    
    state.windRadar = data.data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
