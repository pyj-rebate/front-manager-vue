<template>
  <a-card :bordered="false">
    <a-form :form="form">
      <a-row :gutter="16" align="middle" style="max-width: 1000px;text-align: center;margin: 0 auto;">
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
              <a style="margin-left: 8px">从原始表选择</a>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <s-table
            ref="financeTable"
            size="default"
            :rowKey="(recordActive) => recordActive.id"
            :columns="columns"
            :data="loadData"
            showPagination="true"
            :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          >
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
            :rowKey="(recordActive) => recordActive.id"
            :columns="columnsSales"
            :data="loadData"
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
            :rowKey="(recordActive) => recordActive.id"
            :columns="columnsSales"
            :data="loadData"
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
  </a-card>
</template>

<script>
import { exportExcel, template, importExcel } from '@/api/rebate/rebate'
import { STable } from '@/components'
export default {
  name: 'Rebate',
  components: { STable },
  data () {
    return {
      form: this.$form.createForm(this),
      /* 导入加载状态 */
      financeLoading: false,
      saleLoading: false,
      // 单个记录行
      recordActive: {},
      // 选中
      selectedRowKeys: [],
      selectedRows: [],
      selectedRowKeysSales: [],
      selectedRowsSales: [],
      loadData: parameter => {
        const initData = []
        return new Promise(function (resolve) {
          resolve(initData)
        })
      },
      // 列表表头
      columns: [{
        title: '付款人',
        dataIndex: 'payer',
        key: 'payer'
      }, {
        title: '付款账号',
        dataIndex: 'paymentAccount',
        key: 'paymentAccount'
      }, {
        title: '往来单位名称',
        dataIndex: 'name',
        key: 'name'
      }
      ],
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
  methods: {
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
    /**
     * 导入财务表
     */
    handleFinanceImport (data) {
      this.financeLoading = true
      importExcel(data.file).then(res => {
        if (res.code === 10000) {
          this.$message.info(this.createMsg(res.result))
        }
      }).finally(() => {
        this.financeLoading = false
        this.refresh()
      })
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
