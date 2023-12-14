<template>
  <!-- Salary section-->
  <div>
    <div class="header">Salary</div>
    <a-row type="flex" justify="start" style="margin-left: 80px">
      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.salary-type')}: `" :labelCol="{span: 12 }" :wrapperCol="{ span: 12}">
          <a-select
            :options="salaryTypeDropdown"
            :disabled="editable"
            v-decorator="[
              'salary_type_id',
              { rules: [{ required: true, message: $t('error.salary-type.required') }] }
            ]"
            placeholder="Select"
            @change="handleSelectChange"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.basic-salary')}: `" :labelCol="{span: 12 }" :wrapperCol="{ span: 12}">
          <a-input
            :maxLength="10"
            @change="onChange"
            :disabled="editable"
            @blur="onBlur"
            v-decorator="[
              'basic_salary',
              { rules: [{ required: true, message: $t('error.basic-salary.required') }] }
            ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row style="margin-left: 80px">
      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.pay-frequency')}: `" :labelCol="{span: 12 }" :wrapperCol="{ span: 12}">
          <a-select
            :options="frequencyTypeDropdown"
            :disabled="editable"
            placeholder="Select"
            v-decorator="[
              'pay_frequency_id',
              { rules: [{ required: true, message: $t('error.pay-frequency.required') }] }
            ]"
            @change="handleSelectChange"
          />

        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'PayrollInfoSalary',
    props: {
      form: { type: Object, default: null },
      editable: { type: Boolean, default: true },
      payrollInfo: { type: Object, default: null }
    },
    created () {
      this.loadSalaryType()
      this.loadFrequencyType()
    },
    computed: {
      ...mapGetters('api/setup/employee/employeeSetup', ['employee']),

      checkEmployee () {
        const employeePayrollInfo = this.employee.employee_setup_payroll_info
        return employeePayrollInfo
      }
    },
    data () {
      return {
        salaryTypeDropdown: [],
        frequencyTypeDropdown: [],
        loadSalaryType: async () => {
          const data = await this.$store.dispatch('api/dropdown/fetchSalaryTypeDropdown')
          data.dictionary_setup_values.forEach((item) => {
            this.salaryTypeDropdown = [...this.salaryTypeDropdown, {
              value: item.id,
              label: item.value
            }]
          })
          return this.salaryTypeDropdown
        },
        loadFrequencyType: async () => {
          const data = await this.$store.dispatch('api/dropdown/fetchPayFrequencyDropdown')
          data.dictionary_setup_values.forEach((item) => {
            this.frequencyTypeDropdown = [...this.frequencyTypeDropdown, {
              value: item.id,
              label: item.value
            }]
          })
          return this.frequencyTypeDropdown
        }
      }
    },
    methods: {
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

          if (value && isNaN(value)) this.form.setFieldsValue({ [amount]: value.replace(/[^\d]/g, '') })
        },
        handleSelectChange (e) {
          console.log(e)
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
