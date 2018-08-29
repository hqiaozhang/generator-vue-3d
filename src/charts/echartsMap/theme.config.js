/*
 * @Author: zhanghongqiao 
 * @Date: 2018-06-11 11:04:39 
 * @Email: 991034150@qq.com 
 * @Description: 地图主题配置项
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-11 11:06:50
 */

export default {
  blue: {
    itemStyle: {
      normal: {
        borderColor: '#3788dd',
        //鼠标移入区县的时候显示的颜色
        areaColor: '#0a2259',
        //默认的背景色
        shadowBlur: '10',
        //阴影模糊的大小
        shadowColor: '#0a2259',
        shadowOffsetY: '0',
        //阴影的偏移量
        borderWidth: 2
      },
      emphasis: {
        borderColor: '#3788dd',
        //鼠标移入区县的时候显示的颜色
        areaColor: '#0a2259',
        //默认的背景色
        shadowBlur: '10',
        //阴影模糊的大小
        shadowColor: '#0a2259',
        shadowOffsetY: '0',
        //阴影的偏移量
        borderWidth: 2
      }
    }
  },
  green: {
    itemStyle: {
      normal: {
        borderColor: '#fff',
        //鼠标移入区县的时候显示的颜色
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#22aac0' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#2ccfa2' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        shadowBlur: '0',
        //阴影模糊的大小
        shadowColor: '#cfcfcf',
        shadowOffsetY: '2',
        //阴影的偏移量
        borderWidth: 2
      },
      emphasis: {
        borderColor: '#fff',
        //鼠标移入区县的时候显示的颜色
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: '#22aac0' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#2ccfa2' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    }
  }
}