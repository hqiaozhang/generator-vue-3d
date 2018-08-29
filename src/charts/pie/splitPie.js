/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:55:38 
 * @Description: 优良天数饼图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-23 18:29:16
 */


import $ from "jquery"
import echarts from "echarts";
import {merge, isEmpty} from "lodash";
import {blueLevelColorArr} from "@/config/levelColor.js";

const levelColor = blueLevelColorArr;
let screenH = window.innerHeight // 获取屏幕高度
export default {
  template: '<div></div>',
  props: {
    sourceData: Object,
    selector: String,
    selectorBg: String,
    option: Object
  },
  data() {
    return {
      // 默认配置项
      defaultSetting: {
        toolbox: {
          show: false
        },
        // 图例配置项
        legend: {
          name: '',
          selectedMode: false, // 图例不可点击
          icon: "circle",
          orient: "vertical",
          textStyle: {
            color: "#fff",
            fontWeight: "normal",
            fontFamily: "微软雅黑",
            fontSize: screenH <= 768 ? 11 : 12,
            padding: -3
          },
          itemWidth: 8,
          itemHeight: 8
        },
        series: [
          {
            value: '',
            name: '',
            itemStyle: {
              normal: {
                borderWidth: 3.5,
                shadowBlur: 0,
                color: '',
                borderColor: '',
                shadowColor: "rgba(142, 152, 241, 0.6)"
              }
            }
          },
          {
            value: '',
            name: "sp",
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                tooltip: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0
              }
            }
          },
          {
            name: "",
            type: "pie",
            clockWise: true,
            radius: '',
            center: '',
            hoverAnimation: false,
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: ''
          }
        ],
        // 背景圈配置项
        seriesBg: {
          series: [{
            type: "pie",
            radius: '',
            avoidLabelOverlap: false,
            center: '',
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                name: "背景",
                itemStyle: {
                  normal: {
                    color: "#111c55"
                  }
                }
              }
            ]
          }]
        }
      }
    };
  },
  mounted() {
    // 合并配置项
    this.options = merge({}, this.defaultSetting, this.option)
    // 获取数据项DOM
    this.mychar = echarts.init(document.querySelector(this.selector))
    // 获取背景DOM
    this.myChartBg = echarts.init(document.querySelector(this.selectorBg))
    // 渲染图片
    this.renderChart()
  },
  methods: {
    /**
     * 初始化图表
     */
    renderChart() {
      let date = new Date()
      date.getFullYear()
      date.getMonth()
      // 获取数据来源
      let data = this.sourceData
      if (_.isEmpty(data)) {
        return
      }
      let total = data.total
      let legendData = []
      let dataset = []
      const {series, legend, toolbox} = this.options
      for (let key in data) {
        let value = data[key];
        if (value > 0 && key != "total") {
          let percent = (value / total * 100).toFixed(1)
          let name = "";
          let color = levelColor[0];
          switch (key) {
            case "g01Num":
              name += "优 " + value + "天 (" + percent + "%)";
              color = levelColor[0];
              break;
            case "g02Num":
              name += "良 " + value + "天 (" + percent + "%)";
              color = levelColor[1];
              break;
            case "g03Num":
              name += "轻度 " + value + "天 (" + percent + "%)";
              color = levelColor[2];
              break;
            case "g04Num":
              name += "中度 " + value + "天 (" + percent + "%)";
              color = levelColor[3];
              break;
            case "g05Num":
              name += "重度 " + value + "天 (" + percent + "%)";
              color = levelColor[4];
              break;
            case "g06Num":
              name += "严重 " + value + "天 (" + percent + "%)";
              color = levelColor[5];
              break;
            default:
              break;
          }
          legendData.push({
            name: name,
            icon: this.options.legend.icon
          })
          series[0].name = name
          series[0].value = value
          series[0].itemStyle.normal.color = color
          series[0].itemStyle.normal.borderColor = color
          // 总数小于10的间隔处理
          let breakV = 0.6
          if (total <= 10) {
            breakV = 0.2
          }
          // 总数小于8的间隔处理
          if (total <= 8) {
            breakV = 0.15
          }
          // 总数小于5的间隔处理
          if (total < 5) {
            breakV = 0.1
          }
          series[1].value = screenH >= 768 ? breakV : 1
          let newSeries = merge({}, series[0])
          dataset.push(
            newSeries,
            series[1]
          )
        }
      }

      let radius = [60, 58]
      let center = ['28%', '45%']
      let fontSize = 12
      let top = '15%'
      let right = '5%'
      let bgRadius = [42, 39]
      if (screenH <= 768) {
        radius = [45, 44]
        center = ['30%', '50%']
        fontSize = 11
        top = '1px'
        right = '5%'
        // 背景圈
        bgRadius = [28, 26]
      }
      // 图例配置项
      legend.top = top
      legend.right = right
      legend.data = legendData
      // 数据项
      series[2].radius = radius
      series[2].center = center
      series[2].data = dataset
      let option = {
        tooltip: {
          position: 'bottom',
          trigger: 'item',
          formatter: function (params) {
            if (params.name != 'sp') {
              return (
                `${date.getFullYear()}年${date.getMonth()}月<br />
                <b style="color:${params.color}";>&bull;</b>${params.name}`
              )
            }
          }
        },
        legend: legend,
        toolbox: toolbox,
        color: levelColor,
        series: [
          series[2]
        ]
      };
      const {mychar, myChartBg} = this
      mychar.setOption(option)

      // 背景配置
      const {seriesBg} = this.options
      seriesBg.series[0].radius = bgRadius
      seriesBg.series[0].center = center
      if (total !== 0) {
        myChartBg.setOption(this.options.seriesBg)
      } else {
        myChartBg.clear()
      }
    }
  },
  watch: {
    sourceData: 'renderChart'
  },
}

