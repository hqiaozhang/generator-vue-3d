/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:55:38 
 * @Description: 风力玫瑰图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-02 14:48:23
 */


import $ from "jquery"
import echarts from "echarts";
import { merge } from "lodash";
import { blueLevelColorArr } from "@/config/levelColor.js";
const levelColor = blueLevelColorArr;
export default {
  template: '<div></div>',
  props: {
    sourceData: Array,
    selector: String,
    option: Object
  },
  data() {
    return {
      // 默认配置项
      defaultSetting: {
        tooltip: {
            trigger: 'axis',
            // showContent: false
         },
         radar: [
              {
                  indicator: [
                      { text: '', max: 20 },
                      { text: '指标二', max: 20 },
                      { text: '指标三', max: 20 },
                      { text: '指标四', max: 20 },
                      { text: '指标五', max: 20 },
                  ],
                  center: ['50%', '50%'],
                  radius: 60,
                  startAngle: 90,
                  splitNumber: 5,
                  name: {
                      textStyle: {
                          color:'#72ACD1'
                      }
                  },
                  splitArea: {
                      areaStyle: {
                          color: ['rgba(114, 172, 209, 0.2)',
                          'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
                          'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
                          shadowColor: 'rgba(0, 0, 0, 0.3)',
                          shadowBlur: 10
                      }
                  },
                  axisLine: {
                      lineStyle: {
                          color: 'rgba(255, 255, 255, 0.5)'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: 'rgba(255, 255, 255, 0.5)'
                      }
                  }
              }
          ],
          series: [
              {
                  name: '雷达图',
                  type: 'radar',
                  symbol: 'none',
                  tooltip: {
                    trigger: 'item',
                    // formatter: function (params, ticket, callback) {
                    //     return 'Loading';
                    // },
                    formatter: '',
                  },
                  itemStyle: {
                      emphasis: {
                          lineStyle: {
                              width: 4
                          }
                      },
                  },
                  data: [
                      {
                        value: [60, 5, 30, 100, 150],
                        lineStyle: {
                          normal: {
                            width: 1,
                            opacity: 0.5,
                            color: '#B8D3E4'
                          }
                        },
                        areaStyle: {
                          normal: {
                              opacity: 0.8,
                              color: '#72ACD1'
                          }
                        }
                      }
                  ]
              }
          ]
      }
    };
  },
  mounted() {
    // 合并配置项
    // this.options = merge({}, this.defaultSetting, this.option)
    // 获取数据项DOM
    this.mychar = echarts.init(document.querySelector(this.selector))
    this.renderChart()
  },
  methods: {
    /**
    * 初始化图表
    */
    renderChart() {
      var str = '<table>';
      for(let i=0;i<this.sourceData.length;i++){
        this.defaultSetting.series[0].data[0].value[i] = this.sourceData[i].windRate;
        this.defaultSetting.radar[0].indicator[i] =  { text: this.sourceData[i].windDirectionShort, max: 20 };
        str +=  ""+this.sourceData[i].windDirection +"&nbsp&nbsp&nbsp&nbsp" 
                + this.sourceData[i].windRate + "%&nbsp&nbsp&nbsp&nbsp" 
                + this.sourceData[i].windSpeed + "m/s&nbsp&nbsp<br/>";
      }
      this.defaultSetting.series[0].tooltip.formatter = str + "</table>";
      this.mychar.setOption(this.defaultSetting)
    }
  },
  watch: {
    sourceData: function () {
      this.renderChart();
    }
  },
}

