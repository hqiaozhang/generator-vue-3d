/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-05-31 21:30:34 
 * @Description: 图表库出口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 14:41:56
 */

 import RegionMap from './regionMap'
 import EchartsMap from './echartsMap'
 import TopBar from './bar/topBar.js' // top排行柱状图
 import SplitPie from './pie/splitPie.js'
 import CountLine from './line/countLine.js' // PM2.5月度统计折线图
 import Radar from './radar/radar.js' //风力玫瑰图
 import WodelCountChart from './line/modelCountChart' // 拆线统计图
 import WeatherForecastChart from './line/weatherForecast' // 天气预报

 export {
   RegionMap,
   EchartsMap,
   TopBar,
   SplitPie,
   CountLine,
   Radar,
   WodelCountChart,
   WeatherForecastChart
 }
