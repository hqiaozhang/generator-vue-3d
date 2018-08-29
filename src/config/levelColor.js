/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-07 06:58:17 
 * @Description: 颜色配置项
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-06-08 10:41:14
 */
export const blueLevelColorArr = ["#77E750", '#FFDF02', "#F67825", "#F93148", "#E3008C", "#690000"]

export const blueLevelColor = (level) => {
  if (level == "1") {
      return "#9dfc7c";
  } else if (level == "2") {
      return "#fbfe29";
  } else if (level == "3") {
      return "#ff8f43";
  } else if (level == "4") {
      return "#fe5769";
  } else if (level == "5") {
      return "#a4036d";
  } else if (level == "6") {
      return "#7E0023";
  } else {
      return "#cecece";
  }
}

export const greenLevelColor = (level) => {
  if (level == "1") {
      return "#77E750";
  } else if (level == "2") {
      return "#FFDF02";
  } else if (level == "3") {
      return "#F67825";
  } else if (level == "4") {
      return "#F93148";
  } else if (level == "5") {
      return "#E3008C";
  } else if (level == "6") {
      return "#690000";
  } else {
      return "#cecece";
  }
}

export const blueLevelGradientColor = (level) => {
  var colrsArr = [
    { offset: 1, color: '#cecece' },
    { offset: 0, color: '#676767' }

  ];
  switch (level) {
    case 1:
      colrsArr = [
        { offset: 1, color: '#9dfc7c' },
        { offset: 0, color: '#73b96a' }

      ];
      break;
    case 2:
      colrsArr = [
        { offset: 1, color: '#fbfe29' },
        { offset: 0, color: '#b4bb30' }

      ];
      break;
    case 3:
      var colrsArr = [
        { offset: 1, color: '#ff8f43' },
        { offset: 0, color: '#b6465d' }

      ];
      break;
    case 4:
      colrsArr = [
        { offset: 1, color: '#fe5769' },
        { offset: 0, color: '#b6465d' }

      ];
      break;
    case 5:
      colrsArr = [
        { offset: 0, color: '#a4036d' },
        { offset: 1, color: '#780b60' },

      ];
      break;
    case 6:
      colrsArr = [
        { offset: 1, color: '#930012' },
        { offset: 0, color: '#6c0920' }

      ];
      break;
    default:
      colrsArr = [
        { offset: 1, color: '#cecece' },
        { offset: 0, color: '#676767' }

      ];
      break;
  }
  return colrsArr;
}