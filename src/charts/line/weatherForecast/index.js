/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-30 14:29:09 
 * @Email: 991034150@qq.com 
 * @Description: 天气预报图表
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 16:43:33
 */

import echarts from 'echarts'
import $ from 'jquery'

let screenW = window.innerWidth
export default {
  template: '<div></div>',
  data() {
    return {

      // 默认配置项
      defaultSetting: {
        color: ['#57D379', '#0579da'],
        title: {
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
            color: '#666',
          }
        },
        grid: {
          top: 100,
          right: '',
          bottom: 10,
          left: '',
          containLabel: false
        },
        tooltip: {
          trigger: 'axis',
          show: false,
        },
        xAxis: [{
          show: false,
          type: 'category',
        }],
        yAxis: [{
          show: false,
          type: 'value'
        },
          {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          }],
        series: [{
          name: '最高气温',
          yAxisIndex: 0,
          type: 'line',
          hoverAnimation: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#a4a4a4',
              fontSize: 12,
            }
          },
          data: []
        },
          {
            name: '最低气温',
            yAxisIndex: 0,
            type: 'line',
            hoverAnimation: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'bottom',
                color: '#a4a4a4',
                fontSize: 12,

              }
            },
            data: []
          },
          {
            type: 'custom',
            renderItem: '',
            data: [],
            tooltip: {
              trigger: 'item',

            },
            itemStyle: {
              normal: {
                color: '#a4a4a4',
              }
            },
            yAxisIndex: 1,
            z: 11
          },
          {
            type: 'custom',
            itemStyle: {
              normal: {
                color: '#a4a4a4',
              }
            },
            yAxisIndex: 1,
            z: 11
          }]
      }
    }
  },
  props: {
    selector: String, // 容器选择
    sourceData: Array, // 数据来源
    option: Object, // 配置项
    cityName: String, // 城市名
    showLen: Number, // 显示条数
  },
  mounted() {
    this.options = _.merge({}, this.defaultSetting, this.option)
    // 初始化图表
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.renderChart()
  },
  /*
   * 方法定义
   */
  methods: {
    /*
     * @description 初始化图表
     */
    renderChart() {
      let self = this
      let data = self.sourceData
      // 判断数据是否为空
      if (_.isEmpty(data)) {
        return
      }
      let option = self.options
      let {cityName, showLen} = this
      let weekTitleList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      let numList = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九']
      //标题
      let dayList = ['今天', '明天', '后天']
      let len = showLen
      for (let i = 3; i < len; i++) {
        let day = data[i].forecastDate.split('-');
        let date = new Date(day[0], day[1] - 1, day[2], 0, 0, 0);
        let weekDay = date.getDay();
        dayList.push(weekTitleList[weekDay]);
      }
      //湿度
      let humidityList = [];
      for (let i = 0; i < data.length; ++i) {
        humidityList.push(`${data[i].humidity}%`);
      }
      //风力
      let windPowerList = [];
      for (let i = 0; i < data.length; ++i) {
        windPowerList.push(`${numList[data[i].windPower]}级`)
      }
      //温度
      let tempMaxList = [],
        tempMinList = [];
      for (let i = 0; i < data.length; ++i) {
        tempMaxList.push(data[i].temperatureMax);
        tempMinList.push(data[i].temperatureMin);
      }
      // 图标位置
      var w1 = ($('#daysWeather').width() - 45) / (len * 2 - 2)
      window.addEventListener('resize', function () {
        w1 = ($('#daysWeather').width() - 45) / (len * 2 - 2)
      })

      /**
       * @description 渲染天气
       * @param {object} param
       * @param {object} api
       * @returns
       */
      let renderWeather = function (param, api) {
        let weatherImg = 'cloudy';
        let weatherImgPaht = 'green/'
        if (data[param.dataIndex].phenomenaDay) {
          let weather = data[param.dataIndex].phenomenaDay;
          if (weather.indexOf('晴') > -1) {
            weatherImg = 'sunny';
          }
          if (weather.indexOf('多云') > -1) {
            weatherImg = 'cloudy';
          }
          if (weather.indexOf('阴') > -1) {
            weatherImg = 'overcast';
          }
          if (weather.indexOf('阵雨') > -1) {
            weatherImg = 'shower';
          }
          if (weather.indexOf('雷阵雨') > -1) {
            weatherImg = 'thundershower1';
          }
          if (weather.indexOf('雷阵雨伴有冰雹') > -1) {
            weatherImg = 'thundershower2';
          }
          if (weather.indexOf('雨夹雪') > -1) {
            weatherImg = 'sleet';
          }
          if (weather.indexOf('小雨') > -1) {
            weatherImg = 'lightrain';
          }
          if (weather.indexOf('中雨') > -1) {
            weatherImg = 'moderaterain';
          }
          if (weather.indexOf('冻雨') > -1) {
            weatherImg = 'hail';
          }
          if (weather.indexOf('大雨') > -1) {
            weatherImg = 'heavyrain';
          }
          if (weather.indexOf('暴雨') > -1) {
            weatherImg = 'storm1';
          }
          if (weather.indexOf('大暴雨') > -1) {
            weatherImg = 'storm2';
          }
          if (weather.indexOf('特大暴雨') > -1) {
            weatherImg = 'storm3';
          }
          if (weather.indexOf('阵雪') > -1) {
            weatherImg = 'snowflurry';
          }
          if (weather.indexOf('小雪') > -1) {
            weatherImg = 'lightsnow';
          }
          if (weather.indexOf('中雪') > -1) {
            weatherImg = 'moderatesnow';
          }
          if (weather.indexOf('大雪') > -1) {
            weatherImg = 'heavysnow';
          }
          if (weather.indexOf('暴雪') > -1) {
            weatherImg = 'blizzard';
          }
          if (weather.indexOf('雾') > -1) {
            weatherImg = 'foggy';
          }
          if (weather.indexOf('浮尘') > -1) {
            weatherImg = 'dust';
          }
          if (weather.indexOf('扬沙') > -1) {
            weatherImg = 'sand';
          }
          if (weather.indexOf('沙尘暴') > -1) {
            weatherImg = 'duststorm';
          }
          if (weather.indexOf('霾') > -1) {
            weatherImg = 'haze';
          }
          if (weather.indexOf('暴风雪') > -1) {
            weatherImg = 'blizzardWind';
          }
          if (weather.indexOf('冰雹') > -1) {
            weatherImg = 'haily';
          }
          if (weather.indexOf('台风') > -1) {
            weatherImg = 'typhoon';
          }
        }
        return {
          type: 'group',
          children: [{
            type: 'image',
            style: {
              image: `/weather-web/resources/img/realtime/${weatherImgPaht + weatherImg}.png`,
              width: 20,
              height: 20,
            },
            position: [2 * w1 * param.dataIndex + 7, 52] //天气图标显示位置
          },
            {
              type: 'text',
              style: {
                text: dayList[param.dataIndex],
                textFont: api.font({
                  fontSize: 12,
                }),
                fill: '#535353',
                textAlign: 'left',
                textVerticalAlign: 'top'
              },
              position: [2 * w1 * param.dataIndex + 5, 32] //天气图标显示位置
            }]
        };
      }

      /**
       * @description 渲染风和湿度
       * @param {object} param
       * @param {object} api
       * @returns
       */
      let renderWind = function (param, api) {
        var position = [190, 220]
        var p1 = 0
        var p2 = 12
        if(param.dataIndex === 0) {
          p1 = 5
        }
        // 皮肤切换配置
        // let imgName = 'green-'
        return {
          type: 'group',
          children: [{
            type: 'image',
            style: {
              image: `/weather-web/resources/img/realtime/green-humidity.png`,
              x: -14 / 2,
              y: -2,
              width: 18, // 大屏判断
              height: 18, // 大屏判断
            },
            position: [2 * w1 * param.dataIndex + p1 , position[0]]
          },
            {
              type: 'text',
              style: {
                text: humidityList[param.dataIndex],
                textFont: api.font({
                  fontSize: 12
                }),
                fill: '#A4A4A4',
                textAlign: 'left',
                textVerticalAlign: 'top'
              },
              position: [2 * w1 * param.dataIndex + p1 + p2, position[0]]
            },
            {
              type: 'image',
              style: {
                image: `/weather-web/resources/img/realtime/green-${data[param.dataIndex].windDirection}.png`,
              },
              position: [2 * w1 * param.dataIndex + p1 - 3, position[1]]
            },
            {
              type: 'text',
              style: {
                text: windPowerList[param.dataIndex],
                textFont: api.font({
                  fontSize: 12
                }),
                fill: '#a4a4a4',
                textAlign: 'left',
                textVerticalAlign: 'top'
              },
              position: [2 * w1 * param.dataIndex + p1 + p2, position[1]]
            }]
        };
      };
      // 标题
      option.title.text = `${cityName}未来7天天气预报`
      option.grid.left = -w1 + 20
      option.grid.right = -w1 + 25
      option.xAxis[0].data = dayList
      option.series[0].data = tempMaxList
      option.series[1].data = tempMinList
      option.series[2].renderItem = renderWeather
      option.series[2].data = dayList;
      option.series[3].renderItem = renderWind

      option.series[3].data = dayList
      self.myChart.setOption(option)

      // 监听窗口变化
      window.addEventListener('resize', function () {
        self.myChart.resize()
      })
    }
  },
  /*
   * 监听参数变化
   */
  watch: {
    'sourceData': 'renderChart'
  }
}

