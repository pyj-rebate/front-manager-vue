<template>
  <a-card :bordered="false">
    <a-form :form="form">
      <a-row :gutter="16" align="middle" style="min-width: 1366px;text-align: center;margin: 0 auto;">
        <a-col :span="24"><h1>销售财务核对</h1></a-col>
        <a-divider dashed />
        <!--<a-col :span="24">
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
            <a style="margin-left: 16px;float:left;" @click="showList">查看财务表</a>
&lt;!&ndash;            <a style="margin-left: 16px;float:left;color: red;" @click="clearFinanceAll">清空选择</a>&ndash;&gt;
          </a-form-item>
        </a-col>-->
        <!--<a-col :span="24">
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
        </a-col>-->
        <a-col :span="24">
          <finance-list
            :add-finance-list="addFinanceList"
            :import-finances-excel="importFinancesExcel"
            :create-msg="createMsg"
            ref="financeList"/>
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
            <span slot="sequence" slot-scope="text, record, index">
              {{ index+1 }}
            </span>
          </s-table>
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <a-form-item
            label="匹配项"
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 16 }">
            <a-checkbox-group
              style="float: left; margin-left: 16px;line-height: 40px;"
              :options="optSales"
              v-decorator="['checkOpt',{initialValue: ['businessLicenseName']}]"/>
          </a-form-item>
        </a-col>
        <a-col :span="24" >
          <a-form-item
            label=""
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }">
            <a-button type="primary" :disabled="selectedRowKeysSales.length===0" @click="startCheck">开始核对</a-button>
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
            :columns="columnsErrorSales"
            :data="loadErrorSalesData"
            showPagination="false"
          >
            <span slot="sequence" slot-scope="text, record, index">
              {{ index+1 }}
            </span>
            <span slot="businessLicenseName" slot-scope="text, record, index">
              <div :class="{errorFlag: record.businessLicenseNameFlag === '0'}">{{ text }}</div>
            </span>
            <span slot="rebatePayee" slot-scope="text, record, index">
              <div :class="{errorFlag: record.rebatePayeeFlag === '0'}">{{ text }}</div>
            </span>
            <span slot="accountInfo" slot-scope="text, record, index">
              <div :class="{errorFlag: record.accountInfoFlag === '0'}">{{ text }}</div>
            </span>
            <span slot="ticketType" slot-scope="text, record, index">
              <div :class="{errorFlag: record.ticketTypeFlag === '0'}">{{ text }}</div>
            </span>
            <span slot="companyType" slot-scope="text, record, index">
              <div :class="{errorFlag: record.companyTypeFlag === '0'}">{{ text }}</div>
            </span>
            <span slot="invoiceFlag" slot-scope="text, record, index">
              <div :class="{errorFlag: record.invoiceFlagFlag === '0'}">{{ text }}</div>
            </span>
          </s-table>
        </a-col>
        <a-col :span="24" style="margin-top: 16px">
          <a-form-item
            label=""
            :labelCol="{ span: 4 }"
            :wrapperCol="{ span: 20 }">
            <a-button type="danger" icon="download" :disabled="errorSalesData.length===0" @click="handleErrorExport()">导出错误</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

  </a-card>
</template>

<script>
import { importFinancesExcel, importSalesExcel, exportExcel } from '@/api/rebate/rebate'
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
const opts = [{
  title: '营业执照名称',
  dataIndex: 'businessLicenseName',
  key: 'businessLicenseName'
}, {
  title: '返利收款人',
  dataIndex: 'rebatePayee',
  key: 'rebatePayee'
}, {
  title: '账户信息',
  dataIndex: 'accountInfo',
  key: 'accountInfo'
}, {
  title: '票据类型',
  dataIndex: 'ticketType',
  key: 'ticketType'
}, {
  title: '经营者或第三方或本单位',
  dataIndex: 'companyType',
  key: 'companyType'
}, {
  title: '是否开票',
  dataIndex: 'invoiceFlag',
  key: 'invoiceFlag'
}]
export default {
  name: 'Rebate',
  components: { STable, FinanceList },
  data () {
    return {
      importFinancesExcel: importFinancesExcel,
      form: this.$form.createForm(this),

      /* 导入销售表加载 */
      saleLoading: false,
      // 单个记录行
      recordActive: {},
      /* 选择的财务记录 */
      checkedFinances: [],
      /* 有效的销售记录 */
      salesData: [],
      /* 错误的销售记录 */
      errorSalesData: [],
      // 选中
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
      // 财务列表表头
      columns: columFinances,
      // 销售列表表头
      columnsSales: [{
        title: '序列',
        dataIndex: 'sequence',
        key: 'sequence',
        scopedSlots: { customRender: 'sequence' }
      }, ...opts],
      columnsErrorSales: [{
        title: '序列',
        dataIndex: 'sequence',
        key: 'sequence',
        scopedSlots: { customRender: 'sequence' }
      }, {
        title: '营业执照名称',
        dataIndex: 'businessLicenseName',
        key: 'businessLicenseName',
        scopedSlots: { customRender: 'businessLicenseName' }
      }, {
        title: '返利收款人',
        dataIndex: 'rebatePayee',
        key: 'rebatePayee',
        scopedSlots: { customRender: 'rebatePayee' }
      }, {
        title: '账户信息',
        dataIndex: 'accountInfo',
        key: 'accountInfo',
        scopedSlots: { customRender: 'accountInfo' }
      }, {
        title: '票据类型',
        dataIndex: 'ticketType',
        key: 'ticketType',
        scopedSlots: { customRender: 'ticketType' }
      }, {
        title: '经营者或第三方或本单位',
        dataIndex: 'companyType',
        key: 'companyType',
        scopedSlots: { customRender: 'companyType' }
      }, {
        title: '是否开票',
        dataIndex: 'invoiceFlag',
        key: 'invoiceFlag',
        scopedSlots: { customRender: 'invoiceFlag' }
      }]
    }
  },
  computed: {
    /**
     * 匹配项
     */
    optSales () {
      return opts.map(item => {
        return { label: item.title, value: item.key, disabled: item.key === 'businessLicenseName' }
      })
    }
  },
  watch: {
  },
  methods: {
    /**
     * 导出错误
     */
    handleErrorExport () {
      exportExcel(this.errorSalesData).then(res => {
        if (res.code === 10000) {
          this.$message.info(res.msg)
        }
      })
    },
    /**
     * 重置
     */
    reset () {
      this.form.resetFields()
      this.recordActive = {}
      this.salesData = []
      this.errorSalesData = []
      this.selectedRowKeysSales = []
      this.selectedRowsSales = []
      this.refreshSales()
      this.refreshErrorSales()
    },
    /**
     * 开始核对，返回错误数据
     */
    startCheck () {
      this.selectedRowsSales.forEach(sale => {
        sale.businessLicenseNameFlag = '1'
        sale.rebatePayeeFlag = '1'
        sale.accountInfoFlag = '1'
        sale.ticketTypeFlag = '1'
        sale.companyTypeFlag = '1'
        sale.invoiceFlagFlag = '1'
      })
      const _selectedRowsSales = this.selectedRowsSales
      const _checkedFinances = this.checkedFinances
      _selectedRowsSales.forEach(sale => {
        const finance = _checkedFinances.find(i => sale.businessLicenseName === i.name)
        this.checkOpts(sale, finance)
      })
      this.errorSalesData = _selectedRowsSales
      this.refreshErrorSales()
    },
    /**
     *
     */
    checkOpts (sale, finance) {
      const _checkOpt = this.form.getFieldValue('checkOpt')
      if (!finance) {
        sale.businessLicenseNameFlag = '0'
      }
      if (_checkOpt.findIndex(i => i === 'rebatePayee') > -1) {
        if (!finance || sale.rebatePayee !== finance.payer) {
          sale.rebatePayeeFlag = '0'
        }
      }
      if (_checkOpt.findIndex(i => i === 'accountInfo') > -1) {
        if (!finance || sale.accountInfo !== finance.paymentAccount) {
          sale.accountInfoFlag = '0'
        }
      }
      if (_checkOpt.findIndex(i => i === 'ticketType') > -1) {
        if (!finance || sale.ticketType !== finance.ticketType) {
          sale.ticketTypeFlag = '0'
        }
      }
      if (_checkOpt.findIndex(i => i === 'companyType') > -1) {
        if (!finance || sale.companyType !== finance.clientage) {
          sale.companyTypeFlag = '0'
        }
      }
      if (_checkOpt.findIndex(i => i === 'invoiceFlag') > -1) {
        if (!finance || sale.invoiceFlag !== finance.invoiceFlag) {
          sale.invoiceFlagFlag = '0'
        }
      }
    },
    /**
     * 其他页面回写到当前页面财务记录
     * @param array
     */
    addFinanceList (array) {
      /*      const _checkedFinances = this.checkedFinances
      array.filter(a => {
        return !this.hasExist(this.checkedFinances, a)
      }).forEach(item => {
        _checkedFinances.push(item)
      }) */
      this.checkedFinances = array
      // this.refreshFinance()
    },
    /**
     * 是否存在财务记录
     */
    hasExist (checkedFinances, a) {
      if (checkedFinances && checkedFinances.length > 0) {
        const index = checkedFinances.findIndex(item => item.code === a.code)
        return index > -1
      }
      return false
    },
    /**
     * 清空选择
     */
    clearFinanceAll () {
      this.checkedFinances = []
      this.refreshFinance()
    },
    /**
     * 原始表管理页面显示
     */
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
      this.saleLoading = true
      importSalesExcel(data.file).then(res => {
        if (res.code === 10000) {
          this.$message.info(this.createMsg(res.msg))
          this.salesData = res.result
          this.refreshSales()
        }
      }).finally(() => {
        this.saleLoading = false
      })
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
     * 刷新财务表
     */
    refreshFinance () {
      this.$refs.financeTable.refresh()
    },
    /**
     * 刷新销售表
     */
    refreshSales () {
      this.$refs.saleTable.refresh()
    },
    /**
     * 刷新错误记录
     */
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
  /deep/ .errorFlag{
    color: red;
  }
</style>
