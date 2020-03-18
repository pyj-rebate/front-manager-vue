import path from '@/api/index'
import {
  axios, axiosFile
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.rebate + '/finance',
    method: 'POST',
    data: data,
    params: parsePageParams(data)
  })
}
export function list () {
  return axios({
    url: path.rebate + '/finance/list',
    data: {},
    method: 'POST'
  })
}
// 保存
export function save (data) {
  return axios({
    url: path.rebate + '/finance/add',
    method: 'PUT',
    data: data
  })
}

// 修改
export function update (data) {
  return axios({
    url: path.rebate + '/finance/update',
    method: 'PUT',
    data: data
  })
}

// 删除
export function del (data) {
  return axios({
    url: path.rebate + '/finance',
    method: 'DELETE',
    data: data
  })
}

// 获取详情
export function get (params) {
  return axios({
    url: path.rebate + '/finance/id/' + params.id,
    method: 'GET'
  })
}
// 根据字段名获取下拉框
export function getDictByType (filedName) {
  return axios({
    url: path.rebate + '/finance/getByType',
    method: 'POST',
    params: { 'filedName': filedName }
  })
}
export function checkCode (params) {
  return axios({
    url: path.rebate + '/finance/checkCode',
    method: 'GET',
    // 设置后，业务错误时不会调用弹出全局错误信息
    headers: { 'check': true },
    // id=params.id&code=params.code
    params: params
  })
}

/**
 * 导出
 * @param data
 * @returns {AxiosPromise}
 */
export function exportExcel (data) {
  return axiosFile({
    url: path.rebate + '/finance/exportFinance',
    method: 'POST',
    data: data
  })
}
