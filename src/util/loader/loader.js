/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 页面渲染前加载配置项
 * @Date: 2018-03-07 09:22:24 
 * @Last Modified by: zhanghongqiao@hiynn.com
 * @Last Modified time: 2018-05-30 21:10:15
  */

import { adaptZoom, default as zoom } from '@/util/zoom/zoom'
import { resetSize } from '@/util/util'
import config from '@/config'
import apis from './apiloader'

export default {
  /**
   * 执行初始化操作，然后执行app的初始化逻辑
   * @param    {Object}  app 页面实例配置
   * @example 参数示例
   * {
   *  config: {},
   *  apis: {}
   * }
   */
  load(app) {
    const self = this

    // 将应用配置合并到全局api
    config.merge(app.config)

    // 将应用的接口配置合并到全局api
    apis.merge(app.apis)

    self.initZoom()
    // 加载字体大小重置(做响应式)
    resetSize()
  },
  /**
   *  根据config，判断是否需要执行zoom逻辑
   */
  initZoom() {
    if(config.get('zoom')) {
      // 为true，启用自动缩放
      adaptZoom()
      window.addEventListener('resize', zoom)
      zoom()
    }
  }
}
