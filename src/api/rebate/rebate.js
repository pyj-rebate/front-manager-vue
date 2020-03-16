import path from '@/api/index'
import { axios, axiosFile } from '@/utils/request'

// 导出错误销售表信息
export function exportExcel (data) {
  return axiosFile({
    url: path.rebate + '/sale/exportError',
    method: 'POST',
    data: data
  })
}
// 导入销售
export function importSalesExcel (file) {
  const data = new FormData()
  data.append('file', file)
  return axios({
    url: path.rebate + '/sale/importSales',
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
