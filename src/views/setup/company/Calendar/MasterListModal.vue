<template>
  <div>
    <a-modal
      :title="model && model.holiday === undefined ? $t('table.dialog.add-master-list') : $t('table.dialog.edit-master-list') "
      :width="600"
      v-model="MasterListModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      :maskClosable="false"
      @cancel="closeModal()"
    > <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
      <a-form-item :label="`${$t('table.column.holiday')}: `" style="display: flex">
        <a-input
          :maxLength="25"
          placeholder="example"
          v-decorator="['holiday', { rules: [{ required: true, message: $t('error.holiday.required') }] }]"
        />
      </a-form-item>

      <!-- <a-form-item :label="`${$t('table.column.date')}: `">
        <a-range-picker v-decorator="['date', { rules: [{ required: true, message: $t('error.date.required') }] }]" />
      </a-form-item> -->
      <a-row>
        <a-col :span="18" :push="6">
          <a-row :style="{marginLeft: '40px;'}">
            <a-col :span="10">
              <a-form-item style="width: 150%">
                <a-date-picker
                  placeholder="Start Date"
                  v-decorator="['startDate', { rules: [{ required: true, message: 'Start Date is required.' }, {validator: validate}] }]"
                />
              </a-form-item>
            </a-col>&nbsp;
            <a-col :span="1 " :style="{textAlign: 'center', marginTop: '9px'}">
              <span>
                -
              </span>
            </a-col>
            <a-col :span="10">
              <a-form-item style="width: 150%">
                <a-date-picker
                  placeholder="End Date"
                  v-decorator="['endDate', { rules: [{ required: true, message: 'End Date is required.' }, {validator: validate}] }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="6" :pull="15">
          <a-row style="margin-left: 11px">
            <a-col :span="2" :style="{textAlign: 'right', marginTop: '9px'}">
              <span class="ant-form-item-required" ></span>
            </a-col>
            <a-col :span="22">
              <a-form-item :label="`${$t('table.column.date')} `" ><span style="color: black">&nbsp;:</span></a-form-item>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-form-item label="Holiday Type: ">
        <a-select v-decorator="['holiday_type_id', { rules: [{required: true, message: $t('error.holiday-type.required')}]}]">
          <a-select-option v-for="(holidayType,index) in holidayTypes" :key="index" :value="holidayType.id">{{ holidayType.value }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="`${$t('table.column.descriptions')}: `">
        <a-textarea
          :autoSize="{ minRows: 3, maxRows: 6 }"
          :maxLength="100"
          v-decorator="['description']"
        />
      </a-form-item>
      <div style="display: flex; align-items: center; justify-content: right; padding-right: 40px">
        <a-form-item style="width: 280px">
          <a-checkbox
            v-decorator="[
              'repeatedYearly',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            {{ $t('table.dialog.repeated-yearly') }}
          </a-checkbox>
        </a-form-item>
        <a-form-item>
          <a-button key="confirm" type="primary" @click="handleSubmit()"> Confirm </a-button>
        </a-form-item>
      </div>
    </a-form>
    </a-modal>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import InfoCircle from '@/assets/info-circle.svg'
import { type } from '@/api/dictionary'
const fields = ['holiday', 'description', 'holiday_type_id', 'startDate', 'endDate']

export default {
  name: 'MasterListModal',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      dataList: this.data,
      holidayTypes: []
    }
  },
  props: {
    model: { type: Object, default: null }
  },
  computed: {
    MasterListModal: {
      get () {
        return this.$store.state.modal.MasterListModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_MASTER_LIST_MODAL')
      this.form.resetFields()
    },
    handleSubmit () {
      this.form.validateFields((err, values) => !err && this.showInfo())
    },
    showNotification () {
      this.$notification.open({
        message: this.$t('notification.holiday.added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showInfo () {
      const _this = this
      this.$confirm({
        title: _this.$t('table.dialog.confirm-msg'),
        okText: _this.$t('table.dialog.yes'),
        cancelText: _this.$t('table.dialog.no'),
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
        async onOk () {
          const startDate = _this.form.getFieldValue('startDate')
          const endDate = _this.form.getFieldValue('endDate')

          const data = {
            holiday: _this.form.getFieldValue('holiday'),
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
            descriptions: _this.form.getFieldValue('description'),
            repeated_yearly: _this.form.getFieldValue('repeatedYearly'),
            holiday_type_id: _this.form.getFieldValue('holiday_type_id')
          }
          try {
            if (_this.model.holiday) {
              // update

              alert('update')
            } else {
              // add
               await _this.$store.dispatch('api/setup/company/calendarMasterList/addMasterCalendar', data)
            }

            _this.showNotification()
            _this.closeModal()
            _this.$emit('refreshTable')
          } catch (e) {
            _this.$message.error(e.response.data.message)
          }
        }
      })
    },
     validate (rule, value, callback) {
      // console.log('date', moment(value).format('YYYY-MM-DD'))
      // console.log('Object', rule.field)
      const _this_ = this
      var startD
      var endD
      startD = _this_.form.getFieldValue('startDate')
      endD = _this_.form.getFieldValue('endDate')
      // console.log('getS', startD)
      // console.log('getE', endD)
      if (startD > endD) {
        if (rule.field === 'startDate') {
          callback(new Error('Start Date should be greater than End Date.'))
        } else if (rule.field === 'endDate') {
          callback(new Error('End Date should be greater than Start Date.'))
        }
      }
      callback()
    }
  },
  async created () {
    this.holidayTypes = await this.$store.dispatch('api/setup/dictionary/getDropdownValues', type.HOLIDAY)
    fields.forEach((v) => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
