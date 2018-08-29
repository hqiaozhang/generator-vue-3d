/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-23 09:31:28 
 * @Email: 991034150@qq.com 
 * @Description: 退出地址
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-23 17:43:21
 */

export default {
  url: '/logout',
  config: {
    method: 'POST',
  },
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result":[]
  }
  // enableMock: true, // 是否使用本地假数据
}
