/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 15:54:54 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-07 16:53:10
 */
 
import { getCookie } from '@/util/util'
let userId = getCookie('userId')
const state = {
  logged: !userId,
  userId: userId,
  cityId: getCookie('cityId'),
  cityName: decodeURI(getCookie('cityName')),
}
// const state = {
//   logged: false,
//   userId: "4028f481585db7d701585dc9f8a00018",
//   cityId: "500100",
//   cityName: "%E9%87%8D%E5%BA%86%E5%B8%82"
// }

// getters
const getters = {
  logged: state => state.logged,
  cityId: state => state.cityId,
  cityName: state => state.cityName,
  userId: state => state.userId,
}
 
// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState (state, logged) {
    state.logged = logged
    mutations.setUserId(state, getCookie('userId'))
  },
  
  /**
   * @description 设置地区信息(id,名称)
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setAreaInfo (state, city) {
    state.cityId = city.id
    state.cityName = city.domainName
  },
  /**
   * 设置用户id
   * @param state
   * @param userId
   */
  setUserId (state, userId) {
    state.userId = userId
  }
}

export default {
  state,
  getters,
  mutations
}
