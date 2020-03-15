<template>
  <a-card :bordered="false">
    <a-form :form="form">
      <a-row :gutter="16" align="middle" style="min-width: 1366px;text-align: center;margin: 0 auto;">
        <a-col :span="24"><h1>销售财务核对</h1></a-col>
        <a-divider dashed />
        <a-col :span="24">
          <a-form-item
            label="财务表"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 8 }">
            <a-upload
              name="finance"
              style="float: left;margin-left: 16px;"
              :showUploadList="false"
              :customRequest="handleFinanceImport"
            >
              <a-button :icon="financeLoading ? 'loading' : 'upload'" >导入财务表</a-button>
            </a-upload>
            <a style="margin-left: 16px;float:left;" @click="showList">从原始表选择</a>
            <a style="margin-left: 16px;float:left;color: red;" @click="clearFinanceAll">清空选择</a>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <s-table
            ref="financeTable"
            size="default"
            :rowKey="(recordActive) => recordActive.code"
            :columns="columns"
            :data="loadCheckedFinancesData"
            showPagination="true"
          >
            <span slot="action" slot-scope="text, record">
              <template>
                <a-popconfirm title="您确认删除吗?" @confirm="handleDelete(record.code)" okText="确认" cancelText="取消">
                  <a href="javascript:void(0)">删除</a>
                </a-popconfirm>
              </template>
            </span>
          </s-table>
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <a-form-item
            label="销售表"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 8 }">
            <a-upload
              name="sale"
              style="float: left;margin-left: 16px;"
              :showUploadList="false"
              :customRequest="handleSaleImport"
            >
              <a-button :icon="saleLoading ? 'loading' : 'upload'" >导入销售表</a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <s-table
            ref="saleTable"
            size="default"
            :rowKey="(recordActive) => recordActive.code"
            :columns="columnsSales"
            :data="loadSalesData"
            showPagination="false"
            :rowSelection="{ selectedRowKeys: selectedRowKeysSales, onChange: onSelectChangeSales }"
          >
          </s-table>
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <a-form-item
            label="匹配项"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 8 }">
            <a-checkbox-group
              :options="[{ label: '付款人', value: 1 },{ label: '付款账号', value: 2 },{ label: '往来单位名称', value: 3 }]"
              v-decorator="['checkOpt',{initialValue: [1]}]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" >
          <a-form-item
            label=""
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }">
            <a-button type="primary">开始核对</a-button>
            <a-button style="margin-left: 16px;" @click="reset">重置</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="24"><h3 style="text-align: left;color: red;">错误结果</h3></a-col>
        <a-divider dashed style="border-color: red;"/>
        <a-col :span="24">
          <s-table
            ref="errorTable"
            size="default"
            :rowKey="(recordActive) => recordActive.code"
            :columns="columnsSales"
            :data="loadErrorSalesData"
            showPagination="false"
          >
          </s-table>
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <a-form-item
            label=""
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }">
            <a-button type="danger" icon="download" @click="handleErrorExport()">导出错误</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <finance-list
      :add-finance-list="addFinanceList"
      ref="financeList"/>
  </a-card>
</template>

<script>
import { importFinancesExcel, exportExcel } from '@/api/rebate/rebate'
import { STable } from '@/components'
import FinanceList from '../finance/FinanceList'

/**
 * 财务显示列
 */
const columFinances = [
  {
    title: '往来单位编码',
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: '往来单位名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '客户',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '分管人',
    dataIndex: 'leader',
    key: 'leader'
  },
  {
    title: '个体工商户',
    dataIndex: 'companyType',
    key: 'companyType',
    scopedSlots: { customRender: 'companyType' }
  },
  {
    title: '营业执照号码',
    dataIndex: 'businessLicenseNumber',
    key: 'businessLicenseNumber'
  },
  {
    title: '法定代表人或经营者',
    dataIndex: 'legalRepresentative',
    key: 'legalRepresentative'
  },
  {
    title: '许可证号码',
    dataIndex: 'licenseNo',
    key: 'licenseNo'
  },
  {
    title: '到期日',
    dataIndex: 'endTime',
    key: 'endTime'
  },
  {
    title: '经营范围是否有',
    dataIndex: 'businessScopeFlag',
    key: 'businessScopeFlag'
  },
  {
    title: '付款人',
    dataIndex: 'payer',
    key: 'payer'
  },
  {
    title: '委托关系',
    dataIndex: 'clientage',
    key: 'clientage',
    scopedSlots: { customRender: 'clientage' }
  },
  {
    title: '委托期限结束',
    dataIndex: 'proxyEnd',
    key: 'proxyEnd'
  },
  {
    title: '委托期限开始',
    dataIndex: 'proxyStart',
    key: 'proxyStart'
  },
  {
    title: '付款账号',
    dataIndex: 'paymentAccount',
    key: 'paymentAccount'
  },
  {
    title: '身份证信息',
    dataIndex: 'idCard',
    key: 'idCard'
  },
  {
    title: '身份证期限',
    dataIndex: 'idCardLimit',
    key: 'idCardLimit'
  },
  {
    title: '是否确认',
    dataIndex: 'confirmFlag',
    key: 'confirmFlag'
  },
  {
    title: '是否开票',
    dataIndex: 'invoiceFlag',
    key: 'invoiceFlag',
    scopedSlots: { customRender: 'invoiceFlag' }
  },
  {
    title: '专票普票电票',
    dataIndex: 'ticketType',
    key: 'ticketType',
    scopedSlots: { customRender: 'ticketType' }
  },
  {
    title: '开户行',
    dataIndex: 'openingBank',
    key: 'openingBank'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '320px',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'Rebate',
  components: { STable, FinanceList },
  data () {
    return {
      form: this.$form.createForm(this),
      /* 导入加载状态 */
      financeLoading: false,
      saleLoading: false,
      // 单个记录行
      recordActive: {},
      checkedFinances: [],
      salesData: [],
      errorSalesData: [],
      // 选中
      selectedRowKeys: [],
      selectedRows: [],
      selectedRowKeysSales: [],
      selectedRowsSales: [],
      loadCheckedFinancesData: parameter => {
        const initData = this.checkedFinances
        return new Promise(function (resolve) {
          resolve(initData)
        })
      },
      loadSalesData: parameter => {
        const initData = this.salesData
        return new Promise(function (resolve) {
          resolve(initData)
        })
      },
      loadErrorSalesData: parameter => {
        const initData = this.errorSalesData
        return new Promise(function (resolve) {
          resolve(initData)
        })
      },
      // 列表表头
      columns: columFinances,
      // 列表表头
      columnsSales: [{
        title: '返利收款人',
        dataIndex: 'rebatePayee',
        key: 'rebatePayee'
      }, {
        title: '账户信息',
        dataIndex: 'accountInfo',
        key: 'accountInfo'
      }, {
        title: '开户行',
        dataIndex: 'openingBank',
        key: 'openingBank'
      }, {
        title: '营业执照名称',
        dataIndex: 'businessLicenseName',
        key: 'businessLicenseName'
      }
      ]
    }
  },
  watch: {
  },
  methods: {
    addFinanceList (array) {
      /*      const _checkedFinances = this.checkedFinances
      array.filter(a => {
        return !this.hasExist(this.checkedFinances, a)
      }).forEach(item => {
        _checkedFinances.push(item)
      }) */
      this.checkedFinances = array
      this.refreshFinance()
    },
    hasExist (checkedFinances, a) {
      if (checkedFinances && checkedFinances.length > 0) {
        const index = checkedFinances.findIndex(item => item.code === a.code)
        return index > -1
      }
      return false
    },
    clearFinanceAll () {
      this.checkedFinances = []
      this.refreshFinance()
    },
    showList () {
      this.$refs.financeList.show(this.checkedFinances)
    },
    // 删除记录
    handleDelete (code) {
      const index = this.checkedFinances.findIndex(item => item.code === code)
      if (index > -1) {
        this.checkedFinances.splice(index, 1)
        this.refreshFinance()
      }
    },
    /**
     * 重置
     */
    reset () {

    },
    /**
     * 财务选中
     */
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    /**
     * 销售选中
     */
    onSelectChangeSales (selectedRowKeys, selectedRows) {
      this.selectedRowKeysSales = selectedRowKeys
      this.selectedRowsSales = selectedRows
    },
    /**
     * 导入销售表
     */
    handleSaleImport (data) {
    },
    /* 创建多行vnode */
    createMsg (messages) {
      const msgNodes = messages.split('<br/>').map(msg => {
        return this.$createElement('p', msg)
      })
      const multiMsg = this.$createElement('p', { style: { textAlign: 'left' } }, msgNodes)
      return multiMsg
    },
    /**
     * 导入财务表
     */
    handleFinanceImport (data) {
      this.financeLoading = true
      importFinancesExcel(data.file).then(res => {
        if (res.code === 10000) {
          this.$message.info(this.createMsg(res.msg))
          this.checkedFinances = res.result
          this.refreshFinance()
        }
      }).finally(() => {
        this.financeLoading = false
      })
    },
    refreshFinance () {
      this.$refs.financeTable.refresh()
    },
    refreshSales () {
      this.$refs.saleTable.refresh()
    },
    refreshErrorSales () {
      this.$refs.errorTable.refresh()
    },
    /**
     * 导出
     */
    handleExport () {
      exportExcel(this.queryParam).then(res => {
        if (res.code === 10000) {
          this.$message.info(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
