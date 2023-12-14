<template>
  <div>
    <a-modal
      :title="$t('Edit Work Shift Type')"
      :width="800"
      v-model="EditWorkShiftSetupModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Work Shift Type: ">
          <a-input
            :maxLength="25"
            v-decorator="['workShiftType', { rules: [{ required: true, message: 'Work Shift Type is required!' }] }]"
            placeholder="example"
          >
          </a-input
          ></a-form-item>
        <a-form-item
          style="margin-bottom:0;"
          label="Work Time"
          :labelCol="{ span: 7, offset: 1}"
          :wrapperCol="{ span: 12, offset: 0}">
          <a-time-picker
            style="width: 44%"
            placeholder="Start Time"
            v-decorator="['starTime', { rules: [{ required: true, message: false }] }]"
          />
          <span :style="{ display: 'inline-block', width: '20px', textAlign: 'center'}">
            -
          </span>
          <a-form-item
            :style="{ display: 'inline-block' }"
          >
            <a-time-picker
              style="width: 100%"
              placeholder="End Time"
              v-decorator="['endTime', { rules: [{ required: true, message: false }] }]"
            />
          </a-form-item>
        </a-form-item>
        <!-- <a-form-item
          label="Work Time"
          :labelCol="{ span: 7, offset: 1}"
          :wrapperCol="{ span: 15, offset: 0}">
          <a-time-picker
            style="width: 37%"
            placeholder="Start Time"
            v-decorator="['starTime', { rules: [{ required: true, message: 'Start Time is required!' }] }]"
          />
          <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
            -
          </span>
          <a-time-picker
            style="width: 37%"
            placeholder="End Time"
            v-decorator="['endTime', { rules: [{ required: true, message: 'End Time is required!' }] }]"
          />
        </a-form-item> -->
        <a-form-item label="Remarks:">
          <a-input
            :maxLength="100"
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autosize height based on content lines="
            v-decorator="['remarks']"
          >
          </a-input
          ></a-form-item>
        <a-form-item label="Late Deduction by">
          <a-input
            style="width: 100%"
            placeholder="example"
          >
            <a-select
              slot="addonAfter"
              v-decorator="['late-deduction-by', { initialValue: 'hourly' }]"
              style="width: 100px"
            >
              <a-select-option value="hourly">
                hourly
              </a-select-option>
              <a-select-option value="minutes">
                minutes
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item label="Late Deduction Amount">
          <a-input
            type="number"
            v-decorator="['late-deduction-amount']"
            placeholder="example"
            addon-after="$"
          >
          </a-input>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="handleSubmit()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import pick from 'lodash.pick'
import { i18nRender } from '@/locales'

const fields = ['workShiftType', 'startTime', 'endTime', 'remarks']
export default {
  name: 'EditWorkShiftSetupModal',

  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      dp: this.data
    }
  },
  props: {
    data: { type: Array,
    default () {
      return null
      }
    },
    model: {
      type: Object,
      default: () => null
    }
  },

  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },

  computed: {
    EditWorkShiftSetupModal: {
      get () {
        return this.$store.state.modal.EditWorkShiftSetupModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_EDIT_WORK_SHIFT_SETUP_MODAL')
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
        onOk () {
          // TODO - api call
          _this.$message.success(i18nRender('table.dialog.work-shift-setup-updated'))
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

<style lang="less" scoped></style>
