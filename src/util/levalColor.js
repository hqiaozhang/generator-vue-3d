const RANGE_AQI = [0, 50, 100, 150, 200, 300];
const RANGE_PM25 = [0, 35, 75, 115, 150, 250];
const RANGE_PM10 = [0, 50, 150, 250, 350, 420];
const RANGE_SO2 = [0, 150, 500, 650, 800, 1600];
const RANGE_CO = [0, 5, 10, 35, 60, 90];
const RANGE_O3 = [0, 160, 200, 300, 400, 800];
const RANGE_NO2 = [0, 100, 200, 700, 1200, 2340];
const RANGE_VOCS = [0, 400, 1000];

function getLevalByValAndType(val, type) {
  let range = getRangeByType(type);
  return computeLevel(val, range, type);
}

/**
 * 通过污染物 类别返回区间
 * @param type
 * @returns {[number,number,number,number,number,number]}
 */
function getRangeByType(type) {
  if (type == "aqi") {
      return RANGE_AQI;
  } else if (type == "pm25") {
      return RANGE_PM25;
  } else if (type == "pm10") {
      return RANGE_PM10;
  } else if (type == "so2") {
      return RANGE_SO2;
  } else if (type == "co") {
      return RANGE_CO;
  } else if (type == "o3") {
      return RANGE_O3;
  } else if (type == "no2") {
      return RANGE_NO2;
  } else if (type == "vocs") {
      return RANGE_VOCS;
  } else {
      return RANGE_PM25;
  }
}

/**
 * 计算 浓度区间的值
 * @param value 浓度值
 * @param range 污染区间
 * @returns 返回 污染级别
 */
function computeLevel(value, range, type) {

  let beginIndex = 0;
  let beginValue = 0;
  let endValue = 0;

  let index = 0;
  // 是否找到区间,如果找不到,则会大于最大值或小于最小值
  let flag = false;
  for (let i = 0; i < range.length; i++) {
      if (i != range.length - 1 && value >= range[i] && value <= range[i + 1]) {
          flag = true;
          beginIndex = i;
          beginValue = range[i];
          endValue = range[i + 1];
          break;
      }
  }
  if (flag) { // 查找到区间，把浓度级别赋值给index
      index = beginIndex + 1; // 浓度级别 ，从1开始到 6.
  } else { // 未查找到区间，小于0或大于最大值
      if (value < range[0]) {
          index = -1; // 浓度值小于0
      } else if (value > range[range.length - 1]) {
          if (type == 'vocs') {
              index = 3; // vocs 的严重污染
          } else {
              index = 6; // >300 属于严重污染
          }

      }
  }
 

  return index;
}

export {
  getLevalByValAndType,
}