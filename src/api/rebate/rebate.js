import path from '@/api/index'
import { axios, axiosFile } from '@/utils/request'
import parsePageParams from '@/utils/page'

// 导出excel
export function exportExcel (data) {
  return axiosFile({
    url: path.rebate + '/sale/export',
    method: 'POST',
    data: data
  })
}
// 模板下载
export function template () {
  return axiosFile({
    url: path.rebate + '/sale/template',
    method: 'POST'
  })
}
// 导入excel
export function importExcel (file) {
  const data = new FormData()
  data.append('file', file)
  return axios({
    url: path.rebate + '/sale/import',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 1800000,
    data: data
  })
}

// 导入excel
export function importFinancesExcel (file) {
  const data = new FormData()
  data.append('file', file)
  return axios({
    url: path.rebate + '/finance/importFinances',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 1800000,
    data: data
  })
}
