<template>
  <div>
    <a-modal
      :title="model && model.employeeNumber === undefined ? $t('table.dialog.add-work-shift'): $t('table.dialog.edit-work-shift') "
      :width="800"
      v-model="displayModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Repeat Monthly: ">
          <a-switch default-checked />
        </a-form-item>
        <a-form-item label="Employee: ">
          <a-select
            v-decorator="[
              'employee',
              { rules: [{ required: true, message: 'Please select an employee!' }] },
            ]"
            placeholder="Choose an employee"
          >
            <a-select-option value="1">Test</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Month: ">
          <a-month-picker v-decorator="['month', { rules: [{ required: true, message: `${$t('table.column.month')} ${$t('error.required')}` }] }]" placeholder="Select month" />
        </a-form-item>
        <a-form-item :label="`${$t('table.column.work-hours')}:`">
          <a-input
            :maxLength="25"
            :placeholder="`${$t('table.column.work-hours')} per Day`"
            v-decorator="['workHours', { rules: [{ required: true, message: `${$t('table.column.work-hours')} ${$t('error.required')}` }] }]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :label="`${$t('table.column.work-days')}:`">
          <a-input
            :maxLength="25"
            :placeholder="`${$t('table.column.work-days')} per Week`"
            v-decorator="['workDays', { rules: [{ required: true, message: `${$t('table.column.work-days')} ${$t('error.required')}` }] }]"
          >
          </a-input>
        </a-form-item>
        <a-form-item label=" ">
          <a-select
            mode="tags"
            style="width: 100%"
            placeholder="Please select"
            v-decorator="[
              'workDays2',
              { rules: [{ required: true, message: 'Please select work day(s)!' }] },
            ]"
          >
            <a-select-option v-for="workDay in workDays2" :key="workDay">
              {{ workDay }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('table.column.work-shift')}: `">
          <a-select
            placeholder="Select"
            v-decorator="['workShift', { rules: [{ required: true, message: `${$t('table.column.work-shift')} ${$t('error.required')}` }] }]"
          >
            <a-select-option value="1">Test</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="handleSubmit()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import InfoCircle from '@/assets/info-circle.svg'

export default {
  name: 'WorkShiftModal',
  props: {
    showModal: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      workDays2: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  computed: {
    displayModal: {
      get () {
        return this.showModal
      },
      set () {
        // just to prevent error log
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    handleSubmit () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          _this.showInfo()
        }
      })
    },
    showInfo () {
      const _this = this
      this.$confirm({
        title: i18nRender('table.dialog.confirm-msg'),
        okText: i18nRender('table.dialog.yes'),
        cancelText: i18nRender('table.dialog.no'),
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
        onOk () {
          console.log('OK')
          // TODO - api call
          _this.$message.success(i18nRender('table.dialog.work-shift-added'))
          _this.closeModal()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-modal-body {
    .ant-calendar-picker {
      width: 100%;
    }
  }
</style>
