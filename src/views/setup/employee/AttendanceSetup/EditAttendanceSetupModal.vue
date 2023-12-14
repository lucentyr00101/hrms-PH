<template>
  <div>
    <a-modal
      :title="$t('table.dialog.edit-attendance-type')"
      :width="800"
      v-model="editAttendanceSetupModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item :label="`${$t('table.column.role-name')}: `">
          <a-input
            :maxLength="25"
            v-decorator="['name', { rules: [{ required: true, message: `${$t('table.column.role-name')} ${$t('error.required')}` }] }]"
            placeholder="example"
          >
          </a-input
          ></a-form-item>
        <a-form-item :label="`${$t('table.column.descriptions')}: `">
          <a-textarea
            :maxLength="100"
            v-decorator="['descriptions', { rules: [{ message: `${$t('table.column.description')} ${$t('error.required')}` }] }]"
            placeholder="example"
          >
          </a-textarea
          ></a-form-item>
        <a-form-item :label="`${$t('table.column.status-name')}: `">
          <a-input
            :maxLength="25"
            placeholder="example"
            v-decorator="['statusName', { rules: [{ required: true, message: `${$t('table.column.status-name')} ${$t('error.required')}` }] }]"
          >
          </a-input>
        </a-form-item>
        <a-form-item :label="`${$t('table.column.colour')}: `">
          <a-select

            placeholder="Green"
            v-decorator="['colour', { rules: [{ required: true, message: `${$t('table.column.colour')} ${$t('error.required')}` }] }]"
          >
            <a-select-option value="1">Blue</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label="`${$t('table.column.sort')}: `">
          <a-input-number
            max="99"
            style="width:100%"
            v-decorator="['sort', { rules: [{ required: true, message: `${$t('table.column.sort')} ${$t('error.required')}` }] }]"
          >
          </a-input-number>
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
import pick from 'lodash.pick'
import InfoCircle from '@/assets/info-circle.svg'

const fields = ['name', 'descriptions', 'statusName', 'colour', 'sort']
export default {
  name: 'EditAttendanceSetupModal',
  props: {
     model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    editAttendanceSetupModal: {
      get () {
        return this.$store.state.modal.editAttendanceSetupModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_EDIT_ATTENDANCE_SETUP_MODAL')
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
          _this.$message.success(i18nRender('table.dialog.attendance-type-updated'))
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
