/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-01 21:41:50 
 * @Description: echarts地图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 14:24:27
 */

import echarts from 'echarts'
import {merge} from 'lodash'
import themeConfig from './theme.config'
import baseConfig from '@/config/base.config'

const mapPath = baseConfig.mapPath

export default {
  template: '<div></div>',
  data() {
    return {
      // 默认配置项
      defaultSetting: {
        animation: false, // 关闭动画
        geo: {
          label: {
            show: false
          },
          map: 'shandong',
          scaleLimit: {
            min: 1,
            max: 1
          },
          emphasis: {
            label: {
              show: false
            }
          },
          itemStyle: [],
          silent: false
        },
        series: [{
          type: 'scatter', // series图表类型
          coordinateSystem: 'geo', // series坐标系类型
          showLegendSymbol: false,
          hoverAnimation: true,
          symbolSize: 19,
          data: [] // series数据内容
        }]
      }
    }
  },
  props: ['selector', 'dataSource', 'cityId', 'option', 'theme'],
  mounted() {
    // 获取DOM节点
    this.mapChar = echarts.init(document.querySelector(this.selector))
    this.renderChart()
  },
  methods: {
    /*
     *主题配置设置 
    */
    setingTheme() {
      let theme = this.theme
      let defaultSetting = null
      switch (theme) {
        case 'blue':
          defaultSetting = themeConfig.blue
          break;
        case 'green':
          defaultSetting = themeConfig.green
          break;
        default:
          defaultSetting = themeConfig.blue
          break;
      }
      this.config = defaultSetting
    },
    /*
     * 初始渲染方法
    */
    renderChart() {
      let self = this
      let data = self.dataSource
      let cityId = self.cityId
      // 第一次进来为空
      if (!cityId) {
        return
      }
      // 调用主题设置
      self.setingTheme()
      // 通过地区id加载不同的地图json
      d3.json(`${mapPath}${cityId}.json`, (mapJson) => {
        echarts.registerMap('shandong', mapJson); // 注册地图
        const {defaultSetting, option, config, mapChar} = self
        let options = merge({}, defaultSetting, option)
        options.geo.itemStyle = config.itemStyle
        let dataset = data.map(d => {
          return {
            name: d.stationName,
            value: [d.lng, d.lat, d.aqi2],
            symbol: `image://http://${location.host}/static/images/levelImg/land${d.aqiLevel2}.png`
          }
        })
        options.series[0].data = dataset
        mapChar.setOption(options)
        // 监听窗口大小变化
        window.addEventListener('resize', () => {
          mapChar.resize()
        })
      })
    }
  },
  watch: {
    // 监听数据来源
    dataSource: 'renderChart',
    // 监听皮肤切换
    theme: 'renderChart'
  }
}