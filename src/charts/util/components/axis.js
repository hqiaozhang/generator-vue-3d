/*
 * @Author: liqi@hiynn.com 
 * @Date: 2018-01-25 11:09:06 
 * @Description: 绘制坐标系统
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-02-09 17:05:30
 */
import d3 from 'd3'
import $ from 'jquery'
import _ from 'lodash'
import { randomString } from '../util'

export default class Axis {
  /**
   * 初始化配置项
   * @param  {Object} option 配置项
   * @return {void}   void
   */
  initConfig(option) {
    // 配置主题栅格布局信息
    this.grid = option.grid

    let { width, height, left, right, top, bottom } = this.grid
    this.AXIS = {
      width: width - (left + right),
      height: height - (top + bottom)
    }

    // 配置动画信息
    this.duration = option.duration
    this.easing = option.easing

    // 配置坐标系统
    this.xAxis = _.merge({
      mode: 'normal', // normal || linear
      axisLine: {
        stroke: '#6C6C6F',
        strokeWidth: 1
      },
      axisTick: {
        size: 5,
        stroke: '#6C6C6F',
        strokeWidth: 1         
      },
      axisLabel: {
        fill: '#DEDEE1',
        fontSize: 12,
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: '{value}'
      }
    }, option.xAxis)

    this.yAxis = _.merge({
      mode: 'normal', // normal || totalize || ordinal
      axisLine: {
        stroke: '#606062',
        strokeWidth: 1
      },
      axisTick: {
        ticks: 10,
        size: -5,
        stroke: '#6C6C6F',
        strokeWidth: 1,
        strokeDasharray: null
      },
      axisLabel: {
        fill: '#DEDEE1',
        fontSize: 12,
        offsetX: -5,
        offsetY: 0,
        rotate: 0,
        formatter: '{value}'
      }
    }, option.yAxis)

    this.yAxis2 = _.merge({
      axisLine: {
        stroke: '#606062',
        strokeWidth: 1
      },
      axisTick: {
        ticks: 10,
        size: -5,
        stroke: '#6C6C6F',
        strokeWidth: 1
      },
      axisLabel: {
        fill: '#DEDEE1',
        fontSize: 12,
        offsetX: 5,
        offsetY: 0,
        rotate: 0,
        formatter: '{value}'
      }
    }, option.yAxis2)
  }  

  /**
   * 初始化容器
   * @param  {Object} selector svg 容器
   * @return {void}   void
   */
  initGroup(selector) {
    this.yAxisG = selector.append('g')
      .classed('y-axis', true)
    this.yAxis2G = selector.append('g')
      .classed('y-axis-2', true)
    this.xAxisG = selector.append('g')
      .classed('x-axis', true)
  }

  /**
   * 初始化 style 标签
   * @param  {Object} selector svg 容器
   * @return {void}   void
   */
  initStyle(selector) {
    this.svgid = selector.attr('id')

    // x 轴样式
    let xAxis = `
      #${this.svgid} .x-axis .domain {
        fill: none;
        stroke: ${this.xAxis.axisLine.stroke};
        stroke-width: ${this.xAxis.axisLine.strokeWidth};
      }
      #${this.svgid} .x-axis .tick line {
        fill: none;
        stroke: ${this.xAxis.axisTick.stroke};
        stroke-width: ${this.xAxis.axisTick.strokeWidth};
      }
      #${this.svgid} .x-axis .tick text {
        fill: ${this.xAxis.axisLabel.fill};
        font-size: ${this.xAxis.axisLabel.fontSize}px;
        text-anchor: middle;
      }
    `

    // y 轴样式
    let yAxis = `
      #${this.svgid} .y-axis .domain {
        fill: none;
        stroke: ${this.yAxis.axisLine.stroke};
        stroke-width: ${this.yAxis.axisLine.strokeWidth};
      }
      #${this.svgid} .y-axis .tick line {
        fill: none;
        stroke: ${this.yAxis.axisTick.stroke};
        stroke-width: ${this.yAxis.axisTick.strokeWidth};
        stroke-dasharray: ${this.yAxis.axisTick.strokeDasharray}
      }
      #${this.svgid} .y-axis .tick text {
        fill: ${this.yAxis.axisLabel.fill};
        font-size: ${this.yAxis.axisLabel.fontSize}px;
        transform: 
          rotate(${this.yAxis.axisLabel.rotate}deg) 
          translateX(${this.yAxis.axisLabel.offsetX}px)
          translateY(${this.yAxis.axisLabel.offsetY}px);
      }
    `

    // 第二条 y 轴样式
    let yAxis2 = `
      #${this.svgid} .y-axis-2 .domain {
        fill: none;
        stroke: ${this.yAxis2.axisLine.stroke};
        stroke-width: ${this.yAxis2.axisLine.strokeWidth};
      }
      #${this.svgid} .y-axis-2 .tick line {
        fill: none;
        stroke: ${this.yAxis2.axisTick.stroke};
        stroke-width: ${this.yAxis2.axisTick.strokeWidth};
      }
      #${this.svgid} .y-axis-2 .tick text {
        fill: ${this.yAxis2.axisLabel.fill};
        font-size: ${this.yAxis2.axisLabel.fontSize}px;
        transform: 
          rotate(${this.yAxis2.axisLabel.rotate}deg) 
          translateX(${this.yAxis2.axisLabel.offsetX}px)
          translateY(${this.yAxis2.axisLabel.offsetY}px);
      }
    `
    
    this.styleid = `style${randomString(10)}`
    $('head').append(`
      <style id="${this.styleid}">
        ${xAxis}
        ${yAxis}
        ${yAxis2}
      </style>
    `)
  }

  /**
   * 实例化
   * @param {Object} selector svg 容器
   * @param {Object} option   完整的配置项
   */
  constructor(selector, option) {
    this.initConfig(option)
    this.initGroup(selector)   
    this.initStyle(selector)

    this.domain = null
  }

  /**
   * 创建 x 轴比例尺
   * @param  {Array} series 集合
   * @return {Func}  返回比例尺函数 
   */
  createXScale(series) {
    let min, max
    let arr = []

    switch(this.xAxis.mode) {
    case 'normal':
      if (series.length > 0) {
        this.domain = series[0].data.map(d => d.name)
      } else {
        this.domain = []
      }
  
      this.xScale = d3.scale.ordinal()
        .domain(this.domain)
        .rangeBands([0, this.AXIS.width])
      break
    case 'linear':
      for (let chunk of series) {
        for (let d of chunk.data) {
          arr.push(d.value)
        }     
      }
    
      min = d3.min(arr)
      max = d3.max(arr)

      this.xScale = d3.scale.linear()
        .domain([min > 0 ? min / 2 : min * 1.1, max * 1.1])
        .rangeRound([0, this.AXIS.width])
      break
    default:
      throw new Error('Error:miss mode!')
    }    
  }

  /**
   * 创建 y 轴比例尺
   * @param  {Array} series 集合
   * @return {Func}  返回比例尺函数
   */
  createYScale(series) {
    let min, max
    let arr = []
    let totalarr = []

    switch(this.yAxis.mode) {
    case 'normal':
      for (let chunk of series) {
        for (let d of chunk.data) {
          arr.push(d.value)
        }     
      }
      
      min = d3.min(arr)
      max = d3.max(arr)

      this.yScale = d3.scale.linear()
        .domain([min > 0 ? min / 2 : min * 1.1, max * 1.1])
        .rangeRound([this.AXIS.height, 0])
      break
    case 'totalize':
      for (let i = 0; i < series[0].data.length; i ++) {
        totalarr.push([])
      }
      for (let chunk of series) {
        for (let [i, d] of chunk.data.entries()) {
          totalarr[i].push(d.value)
        }
      }
      for (let d of totalarr) {
        arr.push(_.sum(d))
      }

      min = 0
      max = d3.max(arr)

      this.yScale = d3.scale.linear()
        .domain([min > 0 ? min / 2 : min * 1.1, max * 1.1])
        .rangeRound([this.AXIS.height, 0])
      break
    case 'ordinal':
      if (series.length > 0) {
        this.domain = series[0].data.map(d => d.name)
      } else {
        this.domain = []
      }

      this.yScale = d3.scale.ordinal()
        .domain(this.domain)
        .rangeBands([this.AXIS.height, 0])
      break
    default:
      throw new Error('Error:miss mode!')
    }            
  }

  /**
   * 创建第二个 y 轴比例尺
   * @param  {Array} series 集合
   * @return {Func}  返回比例尺函数
   */
  createYScale2(series) {
    let arr = []
    for (let chunk of series) {
      for (let d of chunk.data) {
        arr.push(d.value)
      }
    }

    let min = d3.min(arr)
    let max = d3.max(arr)

    this.yScale2 = d3.scale.linear()
      .domain([min > 0 ? min / 2 : min * 1.1, max * 1.1])
      .rangeRound([this.AXIS.height, 0])
  }

  /**
   * 外部获取比例尺的方法
   * @return {Object} 将比例尺封装成对象返回
   */
  getScale() {
    return {
      xScale: this.xScale,
      yScale: this.yScale,
      yScale2: this.yScale2
    }
  }

  /**
   * 绘制 x 轴坐标系
   * @param  {Array} series 数据集
   * @return {void}  void
   */
  drawXAxis(series) {
    // 创建比例尺
    this.createXScale(series)

    // 开始绘制坐标系统
    let xAxis = d3.svg.axis()
      .scale(this.xScale)
      .outerTickSize(0)
      .innerTickSize(this.xAxis.axisTick.size)
      .tickFormat(d => {
        let formatter = this.yAxis.axisLabel.formatter
        let indexOf = formatter.indexOf('{value}')
        let unit = formatter.replace('{value}', '')
        if (indexOf === 0) {
          return d + unit
        } 
        return unit + d    
      })
      .orient('bottom')

    // 绘制 x 轴
    let { left, top } = this.grid
    let { height } = this.AXIS
    this.xAxisG
      .attr('transform', `translate(
        ${left} ${height + top}
      )`)

    if (this.xAxis.mode === 'linear') {
      this.xAxisG
        .transition()
        .duration(this.duration)
        .ease(this.easing)
        .call(xAxis)
    } else {
      this.xAxisG
        .call(xAxis)
  
      // 1. 将整个刻度按照正常的比例尺偏移
      $(`#${this.svgid} .x-axis .tick`)
        .each((i, e) => {
          $(e).attr('transform', `translate(${this.xScale(this.domain[i])}, 0)`)
        })
      // 2. 移动文字到中心位置
      $(`#${this.svgid} .x-axis .tick`).find('text')
        .each((i, e) => {
          $(e)
            .attr('style', `transform:
              translateX(${this.xScale.rangeBand() / 2 + this.xAxis.axisLabel.offsetX}px)
              translateY(${this.xAxis.axisLabel.offsetY}px)
              rotate(${this.xAxis.axisLabel.rotate}deg) 
            `)
        })
    }
  }

  /**
   * 绘制 x 轴坐标系
   * @param  {Array} series 数据集
   * @return {void}  void
   */
  drawYAxis(series) {
    // yAxisIndex 默认为 0 
    for (let d of series) {
      if (d.yAxisIndex === undefined) {
        d.yAxisIndex = 0
      }
    }

    let _series = series.filter(d => d.yAxisIndex === 0)
    let _series2 = series.filter(d => d.yAxisIndex === 1)

    // 创建比例尺
    this.createYScale(_series)
    this.createYScale2(_series2)

    let { left, top } = this.grid

    let yAxis = d3.svg.axis()
      .scale(this.yScale)
      .ticks(this.yAxis.axisTick.ticks)
      .outerTickSize(0)
      .innerTickSize(this.yAxis.axisTick.size)
      .tickFormat(d => {
        let formatter = this.yAxis.axisLabel.formatter
        let indexOf = formatter.indexOf('{value}')
        let unit = formatter.replace('{value}', '')
        if (indexOf === 0) {
          return d + unit
        } 
        return unit + d        
      })
      .orient('left')

    let yAxis2 = d3.svg.axis()
      .scale(this.yScale2)
      .outerTickSize(0)
      .innerTickSize(this.yAxis2.axisTick.size)
      .tickFormat(d => {
        let formatter = this.yAxis2.axisLabel.formatter
        let indexOf = formatter.indexOf('{value}')
        let unit = formatter.replace('{value}', '')
        if (indexOf === 0) {
          return d + unit
        } 
        return unit + d        
      })
      .orient('right')

    if (_series.length > 0) {
      this.yAxisG
        .attr('transform', `translate(
        ${left} ${top}
      )`)

      if (this.yAxis.mode === 'ordinal') {
        this.yAxisG
          .call(yAxis)

        // 1. 将整个刻度按照正常的比例尺偏移
        $(`#${this.svgid} .y-axis .tick`)
          .each((i, e) => {
            $(e).attr('transform', `translate(0, ${this.yScale(this.domain[i])})`)
          })
        // 2. 移动文字到中心位置
        $(`#${this.svgid} .y-axis .tick`).find('text')
          .each((i, e) => {
            $(e)
              .attr('style', `transform:
                translateX(${this.yAxis.axisLabel.offsetX * 6}px)
                translateY(${this.yScale.rangeBand() / 2 + this.yAxis.axisLabel.offsetY}px)
                rotate(${this.yAxis.axisLabel.rotate}deg) 
              `)
          })
      } else {
        this.yAxisG                
          .transition()
          .duration(this.duration)
          .ease(this.easing)
          .call(yAxis)
      }
    }

    if (_series2.length > 0) {
      this.yAxis2G
        .attr('transform', `translate(
          ${left + this.AXIS.width} ${top}
        )`)
        .transition()
        .duration(this.duration)
        .ease(this.easing)
        .call(yAxis2)
    } 
  }

  /**
   * 绘制坐标轴的方法
   * @param  {Array} series 数据集合
   * @return {void}  void
   */
  render(series) {
    this.drawXAxis(series)
    this.drawYAxis(series)    
  }
}
