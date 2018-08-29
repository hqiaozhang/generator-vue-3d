/*
 * @Author: liqi@hiynn.com 
 * @Date: 2018-02-05 10:03:59 
 * @Description: 雷达图坐标系统
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-02-09 17:03:01
 */
import d3 from 'd3'
import _ from 'lodash'
import { filters } from '../filters'

export default class RadarAxis {
  /**
   * 初始化配置项
   * @param  {Object} option 配置项
   * @return {void}   void
   */
  initConfig(option) {
    // 配置主题栅格布局信息
    this.grid = option.grid
    this.center = option.center
    this.radius = option.radius

    let { width, height } = this.grid    
    this.AXIS = {
      radius: Math.min(width, height) * this.radius / 2,
      cx: width * this.center[0],
      cy: height * this.center[1]
    } 

    // 配置动画信息
    this.duration = option.duration
    this.easing = option.easing

    // 配置坐标系统
    this.axis = _.merge({
      ticks: 4,
      axisPolygon: {
        stroke: '#606062',
        strokeWidth: 2,
        oddFill: 'transparent',
        evenFill: 'transparent'
      },
      axisLines: {
        show: true,
        stroke: '#606062',
        strokeWidth: 1
      },
      axisTicks: {
        show: true,
        fill: '#FFF',
        fontSize: 12,
        formatter: '{value}'
      },
      axisSymbols: {
        show: true,
        symbol: 'circle', // 类型参考d3符号生成器 || 'path://'
        symbolSize: 8,
        fill: '#FFF',
        stroke: '#606062',
        strokeWidth: 2
      },
      axisLabels: {
        show: true,
        fill: '#FFF',
        gap: 10,
        fontSize: 12
      }
    }, option.axis)
  }

  /**
   * 初始化容器
   * @param  {Object} selector svg 容器
   * @return {void}   void
   */
  initGroup(selector) {    
    this.axisG = selector.append('g')
      .classed('radar-axis', true)
  }

  /**
   * 实例化
   * @param {Object} selector svg 容器
   * @param {Object} option   完整的配置项
   */
  constructor(selector, option) {
    this.selector = selector
    this.initConfig(option)
    this.initGroup(selector)
  }

  /**
   * 创建比例尺
   * @param  {Array} series 数据集
   * @return {void}  void
   */
  createScale(series) {
    let arr = []
    for (let chunk of series) {
      for (let d of chunk.data) {
        arr.push(d.value)
      }
    }
    
    let { radius } = this.AXIS
    let { ticks } = this.axis
    this.min = d3.min(arr)
    this.max = d3.max(arr)

    this.scale = d3.scale.linear()
      .domain([this.min, this.max])
      .range([radius / ticks / 2, radius * 0.9])
  }

  /**
   * 外部获取比例尺的方法
   * @return {Func} 返回比例尺函数
   */
  getScale() {
    return this.scale
  }

  /**
   * 创建多边形顶点坐标
   * @param  {Number} len     边数
   * @param  {Number} cx      中心点
   * @param  {Number} cy      中心点
   * @param  {Number} radius  半径
   * @param  {Array}  range   每个顶点相对最大半径的比值
   * @return {Array}  points
   */
  createPoints(len, cx, cy, radius, range = []) {
    let points = []
    for (let i = 0; i < len; i ++) {
      // 求出每一个点形成的三角形所占的弧度
      let angle = 360 / len * (i + 1) * Math.PI / 180

      // 每个弧度减去90°
      let actAngle = angle - Math.PI / 2
      
      // 如果不设置区间，则绘制最大的正多边形
      let x, y
      if (range.length === 0) {
        x = cx + Math.cos(actAngle) * radius
        y = cy + Math.sin(actAngle) * radius
      } else {
        x = cx + Math.cos(actAngle) * (radius * range[i])
        y = cy + Math.sin(actAngle) * (radius * range[i])
      }
           
      points.push([x, y])
    }   

    return points
  }

  /**
   * 绘制坐标主体线段部分
   * @return {void}   void
   */
  drawAxis() {
    let { radius } = this.AXIS
    let { ticks } = this.axis

    // 制作数据
    let dataset = new Array(ticks)
    for (let i = 0; i < ticks; i ++) {
      dataset[i] = { 
        r: i === 0 ? radius / ticks / 2 : i * (radius / (ticks - 1)),
        value: i * (this.max / (ticks - 1))
      }
    }
    
    let update = this.axisG.selectAll('g.radar-axis-polygon').data(dataset.reverse())
    let enter = update.enter().append('g').classed('radar-axis-polygon', true)
    let exit = update.exit()
    
    // ENTER polygon
    enter.append('polygon')
      .call(::this.setAxisPolygonAttr)

    // UPDATE polygon
    update.select('polygon.axis-polygon')
      .call(::this.setAxisPolygonAttr)

    // EXIT polygon
    exit.select('polygon.axis-polygon')
      .remove()

    if (this.axis.axisTicks.show) {    
      // ENTER tick
      enter.append('text')
        .call(::this.setAxisTicksAttr)
      // UPDATE tick
      update.select('text.axis-tick')
        .call(::this.setAxisTicksAttr)
      // EXIT tick
      exit.select('text.axis-tick')
        .remove()
    }

  }

  /**
   * 设置刻度属性
   * @param  {Object} selection 选择集对象
   * @return {void}   void
   */
  setAxisTicksAttr(selection) {
    let { radius, cx, cy } = this.AXIS
    let { ticks, axisTicks } = this.axis    

    selection
      .classed('axis-tick', true)
      .text(d => {
        let formatter = axisTicks.formatter
        let indexOf = formatter.indexOf('{value}')
        let unit = formatter.replace('{value}', '')
        if (indexOf === 0) {
          return Math.round(d.value) + unit
        } 
        return unit + Math.round(d.value)
      })
      .attr('x', d => this.createPoints(this.LEN, cx, cy, d.r)[this.LEN - 1][0])
      .attr('y', d => this.createPoints(this.LEN, cx, cy, d.r)[this.LEN - 1][1])
      .attr('dy', radius / ticks / 2)
      .attr('fill', filters(this.selector, axisTicks.fill))
      .attr('font-size', axisTicks.fontSize)
      .attr('text-anchor', 'middle')
  }

  /**
   * 设置多边形属性
   * @param  {Object} selection 选择集对象
   * @return {void}   void
   */
  setAxisPolygonAttr(selection) {
    let { cx, cy } = this.AXIS
    let { axisPolygon } = this.axis

    selection
      .classed('axis-polygon', true)
      .attr('points', d => this.createPoints(this.LEN, cx, cy, d.r))
      .attr('fill', (d, i) => i % 2 === 0 
        ? filters(this.selector, axisPolygon.evenFill) 
        : filters(this.selector, axisPolygon.oddFill))
      .attr('stroke', filters(this.selector, axisPolygon.stroke))
      .attr('stroke-width', axisPolygon.strokeWidth)
  }

  /**
   * 绘制文本标签
   * @return {void}  void
   */
  drawLabels() {
    let update = this.axisG.selectAll('g.radar-axis-label').data(this.DOMAIN)
    let enter = update.enter().append('g').classed('radar-axis-label', true)
    let exit = update.exit()

    // 绘制连线
    if (this.axis.axisLines.show) {
      // ENTER
      enter.append('line')
        .call(::this.setAxisLineAttr)
      // UPDATE
      update.select('line.axis-line')
        .call(::this.setAxisLineAttr)
      // EXIT
      exit.select('line.axis-line')
        .remove()
    }

    // 绘制顶点图标
    if (this.axis.axisSymbols.show) {
      // ENTER
      enter.append('path')
        .call(::this.setAxisSymbolsAttr)
      // UPDATE
      update.select('path.axis-symbol')
        .call(::this.setAxisSymbolsAttr)
      // EXIT
      exit.select('path.axis-symbol')
        .remove()
    }

    // 绘制文本标签
    if (this.axis.axisLabels.show) {
      // ENTER
      enter.append('text')
        .call(::this.setAxisLabelsAttr)
      // UPDATE
      update.select('text.axis-label')
        .call(::this.setAxisLabelsAttr)
      // EXIT
      exit.select('text.axis-label')
        .remove()
    }
  }

  /**
   * 设置标签的属性
   * @param  {Object} selection 选择集对象
   * @return {void}   void
   */
  setAxisLabelsAttr(selection) {
    let { radius, cx, cy } = this.AXIS
    let { fill, fontSize, gap } = this.axis.axisLabels

    selection
      .classed('axis-label', true)
      .text(d => d)
      .attr('fill', filters(this.selector, fill))
      .attr('fontSize', fontSize)
      .attr('text-anchor', (d, i) => {
        let x = this.createPoints(this.LEN, cx, cy, radius)[i][0]
        if (x > cx) {
          return 'start'
        } else if (x < cx) {
          return 'end'
        } else if (x === cx) {
          return 'middle'
        }
      })
      .attr('x', (d, i) => {
        let x = this.createPoints(this.LEN, cx, cy, radius)[i][0]
        
        if (x > cx) {
          x += gap
        } else if (x < cx) {
          x -= gap
        }

        return x
      })
      .attr('y', (d, i) => {
        let x = this.createPoints(this.LEN, cx, cy, radius)[i][0]
        let y = this.createPoints(this.LEN, cx, cy, radius)[i][1]

        if (x !== cx && y !== cy) {
          if (y > cy) {
            y += gap
          }
        } else if (x === cx) {
          if (y > cy) {
            y += gap * 1.5
          } else if (y < cy) {
            y -= gap
          }
        }

        return y
      })
  }

  /**
   * 设置图案属性
   * @param  {Object} selection 选择集对象
   * @return {void}   void
   */
  setAxisSymbolsAttr(selection) {
    let { radius, cx, cy } = this.AXIS
    let { symbol, symbolSize, fill, stroke, strokeWidth } = this.axis.axisSymbols

    // 定义路径字符串
    let path
    let type = symbol.indexOf('path://')
      
    // 使用默认图标
    if (type === -1) {
      path = d3.svg.symbol()
        .type(symbol)
        .size(Math.pow(symbolSize, 2))()  
    }

    // 使用定制化图标
    if (type === 0) {
      path = symbol.replace('path://', '')
    }

    selection
      .classed('axis-symbol', true)
      .attr('d', path)
      .attr('fill', filters(this.selector, fill))
      .attr('stroke', filters(this.selector, stroke))
      .attr('stroke-width', strokeWidth)
      .attr('transform', (d, i) => {
        let x = this.createPoints(this.LEN, cx, cy, radius)[i][0]
        let y = this.createPoints(this.LEN, cx, cy, radius)[i][1]
        return `translate(${x} ${y})`
      })
  }

  /**
   * 设置线段属性
   * @param  {Object} selection 选择集对象
   * @return {void}   void
   */
  setAxisLineAttr(selection) {
    let { radius, cx, cy } = this.AXIS
    let { stroke, strokeWidth } = this.axis.axisLines

    selection
      .classed('axis-line', true)
      .attr('x1', cx)
      .attr('y1', cy)
      .attr('x2', (d, i) => this.createPoints(this.LEN, cx, cy, radius)[i][0])
      .attr('y2', (d, i) => this.createPoints(this.LEN, cx, cy, radius)[i][1])
      .attr('stroke', filters(this.selector, stroke))
      .attr('stroke-width', strokeWidth)
  }

  /**
   * 渲染
   * @param  {Array} series 数据集
   * @return {void}  void
   */
  render(series) {
    this.createScale(series)
    
    this.LEN = series[0].data.length
    this.DOMAIN = series[0].data.map(d => d.name) 

    // 绘制坐标
    this.drawAxis()
    // 绘制文本标签
    this.drawLabels()
  }
}
