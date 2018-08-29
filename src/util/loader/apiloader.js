/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-01 22:06:40 
 * @Description: 全局接口配置
 * @Last Modified by: zhanghongqiao 
 * @Last Modified time: 2018-06-01 22:06:40 
 */
 

import Mock from 'mockjs'
import config from '@/config'
// 使用lodash#isPlainObject方法代替
import isPlainObject from 'lodash/isPlainObject'

const apiMap = {}

/**
 *  当host没有域名时，根据页面的域名补充host
 *  @param    {string}  host        地址
 *  @param    {Boolean=} isWebsocket 是否是websocket（可选）
 *  @return   {string}  补充后的host
 */
function normalizeHost(host, isWebsocket) {
  let hosts = host
  if(hosts && hosts.indexOf('//') !== -1) {
    // 有协议，那么就认为有域名，不进行处理
    return hosts
  }
  if(hosts === null) {
    hosts = ''
  }
  hosts = location.host + hosts
  const normalProtocol = location.protocol
  if(isWebsocket) {
    // 是websocket，根据页面协议猜测对应的ws协议
    let protocol = 'ws://'
    if(normalProtocol === 'https:') {
      // https协议对应wss协议
      protocol = 'wss://'
    }
    hosts = protocol + hosts
  } else {
    hosts = `${normalProtocol}//${hosts}`
  }
  return hosts
}

// 第一个字符不能是数字从而防止匹配到port
const paramReg = /:([^/\d][^/|$\?]+)/g

// 匹配可选参数
const optParamReg = /(\w+)=({\w+})/ig

export default {
  /**
   *  加载接口配置
   *  @param    {Object}  apiConfigMap 接口配置
   */
  merge(apiConfigMap) {
    const me = this
    let host
    let websocketHost
    const mock = config.get('mock')
    if(config.get('proxy')) {
      // 为true，启用代理
      host = config.get('proxyHost')
      websocketHost = config.get('websocketProxyHost')
    } else {
      // 为false，不用代理
      host = normalizeHost(config.get('host'))
      websocketHost = normalizeHost(config.get('websocketHost'), true)
    }
    for(const key in apiConfigMap) {
      if(!Object.prototype.hasOwnProperty.call(apiConfigMap, key) ||
        !{}.hasOwnProperty.call(apiConfigMap, key)) {
        continue
      }
      // 默认不是websocket接口
      let isWebsocket = false
      const apiConfig = apiConfigMap[key]
      const ajaxConfig = apiConfig.config || {}
      const url = apiConfig.url
      if(apiConfig.isWebsocket === true) {
        // 接口声明是websocket接口
        isWebsocket = true
      }
      if(!ajaxConfig.method) {
        // 默认method为get
        ajaxConfig.method = 'get'
      }
      ajaxConfig.method = ajaxConfig.method.toLowerCase()
      apiMap[key] = {
        // 如果是websocket接口，则需要用websocketHost
        // 否则用host
        url: (isWebsocket ? websocketHost : host) + url,
        config: ajaxConfig
      }
      if(mock && apiConfig.mock) {
        // 需要mock，并且api存在mock配置
        Mock.mock(
          me.reg(key),
          ajaxConfig.method,
          apiConfig.mock
        )
      } else if(!mock && apiConfig.mock && apiConfig.enableMock) {
        // 虽然全局关闭了mock，调用真实接口，但部分接口仍可以使用mock数据
        Mock.mock(
          me.reg(key),
          ajaxConfig.method,
          apiConfig.mock
        )
      }
    }
  },
  
  /**
   *  根据接口的名称，获取未绑定数据的url
   *  @param    {string}  key 接口的名称
   *  @return   {string}  接口的url
   */
  rawUrl(key) {
    return apiMap[key].url
  },

  /**
   *  根据接口的名称，获取绑定数据后的url
   *  @param    {string}  key 接口的名称
   *  @param    {Object=}  data 如果接口url上定义的变量名存在于data中，就会进行转换（可选）
   *  @return   {string}  接口转换后的url
   */
  url(key, data = {}) {
    const me = this
    const url = me.rawUrl(key)
    const requiredURL = url.replace(
      paramReg,
      (str, paramName) => {
        let val = data[paramName]
        if(val === undefined) {
          val = 'null'
        }
        return global.encodeURIComponent(val)
      }
    )

    return requiredURL.replace(
      optParamReg,
      (str, optParamName) => {
        let value = data[optParamName]
        if(value === undefined) {
          value = ''
        }
        return `${optParamName}=${global.encodeURIComponent(value)}`
      }
    )
  },
  /**
   *  根据接口的名称，获取用来描述接口的url的正则表达式
   *  @param    {string}  key 接口的名称
   *  @return   {RegExp}  描述url的正则表达式
   */
  reg(key) {
    const me = this
    const rawUrl = me.rawUrl(key)
    let regStr = rawUrl
      .replace(/\./g, '\\.')
      .replace(paramReg, '[^/]+')
      .replace(optParamReg, '[^/]+')
    return new RegExp(`^${regStr}(\\?.*)?$`)
  },
  /**
   *  根据接口的名称，获取接口的ajax配置
   *  @param    {string}  key 接口名称
   *  @return   {Object}  ajax配置
   */
  config(key) {
    return apiMap[key] && apiMap[key].config
  },
  /**
   *  根据接口的名称，过滤数据中能绑定到url的数据
   *  @param    {string}  key  接口的名称
   *  @param    {Object}  data 数据
   *  @return   {Object}  无法绑定到url的剩余数据
   */
  filterData(key, data) {
    const me = this
    if(!isPlainObject(data)) {
      return data
    }
    const resData = {...data}
    const rawUrl = me.rawUrl(key)
    let execRes
    while(execRes = paramReg.exec(rawUrl)) {
      const paramName = execRes[1]
      delete resData[paramName]
    }
    return resData
  }
}
