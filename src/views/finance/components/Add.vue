<template>
  <a-drawer
    wrapClassName="custom-drawer"
    :maskClosable="false"
    title="新增"
    @close="onClose"
    :visible="addVisible"
    :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
  >
    <a-form :form="form">
      <a-row :gutter="16" style="padding-bottom: 24px;">
        <a-col :lg="12" :md="24">
          <a-form-item
            label="往来单位编码"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['code',{rules:[{required: true, message: '往来单位编码不能为空'},{validator: validatorCheckCode}]}]"
              placeholder="请输入往来单位编码"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="往来单位名称"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['name',{}]"
              placeholder="请输入往来单位名称"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="客户"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['type',{}]"
              placeholder="请输入客户"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="分管人"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['leader',{}]"
              placeholder="请输入分管人"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="个体工商户"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select :options="companyType" v-decorator="['companyType',{}]" allowClear placeholder="请选择个体工商户"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="营业执照号码"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['businessLicenseNumber',{}]"
              placeholder="请输入营业执照号码"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="法定代表人或经营者"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['legalRepresentative',{}]"
              placeholder="请输入法定代表人或经营者"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="许可证号码"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['licenseNo',{}]"
              placeholder="请输入许可证号码"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="到期日"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-date-picker
              v-decorator="['endtime',{}]"
              placeholder="请选择到期日"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="经营范围是否有"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['businessScopeFlag',{}]"
              placeholder="请输入经营范围是否有"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="付款人"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['payer',{}]"
              placeholder="请输入付款人"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="委托关系"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select :options="clientage" v-decorator="['clientage',{}]" allowClear placeholder="请选择委托关系"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="委托期限开始"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-date-picker
              v-decorator="['proxyStart',{}]"
              placeholder="请选择委托期限开始"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="委托期限结束"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-date-picker
              v-decorator="['proxyEnd',{}]"
              placeholder="请选择委托期限结束"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="付款账号"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['paymentAccount',{}]"
              placeholder="请输入付款账号"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="身份证信息"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['idCard',{}]"
              placeholder="请输入身份证信息"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="身份证期限"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['idCardLimit',{}]"
              placeholder="请选择身份证期限"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="是否确认"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['confirmFlag',{}]"
              placeholder="请输入是否确认"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="是否开票"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select :options="invoiceFlag" v-decorator="['invoiceFlag',{}]" allowClear placeholder="请选择是否开票"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="专票普票电票"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-select :options="ticketType" v-decorator="['ticketType',{}]" allowClear placeholder="请选择专票普票电票"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24">
          <a-form-item
            label="开户行"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }">
            <a-input
              v-decorator="['openingBank',{}]"
              placeholder="请输入开户行"/>
          </a-form-item>
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
          取消
        </a-button>
        <a-button @click="handleSubmit" type="primary" :loading="formLoading">保存</a-button>
      </div>

    </a-form>
  </a-drawer>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'

export default {
  name: 'FinanceAdd',
  components: { ACol },
  props: {
    refresh: {
      type: Function,
      default: undefined
    },
    save: {
      type: Function,
      default: undefined
    },
    formatDate: {
      type: Function,
      default: undefined
    },
    companyType: {
      type: Array,
      default: function () {
        return {}
      }
    },
    clientage: {
      type: Array,
      default: function () {
        return {}
      }
    },
    invoiceFlag: {
      type: Array,
      default: function () {
        return {}
      }
    },
    ticketType: {
      type: Array,
      default: function () {
        return {}
      }
    },
    checkCode: {
      type: Function,
      default: undefined
    },
    record: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      addVisible: false,
      form: this.$form.createForm(this),
      formLoading: false
    }
  },
  computed: {},
  methods: {
    validatorCheckCode (rule, value, callback) {
      const params = { code: this.form.getFieldValue('code') }
      this.checkCode(params).then(res => {
        if (res.code !== 10000) {
          callback(new Error(res.msg))
        } else if (res.code === 10000 && res.result > 0) {
          callback(new Error('往来单位编码已存在'))
        }
        callback()
      })
    },
    show () {
      this.addVisible = true
    },
    onClose () {
      this.addVisible = false
      this.formLoading = false
      this.form.resetFields()
    },
    handleSubmit () {
      this.formLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          values.endtime = this.formatDate(values.endtime, 'YYYY-MM-DD 00:00:00')
          values.proxyEnd = this.formatDate(values.proxyEnd, 'YYYY-MM-DD 00:00:00')
          values.proxyStart = this.formatDate(values.proxyStart, 'YYYY-MM-DD 00:00:00')
          values.addTime = this.formatDate(values.addTime, 'YYYY-MM-DD 00:00:00')
          values.updTime = this.formatDate(values.updTime, 'YYYY-MM-DD 00:00:00')
          this.save(values).then(res => {
            if (res.code === 10000) {
              this.$message.info(res.msg)
              this.refresh()
              this.onClose()
            }
          }).finally(() => {
            this.formLoading = false
          })
        } else {
          setTimeout(() => {
            this.formLoading = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
