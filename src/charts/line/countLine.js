/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-08 21:51:36 
 * @Description: 折线图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-24 22:14:00
 */

import $ from 'jquery'
import echarts from "echarts"
import {merge} from "lodash"
import {showUpper} from '@/util/util.js'

export default {
  template: '<div></div>',
  props: {
    selector: String,
    sourceData: Object,
    option: Object
  },
  mounted() {
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.renderChart()
  },
  methods: {
    renderChart() {
      let data = this.sourceData
      // 判断数据是否为空
      if(_.isEmpty(data)){
        return
      }
      let scrrenHeight = $(window).height()
      let option = {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            fontSize: 12,
            lineHeight: 20,
            width: 20
          },
          formatter: function (params) {
            let html = "";
            if (params.length > 0) {
              html += "<div  >" + showUpper('pm25') + "<br>";
              for (let i = 0; i < params.length; i++) {
                let seriesIndex = params[i].seriesIndex;
                let value = params[i].value;
                let year = data.thisYear[params[i].dataIndex];

                if (seriesIndex == 1) {
                  year = data.preYear[params[i].dataIndex];
                }
                html += "<b style='color: " + params[i].color + ";'> &bull;</b> " + year + "年" + params[i].name + ":" + value + "<br/>";
              }
              return html += "</div>";
            }

          }
        },
        legend: {
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 13,
          data: ["近12月", "同期"],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#fff',
          }
        },
        grid: {
          left: '10px',
          top: '15px',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff',
            }
          },
          axisTick: {
            interval: 0
          },
          axisLabel: {
            formatter: function (value) {
              return value.replace("月", "");
            },
            interval: 0
          },
          data: data.xaxis
        }],
        yAxis: [{
          type: 'value',
          name: '',
          splitNumber: scrrenHeight <= 675 ? 2 : 5,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              show: false,
              color: '#fff',
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 11
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              show: false
            }
          }
        }],

        series: [{
          name: '近12月',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              },
                {
                  offset: 0.8,
                  color: 'rgba(137, 189, 27, 0)'
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
          data: data.thisYearValue
        },
          {
            name: '同期',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0, 136, 212, 0.3)'
                },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
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
            data: data.preYearValue
          }]
      };
      this.myChart.setOption(option)
    }
  },
  watch: {
    sourceData: function () {
      this.renderChart()
    }
  }
}


