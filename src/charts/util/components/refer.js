/*
 * @Author: liqi@hiynn.com 
 * @Date: 2018-01-26 14:24:14 
 * @Description: 参考线
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-02-09 17:05:14
 */
import d3 from 'd3'
import _ from 'lodash'

export default class Refer {
  /**
   * 初始化配置
   * @param  {Object} option 配置项
   * @return {void}   void
   */
  initConfig(option) {
    this.grid = option.grid

    let { width, height, left, right, top, bottom } = this.grid
    this.AXIS = {
      width: width - (left + right),
      height: height - (top + bottom)
    }

    // 参考线配置
    this.refer = _.merge({
      stroke: '#6C6C6F',
      strokeWidth: 1,
      symbol: 'triangle-down',
      symbolSize: 8,
      symbolFill: '#91e8e1'      
    }, option.refer)
  }

  /**
   * 初始化容器
   * @param  {Object} svg svg 容器
   * @return {void}   void
   */
  initGroup(svg) {
    let { stroke, strokeWidth, symbol, symbolSize, symbolFill } = this.refer
    let path = d3.svg.symbol()
      .type(symbol)
      .size(Math.pow(symbolSize, 2))()  
    this.referG = svg.append('g')
      .classed('refer-line', true)
      .attr('opacity', 0)
    this.referG.append('line')
      .attr('y2', this.AXIS.height)
      .attr('stroke', stroke)
      .attr('stroke-width', strokeWidth)
    this.referG.append('path')
      .attr('d', path)
      .attr('fill', symbolFill)
  }

  /**
   * 实例化
   * @param {Object} svg svg 容器
   * @param {Object} option 配置项
   */
  constructor(svg, option = {}) {
    this.initConfig(option) 
    this.initGroup(svg)
  }

  /**
   * 显示参考线
   * @param  {Number} offsetX x 轴偏移
   * @return {void}   void
   */
  show(offsetX) {
    this.referG
      .attr('opacity', 1)
      .transition()
      .duration(100)
      .ease('cubicIn')
      .attr('transform', `translate(
        ${offsetX} ${this.grid.top}
      )`)    
  }

  /**
   * 隐藏参考线
   * @return {void} void
   */
  hide() {
    this.referG
      .attr('opacity', 0)
  }
}
