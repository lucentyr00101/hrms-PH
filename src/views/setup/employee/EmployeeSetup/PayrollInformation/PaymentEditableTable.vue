<template>

  <div>
    <div class="header">Payment Method</div>
    <a-row style="padding-left: 50px; padding-right: 50px; margin-bottom: 20px">
      <a-table :columns="columns" row-key="id" :data-source="ds" :pagination="false" >
        <template
          v-for="col in editableColumns"
          :slot="col.dataIndex"
          slot-scope="text, record" >

          <div :key="col.dataIndex">
            <a-select
              :options="companyBankDropdown"
              :value="text"
              :disabled="editable"
              v-if="col.valueType==='select'"
              @change="(value) => handleSelectChange(value, record.key, col.dataIndex)"
            />

            <a-input
              v-else
              :value="text"
              :disabled="editable"
              :maxLength="25"
              style="margin: -5px 0"
              @change="(e) => handleChange(e.target.value, record.key, col.dataIndex)"
            />
          </div>
        </template>
        <template slot="index" slot-scope="text, record, index">
          {{ index+1 }}
        </template>
        <template v-if="!editable" slot="action" slot-scope="text, record">
          <a-space>
            <span>
              <a @click="remove(record.key)">{{ $t('table.dialog.delete') }}</a>
            </span>
          </a-space>
        </template>
      </a-table>
      <a-button v-if="!editable" style="width: 100%; margin-top: 8px; margin-bottom:8px" @click="handleAdd()">+ {{ $t('table.dialog.add-row') }}</a-button>
      <span class="error" v-if="emptyRecord">{{ $t('table.dialog.column-validate-msg') }}</span>
      <slot :result="ds"></slot>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const newData = {
  key: 0,
  editable: true
}

export default {
  name: 'PaymentEditableTable',
  props: {
    form: { type: Object, default: null },
    value: { type: Array, default () { return [] } },
    disabled: { type: Boolean, default: false },
    editable: { type: Boolean, default: false }
  },
  computed: {
    isEditing () {
      let editing = false
      this.ds.forEach((el) => {
        if (el.editable === true) editing = true
      })
      return editing
    },
    ...mapGetters('api/setup/employee/employeeSetup', ['employee']),
    checkEmployee () {
      const employeePayrollInfo = this.employee.employee_setup_payroll_info
      return employeePayrollInfo
    }
  },
  data () {
    return {
      // mock data
      ds: [

      ],
      columns: [
        { title: '#', dataIndex: 'index', key: 'index', scopedSlots: { customRender: 'index' } },
        { title: 'Bank', dataIndex: 'bank_id', key: 'bank_id', scopedSlots: { customRender: 'bank_id' } },
        { title: 'Account Number', dataIndex: 'account_number', key: 'account_number', scopedSlots: { customRender: 'account_number' } },
        { title: 'Action', key: 'action', scopedSlots: { customRender: 'action' } }
      ],

      editableColumns: [
        { dataIndex: 'bank_id', valueType: 'select' },
        { dataIndex: 'account_number', valueType: 'text' }
      ],
      count: this.value.length,
      cacheData: [],
      saved: false,
      emptyRecord: false,
      companyBankDropdown: [],
      loadCompanyBankDropdown: async () => {
        const data = await this.$store.dispatch('api/dropdown/fetchBankDropdown')
        data.dictionary_setup_values.forEach((item) => {
          this.companyBankDropdown = [...this.companyBankDropdown, {
            value: item.id,
            label: item.value
          }]
        })
        return this.companyBankDropdown
      }
    }
  },
  created () {
    this.loadCompanyBankDropdown()
    this.$watch('value', () => {
      this.cacheData = this.ds.map((item) => ({ ...item }))
      this.editableColumns.forEach((el) => {
          newData[el.dataIndex] = ''
      })
      this.ds = this.value
      if (this.ds.length === 0) {
          this.ds = [newData]
      }
      this.count = this.ds.length
    })
    this.handleAdd()
    // this.$watch('checkEmployee', () => {
    //   if (this.checkEmployee) {
    //     this.checkEmployee.payment_methods.forEach((item) => {
    //       this.ds.forEach((ds) => {
    //         ds.accountNumber = item.account_number
    //         ds.bank = item.bank_id
    //       })
    //    })
    //   }
    // })
    this.count = this.ds.length
  },
  methods: {
    handleSelectChange (value, key, col) {
      this.handleChange(value, key, col)
    },
    validateTable () {
      this.emptyRecord = false
      if (this.ds.length === 0) {
        this.emptyRecord = true
      } else {
        this.ds.forEach((el) => {
          this.editableColumns.forEach((elj) => {
            if (!el[elj.dataIndex]) {
              this.emptyRecord = true
            }
          })
        })
      }
      return !this.emptyRecord
    },
    paymentList () {
      return this.ds
    },
    handleChange (value, key, column) {
        const newData = [...this.ds]
        const target = newData.find((item) => key === item.key)

        target[column] = value
        this.ds = newData
    },
    cancel (key) {
      this.ds = JSON.parse(JSON.stringify(this.cacheData))
      this.ds[key].saved = true
    },
    handleAdd () {
      this.ds = [...this.ds, { ...newData, key: this.count }]
      this.count = this.ds.length
    },
    remove (key) {
      const newData = []
      let newKey = 0
      this.ds.forEach((el, i) => {
        if (el.key !== key) {
          newData.push({ ...el, key: newKey })
          newKey++
        }
      })

      this.ds = newData
      this.count = this.count - 1
      console.log(this.ds)
    }
  }
}
</script>

<style lang="less" scoped>
  .error {
     color: red;
  }

  .header {
    background-color: #e8e8e8;
    font-size: 15px;
    padding: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
</style>
