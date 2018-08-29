/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-07 21:41:42 
 * @Description: 公用API出口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 16:53:09
 */

// 登录
import fetchLogin from './loginMock'
 // 菜单导航
import fetchTopMenu from './topMenuMock'
// 右边地区
import fetchAreaList from './areaListMock'
// 退出登录
import fetchLogout from './logoutMock'
// 获取app二维码
import fetchQrCode from './qrCodeMock'
// 数据时间
import fetchDatatime from './datatimeMock'
// 密码修改
import fetchChangePwd from './changePwdMock'
// 权限控制
import fetchfunctionRole from './functionRoleMock.js'

export {
  fetchLogin,
  fetchTopMenu,
  fetchAreaList,
  fetchLogout,
  fetchQrCode,
  fetchDatatime,
  fetchChangePwd,
  fetchfunctionRole
}