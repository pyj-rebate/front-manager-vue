<template>
  <a-card :bordered="false">
    <div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="往来单位编码">
                <a-input v-model="queryParam.code" placeholder="请输入往来单位编码"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="往来单位名称">
                <a-input v-model="queryParam.name" placeholder="请输入往来单位名称"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="分管人">
                <a-input v-model="queryParam.leader" placeholder="请输入分管人"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="个体工商户">
                <a-select :options="companyType" v-model="queryParam.companyType" placeholder="全部"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="到期日">
                <a-range-picker v-model="queryParam.endtimeCondition"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="付款人">
                <a-input v-model="queryParam.payer" placeholder="请输入付款人"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="委托关系">
                <a-select :options="clientage" v-model="queryParam.clientage" placeholder="全部"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="委托期限开始">
                <a-range-picker v-model="queryParam.proxyStartCondition"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item
                label="委托期限结束">
                <a-range-picker v-model="queryParam.proxyEndCondition"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="付款账号">
                <a-input v-model="queryParam.paymentAccount" placeholder="请输入付款账号"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="是否开票">
                <a-select :options="invoiceFlag" v-model="queryParam.invoiceFlag" placeholder="全部"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <a-form-item label="专票普票电票">
                <a-select :options="ticketType" v-model="queryParam.ticketType" placeholder="全部"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="12" :xs="24">
              <span
                class="table-page-search-submitButtons">
                <a-button type="primary" @click="$refs.financeTable.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="restQuery()">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd()">新建</a-button>

      </div>
    </div>
    <s-table
      ref="financeTable"
      size="default"
      :rowKey="(recordActive) => recordActive.id"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <span slot="companyType" slot-scope="text">
        {{ getCompanyTypeName(text) }}
      </span>
      <span slot="clientage" slot-scope="text">
        {{ getClientageName(text) }}
      </span>
      <span slot="invoiceFlag" slot-scope="text">
        {{ getInvoiceFlagName(text) }}
      </span>
      <span slot="ticketType" slot-scope="text">
        {{ getTicketTypeName(text) }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical"/>
          <a @click="handleUpdate(record)">修改</a>
          <a-divider type="vertical"/>
          <a-popconfirm title="您确认删除吗?" @confirm="handleDelete([record])" okText="确认" cancelText="取消">
            <a href="javascript:void(0)">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
    <detail
      ref="financeDetail"
      :format-date="formatDate"
      :get-company-type-name="getCompanyTypeName"
      :get-clientage-name="getClientageName"
      :get-invoice-flag-name="getInvoiceFlagName"
      :get-ticket-type-name="getTicketTypeName"
      :record="recordActive"/>
    <add
      ref="financeAdd"
      :companyType="selectCompanyType"
      :clientage="selectClientage"
      :invoiceFlag="selectInvoiceFlag"
      :ticketType="selectTicketType"
      :format-date="formatDate"
      :record="recordActive"
      :save="save"
      :refresh="refresh"
    />
    <edit
      ref="financeEdit"
      :companyType="selectCompanyType"
      :clientage="selectClientage"
      :invoiceFlag="selectInvoiceFlag"
      :ticketType="selectTicketType"
      :format-date="formatDate"
      :get-moment="getMoment"
      :record="recordActive"
      :update="update"
      :refresh="refresh"
    />
  </a-card>
</template>

<script>

import { formatDate, getMoment } from '@/utils/common'
import { del, get, queryList, save, update, getDictByType } from '@/api/finance'
import { STable } from '@/components'
import Detail from './components/Detail'
import Add from './components/Add'
import Edit from './components/Edit'

export default {
  name: 'FinanceList',
  components: {
    STable,
    Detail,
    Add,
    Edit
  },
  data () {
    return {
      // 选中
      selectedRowKeys: [],
      selectedRows: [],
      // 保存方法
      save: save,
      // 修改方法
      update: update,
      // 查询参数
      queryParam: {},
      // 列表表头
      columns: [
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
          dataIndex: 'endtime',
          key: 'endtime'
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
          title: '委托期限开始',
          dataIndex: 'proxyStart',
          key: 'proxyStart'
        },
        {
          title: '委托期限结束',
          dataIndex: 'proxyEnd',
          key: 'proxyEnd'
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
          title: '身份证期限结束',
          dataIndex: 'idCardEnd',
          key: 'idCardEnd'
        },
        {
          title: '身份证期限开始',
          dataIndex: 'idCardStart',
          key: 'idCardStart'
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
      ],
      // 日期工具类
      formatDate: formatDate,
      getMoment: getMoment,
      // 列表加载数据方法
      loadData: parameter => {
        if (this.queryParam.endtimeCondition) {
          this.queryParam.endtimeSearch = []
          this.queryParam.endtimeSearch[0] = formatDate(this.queryParam.endtimeCondition[0], 'YYYY-MM-DD')
          this.queryParam.endtimeSearch[1] = formatDate(this.queryParam.endtimeCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.proxyEndCondition) {
          this.queryParam.proxyEndSearch = []
          this.queryParam.proxyEndSearch[0] = formatDate(this.queryParam.proxyEndCondition[0], 'YYYY-MM-DD')
          this.queryParam.proxyEndSearch[1] = formatDate(this.queryParam.proxyEndCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.proxyStartCondition) {
          this.queryParam.proxyStartSearch = []
          this.queryParam.proxyStartSearch[0] = formatDate(this.queryParam.proxyStartCondition[0], 'YYYY-MM-DD')
          this.queryParam.proxyStartSearch[1] = formatDate(this.queryParam.proxyStartCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.idCardEndCondition) {
          this.queryParam.idCardEndSearch = []
          this.queryParam.idCardEndSearch[0] = formatDate(this.queryParam.idCardEndCondition[0], 'YYYY-MM-DD')
          this.queryParam.idCardEndSearch[1] = formatDate(this.queryParam.idCardEndCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.idCardStartCondition) {
          this.queryParam.idCardStartSearch = []
          this.queryParam.idCardStartSearch[0] = formatDate(this.queryParam.idCardStartCondition[0], 'YYYY-MM-DD')
          this.queryParam.idCardStartSearch[1] = formatDate(this.queryParam.idCardStartCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.addTimeCondition) {
          this.queryParam.addTimeSearch = []
          this.queryParam.addTimeSearch[0] = formatDate(this.queryParam.addTimeCondition[0], 'YYYY-MM-DD')
          this.queryParam.addTimeSearch[1] = formatDate(this.queryParam.addTimeCondition[1], 'YYYY-MM-DD')
        }
        if (this.queryParam.updTimeCondition) {
          this.queryParam.updTimeSearch = []
          this.queryParam.updTimeSearch[0] = formatDate(this.queryParam.updTimeCondition[0], 'YYYY-MM-DD')
          this.queryParam.updTimeSearch[1] = formatDate(this.queryParam.updTimeCondition[1], 'YYYY-MM-DD')
        }
        return queryList(Object.assign(parameter, this.queryParam))
          .then(res => {
            if (res.code === 10000) {
              return res.result
            }
          })
      },
      companyType: [{ label: '全部', value: '' }],
      selectCompanyType: [],
      clientage: [{ label: '全部', value: '' }],
      selectClientage: [],
      invoiceFlag: [{ label: '全部', value: '' }],
      selectInvoiceFlag: [],
      ticketType: [{ label: '全部', value: '' }],
      selectTicketType: [],
      // 单个记录行
      recordActive: {}
    }
  },
  created () {
    getDictByType('company_type').then(
      (res) => {
        if (res.code === 10000) {
          const dnyCompanyType = res.result.map(item => {
            return { label: `${item.dictKey}`, value: `${item.dictValue}` }
          })
          this.companyType = [...this.companyType, ...dnyCompanyType]
          this.selectCompanyType = dnyCompanyType
        }
      }
    )
    getDictByType('clientage').then(
      (res) => {
        if (res.code === 10000) {
          const dnyClientage = res.result.map(item => {
            return { label: `${item.dictKey}`, value: `${item.dictValue}` }
          })
          this.clientage = [...this.clientage, ...dnyClientage]
          this.selectClientage = dnyClientage
        }
      }
    )
    getDictByType('invoice_flag').then(
      (res) => {
        if (res.code === 10000) {
          const dnyInvoiceFlag = res.result.map(item => {
            return { label: `${item.dictKey}`, value: `${item.dictValue}` }
          })
          this.invoiceFlag = [...this.invoiceFlag, ...dnyInvoiceFlag]
          this.selectInvoiceFlag = dnyInvoiceFlag
        }
      }
    )
    getDictByType('ticket_type').then(
      (res) => {
        if (res.code === 10000) {
          const dnyTicketType = res.result.map(item => {
            return { label: `${item.dictKey}`, value: `${item.dictValue}` }
          })
          this.ticketType = [...this.ticketType, ...dnyTicketType]
          this.selectTicketType = dnyTicketType
        }
      }
    )
  },
  computed: {},
  methods: {
    /**
     * 财务选中
     */
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getCompanyTypeName (key) {
      let value = ''
      this.selectCompanyType.forEach(item => {
        if (item.value === key) {
          value = item.label
        }
      })
      return value
    },
    getClientageName (key) {
      let value = ''
      this.selectClientage.forEach(item => {
        if (item.value === key) {
          value = item.label
        }
      })
      return value
    },
    getInvoiceFlagName (key) {
      let value = ''
      this.selectInvoiceFlag.forEach(item => {
        if (item.value === key) {
          value = item.label
        }
      })
      return value
    },
    getTicketTypeName (key) {
      let value = ''
      this.selectTicketType.forEach(item => {
        if (item.value === key) {
          value = item.label
        }
      })
      return value
    },
    // 重置查询
    restQuery () {
      this.queryParam = {}
      this.$refs.financeTable.refresh(true)
    },
    // 刷新列表
    refresh () {
      this.$refs.financeTable.refresh()
    },
    // 打开详情
    handleDetail (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.financeDetail.show()
        }
      })
    },
    // 打开新增
    handleAdd () {
      this.recordActive = {}
      this.$refs.financeAdd.show()
    },
    // 打开更新
    handleUpdate (record) {
      get(record).then(res => {
        if (res.code === 10000) {
          this.recordActive = res.result
          this.$refs.financeEdit.show()
        }
      })
    },
    // 删除记录
    handleDelete (records) {
      let ids = ''
      records.map(record => {
        ids += record.id + ','
      })
      const param = { id: ids }
      del(param).then(res => {
        if (res.code === 10000) {
          this.$message.info(res.msg)
          this.refresh()
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
   /deep/ .ant-form-item{
     .ant-form-item-label{
       width: 150px !important;
     }

}
</style>
