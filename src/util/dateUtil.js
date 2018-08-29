/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-05 15:10:36 
 * @Email: 991034150@qq.com 
 * @Description: 时间类工具
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-24 20:57:37
 */

 /**
 *
 * TODO //对Date的扩展，将 Date 转化为指定格式的String //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用
 * 1-2 个占位符， //年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) //例子： //(new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 //(new
 * Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 Date
 * 2015年6月23日下午1:31:48 Author liuylong
 */
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "H+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds()
      // 毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
          .substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
              (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export function timeFormat(fmt, sourceDate, h) {
    var curDate = new Date(sourceDate);
    // 加上一小时
    var date = new Date(curDate.getTime() + 3600000 * h)
    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt
}


export  function dateFormat(fmt, t, sourceDate) {
    var date
    switch (t) {
        case 0:  // 减一天
            var curDate = !sourceDate ? new Date() : new Date(sourceDate);
            date = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
         break;
        case 1:  // 加一天
            var curDate = !sourceDate ? new Date() : new Date(sourceDate);
            date = new Date(curDate.getTime() + 24 * 60 * 60 * 1000)
            break;
        default:
            date = new Date()
         break
    }

    var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};