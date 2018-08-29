/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 折线图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 15:13:28
 */

import echarts from "echarts"
import {merge} from "lodash"
import {dateFormat} from "@/util/dateUtil.js";
import {pollutantFormat} from "@/util/util.js";

export default {
  template: '<div></div>',
  data() {
    return {
      // 默认配置项
      defaultSetting: {
        // animation: false,
        color: ['#57D379', '#0579da'],
        title: {
          text: '',
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#666',
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['统计模型-T', '统计模型-S'],
          right: 10,
          top: 0,
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: '#A4A4A4',
          },
        },
        grid: {
          top: 38,
          right: 10,
          bottom: 35,
          left: 30,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: '',
          // 坐标刻度不显示
          axisTick: {
            show: false,
          },
          axisLine: { // 轴线不显示
            show: false,
          },
          axisLabel: { //刻度相关设置
            color: '#A4A4A4',
            padding: 5
          },
        },
        yAxis: {
          type: 'value',
          // 坐标刻度不显示
          axisTick: {
            show: false,
          },
          axisLine: { // 轴线不显示
            show: false,
          },
          axisLabel: { //刻度相关设置
            color: '#A4A4A4'
          },
          splitLine: { // 网格线不展示
            show: false
          }
        },
        series: [{
          name: '统计模型-T',
          type: 'line',
          data: '',
          symbol: 'circle',
          showSymbol: false, // 则只有在 tooltip hover 的时候显示。
          smooth: true, // 平滑展示
          symbolSize: 2,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(87, 211, 121, 0.3)'
              },
                {
                  offset: 0.8,
                  color: 'rgba(87, 211, 121, 0)'
                }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12
            }
          },

        },
          {
            name: '统计模型-S',
            type: 'line',
            data: [],
            symbol: 'circle',
            smooth: true, // 平滑展示
            showSymbol: false, // 则只有在 tooltip hover 的时候显示。
            symbolSize: 2,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(5, 121, 218, 0.3)'
                },
                  {
                    offset: 0.8,
                    color: 'rgba(5, 121, 218, 0)'
                  }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)',
                borderColor: 'rgba(0,136,212,0.2)',
                borderWidth: 12
              }
            },
          }
        ]
      }
    }
  },
  props: {
    selector: String,
    sourceData: Object,
    option: Object, // 配置项
    title: String,
    date: String,
    pollution: String,
  },
  mounted() {
    this.options = merge({}, this.defaultSetting, this.option)
    // 初始化图表
    this.myChart = echarts.init(document.querySelector(this.selector))
    // 判断数据是否为空
    if (_.isEmpty(this.sourceData)) {
      return
    }
    this.renderChart()
  },
  methods: {

    /**
     * 初始化图表
     */
    renderChart() {
      let self = this
      let data = self.sourceData
      let option = self.options
      option.title.text = self.title
      // 数据项
      option.series[0].data = data.timeDataList
      option.series[1].data = data.spaceDataList
      // x轴数据
      option.xAxis.data = data.hourList
      self.formatterTooltip()
      self.myChart.clear()
      self.myChart.setOption(option)
      // // 监听窗口变化
      window.addEventListener('resize', function () {
        self.myChart.resize()
      })
    },
    /**
     * 格式化 Tooltip*
     */
    formatterTooltip() {
      let self = this
      let {options, pollution, defaultSetting} = this
      let dataIndex = 0
      let colors = defaultSetting.color
      options.tooltip.formatter = (params) => {
        let html = "";
        if (params.length > 0) {
          let name = params[0].name
          let index = params[0].dataIndex
          let tooltipDate = self.date.slice(0, 10)
          if (name === '00') {
            dataIndex = index
          }
          if (index >= dataIndex) {
            tooltipDate = dateFormat("yyyy-MM-dd", 1) // 00开始点是明天开始
          }
          html += `<div class='chart-tooltip'>${tooltipDate}  ${name}:00<br/>`
          for (let i = 0; i < params.length; i++) {
            let value = params[i].value;
            let seriesName = params[i].seriesName
            html += `<b style='color: ${colors[i]}; font-size: 16px'>● </b>
									${seriesName}<br />
									<p style='padding-left: 20px; margin: 0'>${ pollutantFormat(pollution)}：${value}</p>`
          }
          return html += "</div>";
        }
      }
    }
  },
  /*
   * 监听参数变化
   */
  watch: {
    'sourceData': 'renderChart'
  }
}


