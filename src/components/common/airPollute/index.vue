/*
* @Author: zhanghongqiao
* @Date: 2018-06-11 13:16:46
* @Email: 991034150@qq.com
* @Description: 空气质量指数
* @Last Modified by: zhanghongqiao
* @Last Modified time: 2018-06-11 15:36:35
*/


<template>
  <div class="ui-landingpage-circle">
    <div data-items-count='32'
         v-for="(item, indexs) in types"
         :id="`p${indexs+1}_barPie`"
         :key="'count-'+indexs"
         :data-to-value="!dataSource ? 0 : dataSource[item]"
         :data-to-level="!dataSource ? 0 : dataSource[item+'Level']"
         class="barPie barPie--radio"
         :class="aqiFirst2.toLowerCase().indexOf(item) == -1 ?
      `barPie0${indexs+1}`: `barPie0${indexs+1} heavy`">

      <template v-if="aqiFirst2.toLowerCase().indexOf(item) == -1">
        <span class="barPie__value">0</span>
        <span class="barPie__name" v-html="formartName(item)"></span>
      </template>
      <template v-else>
        <span class="barPie__value">0</span>
        <div class="barPie__name">
          <span class="heavy-text">首污</span>
          <span class="relename" v-html="formartName(item)"></span>
        </div>
      </template>

      <div class="barPie__ring">
        <template v-for="(item, index) in numbers">
          <input :key="index+'input'" type="radio" :name="`barPieRadioGroup${indexs+1}`"
                 :id="filterCircleId(item, index, `p${indexs + 1}_barPieItem`)"
                 :value="filterCircleValue(index)" hidden="hidden"/>
          <label :key="index+'lable'" :class="filterCircleClass(item, index, `p${indexs + 1}_barPieClass`)"></label>
        </template>
      </div>
    </div>
  </div>
</template>


<script>
  import './index.scss'
  import $ from 'jquery'
  import './stopExecutionOnTimeout.js'
  import { Doin } from './do-in'

  export default {
    data() {
      return {
        aqiFirst2: "",
        types: ["aqi", "pm25", "pm10", "co", "so2", "no2", "o3"],
        numbers: [], // 设置的圆环的个数
        circleValue: [0, 0, 0, 0, 0, 0, 0]
      };
    },
    props: {
      dataSource: Object
    },
    mounted() {
      this.initAirQuality()
    },
    methods: {
      /*
       * 初始化
       */
      initAirQuality() {
        if(_.isEmpty(this.dataSource)) {
          this.aqiFirst2 = ''
        }else {
          this.aqiFirst2 = this.dataSource.aqiFirst2;
        }
        for (let i = 32; i > 0; i--) {
          this.numbers.push(i);
        }
        this.types.map((d, i) => {
          this.initCircleProgress(`barPie0${i + 1}`);
        })
      },
      initCircleProgress: function (cls) {
        //重置圆环颜色
        $('input[id*="_barPieItem"]').removeAttr("class");
        (function (ELEMENT) {
          ELEMENT.matches =
            ELEMENT.matches ||
            ELEMENT.mozMatchesSelector ||
            ELEMENT.msMatchesSelector ||
            ELEMENT.oMatchesSelector ||
            ELEMENT.webkitMatchesSelector;
          ELEMENT.closest =
            ELEMENT.closest ||
            function closest(selector) {
              let element = this;
              while (element) {
                if (window.CP.shouldStopExecution(1)) {
                  break;
                }
                if (element.matches(selector)) break;
                element = element.parentElement;
              }
              window.CP.exitedLoop(1);
              return element;
            };
        })(Element.prototype);

        let barPie = {
          onChnage: function (e) {
            if (e.target.name.indexOf('barPieRadioGroup') == -1) {
              return;
            }
            let scopeElm = e.target.closest('.' + cls);

            barPie.update(scopeElm, +e.target.value);
            if (!scopeElm.active)
              scopeElm
                .querySelector('.barPie__ring')
                .lastElementChild.addEventListener('click', barPie.clickToNull);
            scopeElm.active = 1;
          },
          clickToNull: function () {
            let that = this;
            if (this.previousElementSibling.checked)
              setTimeout(function () {
                that.previousElementSibling.checked = false;
                that
                  .closest('.' + cls)
                  .querySelector('.barPie__value').innerHTML =
                  '0';
              }, 0);
          },
          update: function (scopeElm, value, speed, extraStep) {
            if (!scopeElm) return;
            let valueElm = scopeElm.querySelector('.barPie__value')
            let inital = +valueElm.innerHTML
            let delta = value - inital
            let doin

            function step(t, elapsed) {
              t = 1 - Math.exp(-t * 7);
              let value = delta * t + inital,
                remainder = value % 1;
              if (t > 0.99 && (remainder > 0.9 || remainder < 0.01)) {
                value = Math.round(value);
                doin.step = function () {
                };
              } else value = value.toFixed(remainder ? 1 : 0);
              valueElm.innerHTML = value;
              if (extraStep) extraStep(t);
            }

            if (!valueElm.doin) {
              doin = new Doin(step, speed || 0.33);
              valueElm.doin = doin;
            } else doin = valueElm.doin;
            doin.step = step;
            doin.run();
            doin.done = function () {
              scopeElm.querySelector('.barPie__value').innerHTML = value;
            };
          }
        };
        document.addEventListener('change', barPie.onChnage);
        let barPies = document.querySelectorAll('.' + cls);
        setTimeout(lazyCount, 1500);
        function lazyCount() {
          let currentBarPie
          let itemsCount
          let pollutionInfo = {}
          let valueElement

          function step(t) {

            itemsCount = itemsCount > 31 ? 31 : itemsCount;
            //CO SO2 按不同等级改变圆环颜色 1级50%，逐级加10%
            let itemIdx = Math.round(
              itemsCount * ((50 + (pollutionInfo.level - 1) * 10) / 100) * t
            );
            //No2 1级占40%
            if (currentBarPie.id == 'p6_barPie' && pollutionInfo.level == 1) {
              itemIdx = Math.round(itemsCount * (40 / 100) * t);
            }
            //AQI和PM2.5计算方式
            if (
              currentBarPie.id == 'p1_barPie' ||
              currentBarPie.id == 'p2_barPie'
            ) {
              itemIdx = Math.round(
                itemsCount * (pollutionInfo.toValue / 500) * t
              );
            }
            //PM10计算方式
            if (currentBarPie.id == 'p3_barPie') {
              itemIdx = Math.round(
                itemsCount * (pollutionInfo.toValue / 600) * t
              );
            }
            //O3计算方式
            if (currentBarPie.id == 'p7_barPie') {
              itemIdx = Math.round(
                itemsCount * (pollutionInfo.toValue / 1000) * t
              );
            }
            itemIdx = itemIdx > 31 ? 31 : itemIdx;
            let currObj = document.getElementById(currentBarPie.id + 'Item' + itemIdx)
            currObj.className = pollutionInfo.className; //不同的级别给不同的class 值
          }

          for (let i = 0; i < barPies.length; i++) {
            if (window.CP.shouldStopExecution(2)) {
              break;
            }
            currentBarPie = barPies[i];
            pollutionInfo.toValue = currentBarPie.dataset.toValue;
            pollutionInfo.level = currentBarPie.dataset.toLevel;
            pollutionInfo.className = 'level0' + currentBarPie.dataset.toLevel;
            valueElement = currentBarPie.querySelector('.barPie__value');
            if (pollutionInfo.toValue) {
              itemsCount = currentBarPie.dataset.itemsCount;
              barPie.update(currentBarPie, pollutionInfo.toValue, 1.5, step);
            }
          }
          window.CP.exitedLoop(2);
        }
      },
      filterCircleValue: function (index) {
        return 100 - 100 / 32 * index;
      },
      filterCircleId: function (value, index, str) {
        return str + (value - 1);
      },
      filterCircleClass: function (value, index, str) {
        return 'barPie__ring__item ' + str + (value - 1);
      },
      /**
       * 格式化污染物名称
       * @param name 污染物名
       * @returns {string} 污染物名
       */
      formartName(name) {
        switch (name) {
          case 'pm25':
            return 'PM<sub>25</sub>';
          case 'pm10':
            return 'PM<sub>10</sub>';
          case 'so2':
            return 'SO<sub>2</sub>';
          case 'no2':
            return 'NO<sub>2</sub>';
          case 'o3':
            return 'O<sub>3</sub>';
          default:
            return name.toUpperCase();
        }
      },
    },

    watch: {
      'dataSource': 'initAirQuality'
    }
  }
</script>
