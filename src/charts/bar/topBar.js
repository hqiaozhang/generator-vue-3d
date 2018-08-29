 
import echarts from "echarts"
import { merge, isEmpty } from "lodash"
import { blueLevelGradientColor } from '@/config/levelColor.js'
export default {
  template: '<div></div>',
  props: {
    sourceData: Array,
    yData: Array,
    selector: String,
    option: Object
  },
  data() {
    return {
      scrrenH: window.innerHeight,
      // 默认配置项
      defaultSetting: {

        // x轴隐藏
        xAxis: {
          show: false
        },
        // 直角坐标系内绘图网格配置
        grid: {
          left: "5%",
          right: "4%",
          bottom: "-18px",
          top: "1%",
          containLabel: true
        },
        // y轴配置
        yAxis: [
          {
            show: true,
            color: "#fff",
            data: [],
            inverse: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            }
          },
          {
            show: true,
            inverse: true,
            data: [],
            axisLabel: {
              color: "#fff",
              textStyle: {
                fontSize: 12,
                color: "#fff"
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        // 数据项配置
        series: [
          {
            name: "背景",
            type: "bar",
            barWidth: 6,
            zlevel: 1,
            z: 1,
            itemStyle: {
              color: "#415586",
              barBorderRadius: 5
            },
            barGap: "-100%",
            barCategoryGap: "50%",
            // 背景填充数据
            data: []
          },
          {
            name: "数据",
            type: "bar",
            barWidth: 6,
            zlevel: 2,
            z: 2,
            itemStyle: {
              color: "#ccc",
              barBorderRadius: 5,
              color: (record) => {
                let Level = this.sourceData[record.dataIndex].aqiLevel2
                return new echarts.graphic.LinearGradient(0, 0, 1, 0, blueLevelGradientColor(Level))
              }
            },
            label: {
              normal: {
                show: false,
                position: "right",
                formatter: "{c}"
              }
            },
            data: []
          }
        ]
      },
    };
  },
  mounted() {
    // 合并配置项
    this.options = merge({}, this.defaultSetting, this.option)
    // 获取dom节点
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.renderChart()
  },
  methods: {
    /**
    * 初始化图表
    */
    renderChart() {
      let data = this.sourceData
      const { myChart } = this
      let xMax = 120;
      let dataset = [];
      let labels = [];
      let fullData = [];
      let rightVal = []
      // 小屏的时候截取数据
      this.scrrenH <= 700 ? data = data.slice(0, 9) : ''
      data.map(d => {
        labels.push(d.districtName)
        fullData.push(xMax)
        rightVal.push(d.aqi2)
        dataset.push((d.aqi2 / 500).toFixed(2) * 100)
      })
      // 背景数据设置
      let options = this.options
      // y轴左边标题
      options.yAxis[0].data = labels
      // y轴右边值
      options.yAxis[1].data = rightVal
      // 背景填充
      options.series[0].data = fullData
      // 数据填充
      options.series[1].data = dataset
      // 生成图表
      myChart.setOption(options)
      // 监听窗口大小变化
      window.addEventListener('resize', () =>{
        myChart.resize()
      })
    }
  },
  watch: {
    sourceData: function() {
      this.renderChart()
    }
  }
}

 