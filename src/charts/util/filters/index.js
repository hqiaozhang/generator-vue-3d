/*
 * @Author: liqi@hiynn.com 
 * @Date: 2018-01-23 13:58:15 
 * @Description: 滤镜方法
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-02-09 17:05:54
 */
import $ from 'jquery'
import d3 from 'd3'
import _ from 'lodash'
import gridHbs from './templates/grid.hbs'
import columnHbs from './templates/column.hbs'

/**
 * 创建渐变
 * 1. 线性渐变：
 * linear = {
 *    type: 'linear',
 *    direction: [x1, y1, x2, y2],
 *    addColorStops: [
 *      { offset: 0, color: '' }
 *    ]
 * }
 * ----------
 * 2. 径向渐变
 * radial = {
 *    type: 'radial',
 *    direction: [cx, cy, r, fx, fy],
 *    addColorStops: [
 *      { offset: 0, color: '' }
 *    ]
 * }
 * @param  {Object} option 配置项
 * @return {String} 返回 id
 */
function gradient(option) {
  let { type, target, id, reg, svg } = option

  // 创建线性或径向渐变
  if (type === 'linear' || type === 'radial') {
    const { direction = [], addColorStops = {} } = target
    
    id = type + 
      JSON.stringify(direction).replace(reg, '') + 
      JSON.stringify(addColorStops).replace(reg, '')
      
    // 如果该渐变已经被创建，则直接返回 id
    let defs = $(`#${svg.attr('id')} defs`)
    if (defs.find(`#${id}`).length > 0) {
      return `url(#${id})`
    }

    // 线性渐变
    if (type === 'linear') {
      svg
        .append('defs')
        .append('linearGradient')
        .attr('id', id)
        .attr('x1', direction[0])    
        .attr('y1', direction[1])    
        .attr('x2', direction[2])    
        .attr('y2', direction[3])
        .selectAll('stop')
        .data(addColorStops)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .style('stop-color', d => d.color)
    }

    // 径向渐变
    if (type === 'radial') {
      svg
        .append('defs')
        .append('radialGradient')
        .attr('id', id)
        .attr('cx', direction[0])    
        .attr('cy', direction[1])    
        .attr('r', direction[2])    
        .attr('fx',direction[3])
        .attr('fy', direction[4])
        .selectAll('stop')
        .data(addColorStops)
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .style('stop-color', d => d.color)      
    }        
    
    return `url(#${id})`
  }  
}

/**
 * 创建图案
 * pattern = {
 *    type: 'pattern',
 *    pattern: 'grid || column',
 *    background: string || gradientObject
 *    lineStyle: {
 *      strokeWidth: 1,
 *      stroke: '#FFF',
 *      density: 0.05
 *    }
 * }
 * @param  {Object} option 配置项
 * @return {String} 返回 id
 */
function patterning(option) {
  let { type, target, id, reg, svg } = option

  // 创建图案
  if (type === 'pattern') {
    const { pattern, background = {}, lineStyle} = target
    const bbox = svg.node().getBBox()
    const width = bbox.width
    const height = bbox.height
    const rate = width / height
    
    id = pattern + JSON.stringify(background).replace(reg, '')

    // 如果该渐变已经被创建，则直接返回 id
    let defs = $(`#${svg.attr('id')} defs`)
    if (defs.find(`#${id}`).length > 0) {
      return `url(#${id})`
    }    

    switch(pattern) {
    // 网格图案
    case 'grid':
      svg
        .append('defs')
        .html(gridHbs({
          id,
          lineStyle,
          background,
          _width: lineStyle.density,
          _height: lineStyle.density * rate
        }))
      break
    // 堆叠网格图案
    case 'column':
      svg
        .append('defs')
        .html(columnHbs({
          id,
          lineStyle,
          background,
          _height: lineStyle.density
        }))
      break
    default:
      throw new Error('Error:must set pattern!')
    }    

    return `url(#${id})`
  }
}

/**
 * 创建阴影滤镜
 * shadow = {
 *    type: 'shadow',
 *    shadowColor: 'red',
 *    shadowBlur: 20,
 *    shadowOffsetX: 0,
 *    shadowOffsetY: 0
 * }
 * @param {Object} option 配置项
 * @return {String} 返回 ID
 */
function shadow(option) {
  let { type, target, id, reg, svg } = option

  // 创建阴影滤镜
  if (type === 'shadow') {
    const { 
      shadowColor = 'black',
      shadowBlur = 20,
      shadowOffsetX = 0,
      shadowOffsetY = 0,
      shadowOpacity = 0.87
    } = target

    id = 
      type + shadowColor.toString().replace(reg, '') + shadowBlur.toString().replace(reg, '') +
      shadowOffsetX.toString().replace(reg, '') + shadowOffsetY.toString().replace(reg, '') + 
      shadowOpacity.toString().replace(reg, '')

    // 如果该滤镜已被创建,则直接返回 id
    let defs = $(`#${svg.attr('id')} defs`)
    if (defs.find(`#${id}`).length > 0) {
      return `url(#${id})`
    }
   
    let [r, g, b] = [
      d3.rgb(shadowColor).r / 255, 
      d3.rgb(shadowColor).g / 255,
      d3.rgb(shadowColor).b / 255
    ]    

    let filter = svg
      .append('defs')
      .append('filter')
      .attr('id', id)
      .attr('x', -0.5)
      .attr('y', -0.5)
      .attr('width', 3)
      .attr('height', 3)
    
    filter.append('feOffset')
      .attr('result', 'offOut')
      .attr('in', 'SourceAlpha')
      .attr('dx', shadowOffsetX)
      .attr('dy', shadowOffsetY)
    filter.append('feColorMatrix')
      .attr('result', 'matrixOut')
      .attr('in', 'offOut')
      .attr('type', 'matrix')
      .attr('values', `
        0 0 0 ${r} 0
        0 0 0 ${g} 0
        0 0 0 ${b} 0 
        0 0 0 ${shadowOpacity} 0`)
    filter.append('feGaussianBlur')
      .attr('result', 'blurOut')
      .attr('in', 'matrixOut')
      .attr('stdDeviation', shadowBlur)
    filter.append('feBlend')
      .attr('in', 'SourceGraphic')
      .attr('in2', 'blurOut')
      .attr('mode', 'normal')

    return `url(#${id})`
  }
}

/**
 * 创建滤镜的公共方法
 * @param  {Object} svg    svg 容器
 * @param  {Mix}    target 颜色字符串，或 colorStops 对象
 * @return {String} 返回颜色字符串，或 填充 的 id 名
 */
export function filters(svg, target) {  
  // 如果 target 为空,则跳出
  if (!target) {
    return
  }
  
  const type = target.type

  // 如果是颜色字符串，或者 d3 的颜色对象，则直接返回
  if (_.isString(target) || !type) {
    return target
  }  

  // 如果 target 不是一个对象,则跳出
  if (!_.isObject(target)) {
    return
  }

  // 制作唯一 id 标识符
  let id, reg = /\s|,|\.|#|\(|\)|"|'|:|\[|\]|\{|\}|/gi

  // 创建渐变
  let gradientid = gradient({ type, target, id, reg, svg })
  if (gradientid) {
    return gradientid
  }

  // 创建图案
  let patternid = patterning({ type, target, id, reg, svg })
  if (patternid) {
    return patternid
  }

  // 创建阴影滤镜
  let shadowid = shadow({ type, target, id, reg, svg })
  if (shadowid) {
    return shadowid
  }  
}
