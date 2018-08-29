/*
 * @Author: liqi@hiynn.com 
 * @Date: 2018-01-22 13:48:20 
 * @Description: 提示框绘制方法
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-02-09 17:04:54
 */
import $ from 'jquery'
import _ from 'lodash'
import { randomString } from '../util'

export default class Tooltip {
  /**
   * 实例化
   * @param {String} selector 父级选择器
   * @param {Object} option   配置项
   */
  constructor(selector, option) {
    _.templateSettings.interpolate = /{([\s\S]+?)}/g

    this.selector = selector
    this.config = _.merge({
      show: true,
      // 启动模板模式,会让 style 中的属性失效,样式必须用户自定义
      template: null,
      style: {
        background: 'rgba(11, 16, 19, .66)',
        radius: 4,
        padding: 8,
        color: '#FCFAF2',
        fontSize: 12,
        formatter: '{value}'
      }
    }, option)

    this.tooltipid = `tooltip${randomString(10)}`
    $(selector).append(`
      <div id="${this.tooltipid}" style="display: none;position: absolute;"></div>`)
  }

  /**
   * 显示 tooltip
   * @param  {Mix}    series Array,当前数据集  String,自定义模板
   * @param  {Object} option 配置对象
   *                         <-
   * x          {Number}          鼠标 offsetX 的值
   * y          {Number}          鼠标 offsetY 的值
   * fill       {String}          图标的颜色
   *                         ->
   * @return {void}   void
   */
  show(series, option) {
    if (!this.config.show) {
      return
    }

    const { x, y, fill } = option
    const { legendName, titleName, value } = series
    const { background, radius, padding, color, fontSize, formatter } = this.config.style

    let isStart = formatter.startsWith('{value}')
    let unit = formatter.replace('{value}', '') 

    // 默认的模板
    let template
    if (!this.config.template) {
      if (_.isString(series)) {
        let tpl = _.template(series)
        template = tpl(this.config.style)
      } else {
        template = `
         <article style="color: ${color};">
          <div style="margin-bottom: 6px;font-size: ${fontSize}px">${titleName}</div>
          <div style="display: flex;align-items: center;">
            <svg width="${fontSize - 4}" height="${fontSize - 4}">
              <circle 
                r="${(fontSize - 4) / 2}" 
                cx="${(fontSize - 4) / 2}"
                cy="${(fontSize - 4) / 2}"
                fill="${fill}"></circle>
            </svg>
            <div style="font-size: ${fontSize - 4}px;margin-left: 8px;">
              ${legendName}：${isStart ? value + unit : unit + value}
            </div>
          </div>
        </article>`
      }      
    } else {
      let tpl = _.template(this.config.template)
      template = tpl(series)
    }

    // 将定义好的模板字符串 append 进容器
    $(`#${this.tooltipid}`)
      .show()
      .html(template)
      .css({
        left: x + 20,
        top: y + 20,
        borderRadius: `${radius}px`,
        background,
        padding: `${padding}px`,
        transition: 'all 0.3s ease'
      })
  }

  /**
   * 隐藏提示框
   * @return {void} void
   */
  hide() {
    $(`#${this.tooltipid}`).hide()
  }
}
