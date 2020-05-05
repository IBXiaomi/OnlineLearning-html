import http from './../../../base/api/public'
import querystring from 'querystring'

let sysConfig = require('@/../config/sysConfig');
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page, size, params) => {
  // 拼装参数
  let query = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + "?" + query);

};
//修改页面
export const update = (id, params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + id, params);
};

//删除页面
export const del = (id) => {
  return http.requestQuickGet(apiUrl + '/cms/page/del/' + id);
};
//根据id查询页面信息
export const page_get = (id) => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id);
};

// 查询所有的站点信息
export const site_list = () => {
  return http.requestQuickGet(apiUrl + '/cms/page/site/getAllSite');
};

//新增页面
export const page_add = (params) => {
  return http.requestPost(apiUrl + '/cms/page/add', params);
};

//查询所有的模板信息
export const template_list = () => {
  return http.requestQuickGet(apiUrl + '/cms/page/template/getAllTemplate');
};

//模板查询
export const page_template_list = (page, size, params) => {
  // 拼装参数
  let query = querystring.stringify(params);
  //请求服务端的页面查询接口
  return http.requestQuickGet(apiUrl + '/cms/page/template/list/' + page + '/' + size + "?" + query);

};

