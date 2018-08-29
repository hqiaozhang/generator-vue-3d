/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 21:15:01
 * @Email: 991034150@qq.com
 * @Description: 首页数据请求出口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-08 22:31:54
 */
 
// 勘查工单
import count from './count'
// 站点数据
import stationData from './station'
// 地区top10
import districtTopList from './districtTop'
// 异常点信息
import abnormalInfo from './abnormalInfo'
// 优良天数
import goodDays from './goodDays'
// PM2.5月度统计
import aqiRanking from './aqiRanking'

export const modules = {
  count,
  stationData,
  districtTopList,
  abnormalInfo,
  goodDays,
  aqiRanking
}

