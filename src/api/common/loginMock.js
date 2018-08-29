/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-06 14:32:03 
 * @Email: 991034150@qq.com 
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-07 15:15:11
 */

export default {
  url: '/login',
  // enableMock: true, // 是否使用本地假数据
  config: {
    method: 'POST',
    contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  },
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result":[]
  }
}
