/*
 * @Author: zhanghongqiao 
 * @Date: 15:59 2018/8/1
 * @Email: 991034150@qq.com 
 * @Description: [Description]
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 15:59 2018/8/1
 */

function Doin(step, duration, done){
  this.duration = duration || 2;
  this.step = step;
  this.done = done;
  this.stop = false;
  this.RAF;
};

Doin.prototype = {
  run : function(){
    "use strict";
    cancelAnimationFrame(this.RAF);
    var startTime = new Date(),
      that = this;
    (function run(){
      var now, elapsed, t;
      now = new Date();

      elapsed = (now - startTime)/1000;
      t = (elapsed/that.duration);
      //以时间来控制，不同的圆圈的显示时间差

      // do a step on each frame
      that.step(t, elapsed);

      // stop sequence if duration has passed
      if( t < 1 || that.stop )
        that.RAF = requestAnimationFrame(run);  // can also use: setTimeout(run, 60/1000)
      else if(that.done)
        that.done();
    })();
  }
};

export {
  Doin
}