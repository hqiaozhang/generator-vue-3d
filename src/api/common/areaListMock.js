/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-02 11:08:42 
 * @Description: 地区列表数据
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-07 22:50:49
 */

export default {
  url: '/domain/getDomains',
  // enableMock: true,
  mock: {
    "erroCode" : 2000,
    "erroMsg" : "获取SysDomain成功",
    "result" : [ {
      "id" : "370800",
      "parentId" : "370000",
      "domainName" : "济宁市",
      "cityType" : "2"
    },{
      "id" : "110119",
      "parentId" : "110100",
      "domainName" : "延庆区",
      "cityType" : "3"
    },  {
      "id" : "510122",
      "parentId" : "510100",
      "domainName" : "双流区",
      "cityType" : "3"
    }, {
      "id" : "510100",
      "parentId" : "510000",
      "domainName" : "成都市",
      "cityType" : "2"
    }, {
      "id" : "110100",
      "parentId" : "110000",
      "domainName" : "北京市",
      "cityType" : "2"
    }, {
      "id" : "460100",
      "parentId" : "460000",
      "domainName" : "海口市",
      "cityType" : "2"
    }, {
      "id" : "510600",
      "parentId" : "510000",
      "domainName" : "德阳市",
      "cityType" : "2"
    }, {
      "id" : "510000",
      "parentId" : null,
      "domainName" : "四川省",
      "cityType" : "1"
    }, {
      "id" : "510129",
      "parentId" : "510100",
      "domainName" : "大邑县",
      "cityType" : "3"
    }, {
      "id" : "370811",
      "parentId" : "370800",
      "domainName" : "任城区",
      "cityType" : "3"
    }, {
      "id" : "610115",
      "parentId" : "610100",
      "domainName" : "临潼区",
      "cityType" : "3"
    } ]
  }
}
