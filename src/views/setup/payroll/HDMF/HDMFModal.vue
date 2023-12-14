<template>
  <div>
    <a-modal
      :title="model && model.hdmf_type === undefined ? 'Add HDMF' : 'View HDMF' "
      :width="800"
      v-model="viewHDMFModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okText="model && model.HDMFType === undefined ? 'Confirm' : 'Edit' "
      @ok="handleSubmit"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="HDMF Type: ">
          <a-input
            :maxLength="25"
            v-decorator="['hdmf_type', { rules: [{ required: true, message: $t('error.hdmf-type.required') }] }]"
            placeholder="example"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Descriptions:">
          <a-input
            :maxLength="100"
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autoheight based on content lines="
            v-decorator="['descriptions']"
          />
        </a-form-item>

        <a-form-item label="Amount: ">
          <a-input
            style="width:100%"
            :maxLength="10"
            @change="onChange"
            @blur="onBlur"
            v-decorator="['amount', { rules: [{ required: true, message: $t('error.amount.required') }, {validator: validate}] }]"
            placeholder="example"
          >
          </a-input>
        </a-form-item>

        <a-form-item label="Employer Contribution Rate: ">
          <a-input
            :maxLength="6"
            v-decorator="['employer_contribution_rate', { rules: [{ required: true, message: $t('error.employer-contribution-rate.required') }, {validator: validate}] }]"
            placeholder="example"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Employee Contribution Rate: ">
          <a-input
            :maxLength="6"
            v-decorator="['employee_contribution_rate', { rules: [{ required: true, message: $t('error.employee-contribution-rate.required') }, {validator: validate}] }]"
            placeholder="example"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Remarks: ">
          <a-input
            :maxLength="100"
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autoheight based on content lines="
            v-decorator="['remarks']"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import pick from 'lodash.pick'
import InfoCircle from '@/assets/info-circle.svg'

const fields = ['hdmf_type', 'descriptions', 'amount', 'employer_contribution_rate', 'employee_contribution_rate', 'remarks']

export default {
  name: 'ViewHDMFModal',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      value: ''
    }
  },
  props: {
    model: {
      type: Object,
      default: () => null
    }
  },
  computed: {
    viewHDMFModal: {
      get () {
        return this.$store.state.modal.setupPayrollHDMFModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
 methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_SETUP_PAYROLL_HDMF_MODAL')
      this.form.resetFields()
    },
    handleSubmit (result) {
      console.log(result)
      this.form.validateFields((err, values) => !err && this.showInfo(result))
    },
    showNotification () {
      this.$notification.open({
        message: this.$t('table.dialog.hdmf-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showInfo (result) {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$confirm({
            title: i18nRender('table.dialog.confirm-msg'),
            okText: i18nRender('table.dialog.yes'),
            cancelText: i18nRender('table.dialog.no'),
            icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
            async onOk () {
              const data = {
                hdmf_type: _this.form.getFieldValue('hdmf_type'),
                descriptions: _this.form.getFieldValue('descriptions') || '',
                amount: _this.form.getFieldValue('amount'),
                employer_contribution_rate: _this.form.getFieldValue('employer_contribution_rate'),
                employee_contribution_rate: _this.form.getFieldValue('employee_contribution_rate')
              }
              try {
                await _this.$store.dispatch('api/setup/payroll/hdmf/addHDMF', data)
                _this.showNotification()
                _this.closeModal()
                _this.$emit('refreshTable')
              } catch (e) {
                _this.$message.error(e.response.data.message)
              }
            },
            onCancel () {
              console.log('Cancel')
            }
          })
        }
      })
    },
    validate (rule, value, callback) {
        const regex = /^\d*\.?\d*$/
        const regexDp = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/

        if (value && !regex.test(value)) {
          callback(new Error('Should be number'))
        } else {
          if (value && !regexDp.test(value)) {
            callback(new Error('Up to 2 decimal places only.'))
          } else {
          callback()
          }
        }
    },
    onChange (e) {
      const value = e.target
      const reg = /^-?[0-9]*(\.[0-9]*)?$/
      if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
        this.value = value
        const amount = e.target.id
        this.form.setFieldsValue({ [amount]: this.value })
      }
    },
    onBlur (e) {
      const amount = e.target.id
      const value = this.form.getFieldValue(amount)

      if (isNaN(value)) this.form.setFieldsValue({ [amount]: value.replace(/[^\d]/g, '') })
    }
  },
  created () {
      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$watch('model', () => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    }
}
</script>
