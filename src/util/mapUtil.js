/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-10 16:32:11 
 * @Description: 地图工具类
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 15:34:23
 */
import $ from 'jquery'
export default {
	initBMap(domId, cityName, initSize, minZoom, maxZoom) {
		// 创建Map实例
		let map = new BMap.Map(domId, {
			minZoom: minZoom,
			maxZoom: maxZoom,
			enableMapClick: false  // 去除百度地图默认的点击事件
		})

		//按城市名称设置地图中心点
		map.centerAndZoom(cityName, initSize)
		// 开启鼠标滚轮缩放
		map.enableScrollWheelZoom(true)
		//添加平移缩放控件
		// let NavigationControl = new BMap.NavigationControl({
		// 	type: BMAP_NAVIGATION_CONTROL_LARGE,
		// 	offset: new BMap.Size(0, 90),
		// 	anchor: BMAP_ANCHOR_BOTTOM_RIGHT
		// });
		// map.addControl(NavigationControl)
		return map
	},
	
	initBMapWithMaxMinBackground(domId, mapCenter, initSize, min, max, backgroud) {
		let map = new BMap.Map(domId, {
			maxZoom: max,
			minZoom: min,
			enableMapClick: false
			// 去除百度地图默认的点击事件
		});
		$('#' + domId).css('background-color', backgroud);
		// 创建点坐标
		map.centerAndZoom(mapCenter, initSize);
		map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
		map.clearOverlays();
		return map;
	},
	zoomUp(map) {
		let zoom = map.getZoom()
		zoom = zoom + 1;
		if (zoom > 16) {
				return
		}
		map.setZoom(zoom);
	},
	zoomDown(map) {
		let zoom = map.getZoom()
		zoom = zoom - 1;
		if (zoom < 8) {
				return
		}
		map.setZoom(zoom);
	}
}
