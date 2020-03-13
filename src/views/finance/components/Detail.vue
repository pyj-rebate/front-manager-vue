<template>
  <a-drawer
    wrapClassName="custom-drawer"
    title="详情"
    @close="onClose"
    :visible="detailVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-row :gutter="16" style="padding-bottom: 24px;">
      <a-col :lg="12" :md="24">
        <span class="detail-label">往来单位编码</span><span class="detail-content">{{ record.code }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">往来单位名称</span><span class="detail-content">{{ record.name }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">客户</span><span class="detail-content">{{ record.type }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">分管人</span><span class="detail-content">{{ record.leader }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">个体工商户</span><span class="detail-content">{{ getCompanyTypeName(record.companyType) }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">营业执照号码</span><span class="detail-content">{{ record.businessLicenseNumber }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">法定代表人或经营者</span><span class="detail-content">{{ record.legalRepresentative }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">许可证号码</span><span class="detail-content">{{ record.licenseNo }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">到期日</span><span class="detail-content">{{ formatDate(record.endtime,'YYYY-MM-DD') }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">经营范围是否有</span><span class="detail-content">{{ record.businessScopeFlag }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">付款人</span><span class="detail-content">{{ record.payer }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">委托关系</span><span class="detail-content">{{ getClientageName(record.clientage) }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">委托期限开始</span><span class="detail-content">{{ formatDate(record.proxyStart,'YYYY-MM-DD') }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">委托期限结束</span><span class="detail-content">{{ formatDate(record.proxyEnd,'YYYY-MM-DD') }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">付款账号</span><span class="detail-content">{{ record.paymentAccount }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">身份证信息</span><span class="detail-content">{{ record.idCard }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">身份证期限开始</span><span class="detail-content">{{ formatDate(record.idCardStart,'YYYY-MM-DD') }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">身份证期限结束</span><span class="detail-content">{{ formatDate(record.idCardEnd,'YYYY-MM-DD') }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">是否确认</span><span class="detail-content">{{ record.confirmFlag }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">是否开票</span><span class="detail-content">{{ getInvoiceFlagName(record.invoiceFlag) }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">专票普票电票</span><span class="detail-content">{{ getTicketTypeName(record.ticketType) }}</span>
      </a-col>
      <a-col :lg="12" :md="24">
        <span class="detail-label">开户行</span><span class="detail-content">{{ record.openingBank }}</span>
      </a-col>
    </a-row>
    <div
      :style="{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
      }"
    >
      <a-button
        :style="{marginRight: '8px'}"
        @click="onClose"
      >
        返回
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
export default {
  name: 'FinanceDetail',
  props: {

    formatDate: {
      type: Function,
      default: undefined
    },
    getCompanyTypeName: {
      type: Function,
      default: undefined
    },
    getClientageName: {
      type: Function,
      default: undefined
    },
    getInvoiceFlagName: {
      type: Function,
      default: undefined
    },
    getTicketTypeName: {
      type: Function,
      default: undefined
    },
    record: {
      type: [Object, String],
      default: ''
    }
  },
  data () {
    return {
      detailVisible: false
    }
  },
  methods: {
    show () {
      this.detailVisible = true
    },
    onClose () {
      this.detailVisible = false
    }
  }
}
</script>

<style scoped>

</style>
