/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-10 15:17:04 
 * @Description: 数据出口主文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-04 13:32:06
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as home from './homeModules' // 首页
import * as common from './commonModules' // 公用
import * as detectionMap from './detectionMapModules' // 检测地图
import * as abnormalGrid from './pollutionSourceModules/abnormalGrid' // 异常网格
import * as hotGrid from './pollutionSourceModules/hotGrid' // 热点网格

const debug = process.env.NODE_ENV !== 'production'

/**
 * 每一个 Vuex 应用的核心就是 store（仓库）
 * “store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。
 * 1.Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，
 * 若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
 * 2.你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。
 * 这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
 * 
 * state，驱动应用的数据源；
 * view，以声明方式将 state 映射到视图；
 * actions，响应在 view 上的用户输入导致的状态变化。
 */

Vue.use(Vuex)
 
const modules = {
  common,
  home,
  detectionMap,
  abnormalGrid,
  hotGrid
}
 
// 注册Store
// 每个应用将仅仅包含一个 store 实例
export default new Vuex.Store({
  // strict: !!debug,
  plugins: debug ? [createLogger()] : [],
  modules: modules
})
