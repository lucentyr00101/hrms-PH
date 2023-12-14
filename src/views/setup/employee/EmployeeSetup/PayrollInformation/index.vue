<template>
  <div>
    <FillEmployee :employeeId="employeeId" />
    <a-form :form="form" style="border: 1px solid #e8e8e8" :label-col="{ span: 9 }" @submit="handleSubmit">

      <Salary :form="form" :editable="editable" :payrollInfo="checkEmployee"/>
      <TIN :form="form" :editable="editable"/>
      <PaymentEditableTable :form="form" :editable="editable" ref="paymentEditableTable" v-model="paymentMethodList"/>
      <SSS :form="form" :editable="editable"/>
      <PHIC :form="form" :editable="editable"/>
      <HDMF :form="form" :editable="editable"/>

      <div style="float: right; margin-top: 20px">
        <a-button :disabled="editable" @click="handleCancel">{{ $t('table.dialog.cancel') }}</a-button>
        <a-button type="primary" style="margin-left: 20px" @click="editable ? handleEdit() : handleSubmit()">
          {{ editable ? $t('table.dialog.edit') : $t('table.dialog.confirm') }}
        </a-button>
      </div>
    </a-form>
  </div>
</template>

<script>
import Salary from './Salary.vue'
import TIN from './TIN.vue'
import SSS from './SSS.vue'
import PHIC from './PHIC.vue'
import HDMF from './HDMF.vue'
import PaymentEditableTable from './PaymentEditableTable.vue'
import pick from 'lodash.pick'
import { employeeSetupMixin } from '@/store/app-mixin'
import { mapGetters } from 'vuex'
import InfoCircle from '@/assets/info-circle.svg'
import FillEmployee from '@/components/Setup/Employee/EmployeeSetup/FillEmployee.vue'

const fields = [
  'salary_type_id', 'basic_salary', 'pay_frequency_id',
  'tax_category_id', 'tin', 'tax_branch', 'deduct_tax', 'self_disabled', 'spouse_disabled', 'borne_by_employer',
  'sss_number', 'sss_group_id', 'deduct_sss',
  'phic_category_id', 'phic_number', 'pay_phic',
  'hdmf_number', 'hdmf_type_id', 'deduct_hdmf'
  ]

export default {
  name: 'PayrollInformation',
  props: {
    editable: { type: Boolean, default: null }
  },
  components: {
    Salary,
    TIN,
    SSS,
    PHIC,
    HDMF,
    PaymentEditableTable,
    FillEmployee
},
  mixins: [employeeSetupMixin],
  data () {
    return {
      form: this.$form.createForm(this),
      cacheData: null,
      emptyRecord: false,
      disabled: this.editable,
      formData: null,
      error: true,
      payrollEditing: false,
      fields,
      paymentMethodList: []
    }
  },
  computed: {
    ...mapGetters('api/setup/employee/employeeSetup', ['employee']),

    checkEmployee () {
      const employeePayrollInfo = this.employee.employee_setup_payroll_info
      return employeePayrollInfo
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('checkEmployee', () => {
      this.checkEmployee && this.form.setFieldsValue(pick(this.checkEmployee, fields))
      this.paymentMethodList = this.checkEmployee.payment_methods
    })
    // getting latest data for caching
    this.getEmployeeSetup(this.$route.params.id).then(res => {
      if (res?.employee_setup_payroll_info) {
        this.cacheData = this.parseData(res.employee_setup_payroll_info)
      } else {
        this.$emit('handleEditable')
      }
    })
  },
  methods: {
    getEditing (value) {
      console.log(value)
    },

    handleSelectChange (e) {
      console.log(e)
    },
    getEmptyRecord (value) {
      console.log(value)
    },
    handleEdit () {
      this.$emit('handleEditable')
      console.log(this.editable)
    },
    // remove reference on the data
    parseData (data) {
      return JSON.parse(JSON.stringify(data))
    },
    handleCancel () {
      if (this.cacheData) {
        const cacheData = this.parseData(this.cacheData)
        this.form.setFieldsValue(pick(cacheData, fields))
        this.paymentMethodList = [
          ...(cacheData.payment_methods || [])
        ]
      } else {
        this.form.resetFields()
        this.paymentMethodList = []
      }
      this.$emit('handleEditable')
    },
    showNotification () {
      this.$notification.open({
        message: this.checkEmployee ? this.$t('table.dialog.payroll-info-updated') : this.$t('table.dialog.payroll-info-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },

    showInfo (values) {
      const _this = this
      this.$confirm({
        title: _this.$t('table.dialog.confirm-msg'),
        okText: 'Yes',
        cancelText: 'No',
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
        async onOk () {
          const paymentList = _this.$refs.paymentEditableTable.paymentList()
          const paymentMethod = paymentList.map((item, index) => {
            return {
              key: index,
              bank_id: item.bank_id,
              account_number: item.account_number
            }
          })
          const data = {
            'employee_id': _this.employeeId,
            'salary_type_id': _this.form.getFieldValue('salary_type_id'),
            'pay_frequency_id': _this.form.getFieldValue('pay_frequency_id'),
            'basic_salary': _this.form.getFieldValue('basic_salary'),
            'tin': _this.form.getFieldValue('tin') || '',
            'tax_category_id': _this.form.getFieldValue('tax_category_id') || '',
            'tax_branch': _this.form.getFieldValue('tax_branch') || '',
            'deduct_tax': _this.form.getFieldValue('deduct_tax') || false,
            'self_disabled': _this.form.getFieldValue('self_disabled') || false,
            'spouse_disabled': _this.form.getFieldValue('spouse_disabled') || false,
            'borne_by_employer': _this.form.getFieldValue('borne_by_employer') || false,
            'payment_methods': paymentMethod,
            'sss_number': _this.form.getFieldValue('sss_number') || '',
            'sss_group_id': _this.form.getFieldValue('sss_group_id') || '',
            'deduct_sss': _this.form.getFieldValue('deduct_sss') || false,
            'phic_number': _this.form.getFieldValue('phic_number') || '',
            'phic_category_id': _this.form.getFieldValue('phic_category_id') || '',
            'pay_phic': _this.form.getFieldValue('pay_phic') || false,
            'hdmf_number': _this.form.getFieldValue('hdmf_number') || '',
            'hdmf_type_id': _this.form.getFieldValue('hdmf_type_id') || '',
            'deduct_hdmf': _this.form.getFieldValue('deduct_hdmf') || false
          }
          _this.cacheData = _this.parseData(data)
          try {
            if (_this.checkEmployee) {
              await _this.$store.dispatch('api/setup/employee/employeeSetup/payroll/updatePayroll', {
                id: _this.checkEmployee.id,
                data
              })
            } else {
              await _this.$store.dispatch('api/setup/employee/employeeSetup/payroll/addPayroll', data)
            }

            _this.showNotification()
            _this.$emit('handleEditable')
            _this.$emit('titleIcon')
          } catch (e) {
            _this.$message.error(e)
          }
        },

          onCancel () {
            console.log('Cancel')
          }
        })
      },
      handleSubmit () {
      // validate required fields
      this.form.validateFields((err, values) => {
        if (this.$refs.paymentEditableTable.validateTable() && !err) {
            this.showInfo()
        }
      })
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #e8e8e8;
  font-size: 15px;
  padding: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
