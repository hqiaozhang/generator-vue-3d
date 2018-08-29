/**
 * @Author:      zhanghq
 * @DateTime:    2017-10-13 14:24:06
 * @Description: 中国地图
 * @Last Modified By:   zhanghq
 * @Last Modified Time:    2017-10-13 14:24:06
 */
import d3 from 'd3'
import _ from 'lodash'
import { isNoData } from '../util/util'
import { getZoomScale, getCenters } from './util'
import mapJson from './mapJson/510100.json'

let centerP = []
let setTime = 5000

export default class Map {
  /**
   * 地图默认配置项
   * @return {object} 默认配置项
   */
  defaultSetting () {
    return{
      width: 1200,
      height: 870,
      itemStyle: {
        fill: ['#0a2259', '#ffc702'],
        stroke: '#3788dd',
        scale: 40,
        minR: 1, // 最小半径
        maxR: 20, // 最大半径
        strokeWidth: 15, 
        strokeOpacity: 0.5,
        exponent: 0.6 // 比例尺指数
      }
    }  
  }

  /**
   * Creates an instance of Map
   * @param {string} selector 容器元素选择器
   * @param {object} opt 图表组件配置项
   */
  constructor(selector, opt) {
    // 获取配置项
    const defaultSetting = this.defaultSetting()
    this.config = _.merge({}, defaultSetting, opt)
    const { width, height } = this.config  
    // 创建svg元素
    const svg = d3.select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      
    // 地图路径组元素  
    this.mapPathGroup = svg.append('g')
      .attr('class', 'map-path-group')  

    // 迁入数据线条组元素  
    this.enterLineGroup = svg.append('g')  
      .attr('class', 'enter-line-group')  
    // 迁出数据线条组元素  
    this.outLineGroup = svg.append('g')  
      .attr('class', 'out-line-group')

    // 迁入数据组元素  
    this.enterDataGroup = svg.append('g')  
      .attr('class', 'enter-data-group')  
    // 迁出数据组元素  
    this.outDataGroup = svg.append('g')  
      .attr('class', 'out-data-group') 
    this.svg = svg  
 
  }

  /**
   *  渲染
   *  @example: [example]
   *  @param    {[type]}  data [description]
   *  @return   {[type]}  [description]
   */
  render(data) {
    const self = this
    const { width, height, itemStyle } = self.config
    // 判断数据是否为空
    // if(!data) {
    //   isNoData(self.svg, { width, height })
    //   return false
    // }
    let features = mapJson.features
    // 获取地图缩放值
    let scale = getZoomScale(features, width, height)
    // 获取地图显示的中心点
    let center = getCenters(features)
    // 定义一个投影函数
    let projection = d3.geo.mercator()  
      .scale(scale * itemStyle.scale)
      .center(center)
      .translate([width / 2, height / 2])

    // 定义一个路径函数  
    let pathMethod = d3.geo.path()  
      .projection(projection) 

    // 渲染地图path  
    self.renderMapPath(pathMethod)  
    // 渲染地图数据
    // self.renderMapData(data)
  }

  /**
   *  渲染地图路径
   *  @example: [example]
   *  @param    {[type]}  pathMethod [description]
   *  @param    {[type]}  features   [description]
   *  @return   {[type]}  [description]
   */
  renderMapPath(pathMethod) {
    const self = this
    // 获取update部分并处理  
    let update = self.mapPathGroup.selectAll('path')
      .data(mapJson.features)
      // .call(::self.setPathAttribute(pathMethod))
    // 获取并处理enter部分  
    update.enter().append('path')  
    update.call(self.setPathAttribute.bind(self), pathMethod)
    // 获取并处理exit部分  
    update.exit().remove()  
  }

  /**
   *  设置地图路径属性
   *  @param    {object}  path       path元素
   *  @param    {function}  pathMethod path方法
   */
  setPathAttribute(path, pathMethod) {
    const { fill, stroke } = this.config.itemStyle
    path.attr('stroke-width', 1)
      .attr('stroke', stroke)
      .attr('fill', fill[0])
      .attr('d', pathMethod)
      .attr('class', (d, i) => {
        let center = pathMethod.centroid(d)
        // 这两个点有点跑偏(地图与图片不能完全吻合)，移动下位置
        if(d.properties.name === '海南省') {
          center[0] = center[0] + 40
        }
        if(d.properties.name === '台湾省') {
          center[0] = center[0] + 50
        }
        d.center = center
        // 保留中间点天津市
        if(d.properties.name === '重庆市') {
          centerP = pathMethod.centroid(d)
        }
        return `path-${i}`
      })
  }

  renderMapData(data) {
    const self = this
  }
 


}
