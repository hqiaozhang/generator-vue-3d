/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-31 11:00:15 
 * @Email: 991034150@qq.com 
 * @Description: 随机颜色
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-31 11:13:19
 */
 

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

AFRAME.registerComponent("random-color", {
  dependencies: ["material"],
  init: function() {
    // 将材质组件的颜色属性设置为随机颜色
    this.el.setAttribute("material", "color", getRandomColor());
    this.el.setAttribute('geometry', )
  }
});

 
 

