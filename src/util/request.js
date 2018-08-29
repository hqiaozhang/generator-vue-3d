/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:44:49
 * @Email: 991034150@qq.com
 * @Description: 发送请求的方法集合
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-07 17:02:21
 */

import axios from 'axios'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import apis from './loader/apiloader'
import config from '@/config'

const { mock } = config
axios.defaults.baseURL = mock ? config.host : config.proxyHost
axios.defaults.withCredentials = false

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.status === 401) {
    window.location.pathname = '/index'
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

/**
 * 普通AJAX请求
 *  如果向后端传递的数据需要是json，那么接口.config.contentType应为'application/json; charset=UTF-8'
 *  如果向后端传递的数据需要传递文件，那么接口.config.contentType应为'multipart/form-data; charset=UTF-8'
 *
 * @export 对外暴露方法
 * @param {string} apiName 接口名称
 * @param {object} [data={}] 接口参数 可选
 * @param {function} callback 回调函数
 * @returns {Boolean} false
 */
export function fetch(apiName, data = {}, callback) {
  if (arguments.length === 2 && isFunction(data)) {
    // 只传了apiName和callback
    callback = data
    data = {}
  }
  
  const ajaxConfig = apis.config(apiName)
  const extraAjaxConfig = {}
  let ajaxData = apis.filterData(apiName, data)
  // let ajaxData = data
  if (ajaxConfig.contentType) {
    const contentType = ajaxConfig.contentType
    if (contentType.indexOf('application/json') !== -1) {
      // application/json的要自己将传递的数据转换成字符串
      ajaxData = JSON.stringify(ajaxData)
    } else if (contentType.indexOf('multipart/form-data') !== -1) {
      // 有文件要上传，使用formData
      // 把contentType置为false，由xhr自己生成，避免使用者忘记设置boundary
      extraAjaxConfig.contentType = false
      // xhr可直接发送formData，不用jquery重复处理数据
      extraAjaxConfig.processData = false
      const formData = new FormData()
      Object.keys(ajaxData)
        .forEach(key => {
          const val = ajaxData[key]
          if (isArray(val)) {
            val.forEach(v => {
              formData.append(key, v)
            })
          } else {
            formData.append(key, val)
          }
        })
      extraAjaxConfig.data = formData
    }
  }
  return axios({
    url: apis.url(apiName, data),
    withCredentials: true,
    responseType: 'json',
    // post不需要再参数，get请求，参数带在地址栏
    params: ajaxConfig.method.toUpperCase() === 'POST' ? null : ajaxData,
    method: ajaxConfig.method || 'get',
    data: ajaxData,
    ...ajaxConfig,
    ...extraAjaxConfig
  })
    .then((response) => {
      if (!response.data.erroCode) {
        return console.log(`调后台接口失败:${response.data.erroMsg}`)
      }
      // 是否需要返回后端的msg
      if(ajaxConfig.isMsg) {
        return callback && callback(response.data)
      }
      // 返回回调函数
      callback && callback(response.data.result)
    })
    .catch(function (error) {
      callback(error)
    })
}


// /**
//  *  @describe [发送ajax get请求]
//  *  @param    {string}   url  [请求地址]
//  *  @param    {Function} callback [回调函数]
//  */
// export function fetch_get(url, data, callback) {
//   if (arguments.length === 2 && isFunction(data)) {
//     // 只传了apiName和callback
//     callback = data
//     data = {}
//   }
//   // 判断是否有参数
//   if (data.params !== undefined) {
//     data = data.params
//   }
//   return axios({
//     url: url,
//     withCredentials: true,
//     responseType: 'json',
//     // post不需要再参数，get请求，参数带在地址栏
//     params: data,
//     method: 'GET'
//   })
//     .then((response) => {
//       callback && callback(response.result)
//     })
//     .catch(function (error) {
//       callback(error)
//     })
  // $.ajax({
  //   type: 'get',
  //   dataType: 'json',
  //   data: baseConfig.isOnline ? data : '',
  //   url: url,
  //   success: function (response) {
  //     if (!response.erroCode) {
  //       // layerTooltip('调后台接口失败'+response.erroMsg+'')
  //     }
  //     callback && callback(response.result)
  //   },
  //   error: function (error) {
  //     // layerTooltip('请求失败：' + error.responseJSON.erroMsg)
  //   }
  // })
// }

// /**
//  *  @describe [发送post请求]
//  *  @param    {string}   url  [请求地址]
//  *  @param    {object}   data  [参数]
//  *  @param    {Function} callback [回调函数]
//  */
// export function ajax_post(url, data, callback) {
//   if (arguments.length === 2 && isFunction(data)) {
//     // 只传了apiName和callback
//     callback = data
//     data = {}
//   }
//   // 判断是否有参数
//   if (data.params !== undefined) {
//     data = data.params
//   }
//   $.ajax({
//     type: 'post',
//     url: url,
//     contentType: 'application/json',
//     dataType: 'json',
//     data: JSON.stringify(data),
//     success: function (response) {
//       if (!response.erroCode) {
//         // layerTooltip('调后台接口失败'+response.erroMsg+'')
//       }
//       callback && callback(response.result)
//     },
//     error: function (error) {
//       callback && callback(error.responseJSON.result)
//       // layerTooltip('请求失败：' + error.responseJSON.erroMsg)
//     }
//   })
// }