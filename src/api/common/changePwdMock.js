/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-30 16:48:43 
 * @Email: 991034150@qq.com 
 * @Description: 密码修改
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 17:17:02
 */

export default {
  url: '/sysuser/updatePersonalPwd',
  config: {
    method: 'POST',
    contentType: 'multipart/form-data',
    // isMsg: true, // 是否需要后端的msg
  },
  mock: {
    "erroCode":2000,
    "erroMsg":null,
    "result":[]
  }
  // enableMock: true, // 是否使用本地假数据
}