<template>
  <div>
    <a-modal
      :title="$t('table.dialog.add-attendance-lists')"
      :width="800"
      v-model="displayModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item :label="`${$t('table.column.employee')}:`">
          <a-select
            v-decorator="[
              'employee',
              { rules: [{ required: true, message: 'Please select an employee!' }] },
            ]"
            placeholder="Select"
          >
            <a-select-option value="1">Test</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('table.column.attendance-type')}:`">
          <a-select
            v-decorator="[
              'attendance-type',
              { rules: [{ required: true, message: 'Please select an attendance type!' }] },
            ]"
            placeholder="Select"
          >
            <a-select-option value="1">Test</a-select-option>
          </a-select>
        </a-form-item>
        <!-- <a-form-item :label="Date & Time">
          <a-date-picker
            format="YYYY-MM-DD HH:mm:ss"
            :disabled-date="disabledDate"
            :disabled-time="disabledDateTime"
            :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          />
        </a-form-item> -->
        <!-- Hi -->
        <!-- <a-form-item label="Date & Time: " >
          <a-date-picker
            :mode="mode1"
            show-time
            @openChange="handleOpenChange1"
            @panelChange="handlePanelChange1"
          />
        </a-form-item> -->

        <a-form-item
          :label="`${$t('table.column.date-and-time')}:`"
        >
          <a-date-picker
            style="width: 100%"
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="Select Time"
            v-decorator="['dateAndTime',{ rules: [{ required: true, message: 'Please select date & time!' }] },]"
          />
        </a-form-item>

        <a-form-item :label="`${$t('table.column.remarks')}:`">
          <a-input
            type="textarea"
            :rows="3"
            mode="tags"
            placeholder="Autosize height based on content lines="
            v-decorator="['remarks']"
          >
          </a-input
          ></a-form-item>

        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="handleSubmit()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form></a-modal>
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
      this.form.resetFields()
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
