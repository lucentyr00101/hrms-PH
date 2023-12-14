<template>
  <div>
    <a-modal
      :title="$t('table.dialog.edit')"
      :width="800"
      v-model="editAttendanceModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">

        <a-form-item :label="this.$t('table.column.work-time-durations')" >
          <div>{{ model && model.workTimeDurations }}</div>
        </a-form-item>
        <a-form-item :label="this.$t('table.column.oTHours')">
          <div>{{ model && model.oTHours }}</div>
        </a-form-item>

        <a-form-item :label="this.$t('table.column.final-attendance-type')">
          <a-input
            style="width: 100%"
            placeholder="example"
          >
            <a-select default-value="1" style="width: 120px">
              <a-select-option value="1">
                type1
              </a-select-option>
              <a-select-option value="2">
                type2
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>

        <a-form-item :label="this.$t('table.column.final-work-time-durations')" :help="this.$t('table.help.rejected-ot-hours-will-convert-to-offset-balances')">
          <a-time-picker
            style="width: 100%"
            use12-hours
          />
        </a-form-item>
        <a-form-item :label="this.$t('table.column.use-offset-balance')" :help="this.$t('table.help.untick-to-proceed-with-late-deduction')">
          <a-checkbox @change="onChange">
            <strong>Yes</strong>
          </a-checkbox><br />
        </a-form-item>

        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="handleSubmit()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form></a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import pick from 'lodash.pick'
import { i18nRender } from '@/locales'

const fields = ['workTimeDurations', 'oTHours']
export default {
  name: 'EditAttendanceModal',

  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  props: {
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
    editAttendanceModal: {
      get () {
        return this.$store.state.modal.editAttendanceModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    onChange (e) {
      console.log(`checked = ${e.target.checked}`)
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_EDIT_ATTENDANCE_MODAL')
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
          _this.$message.success(i18nRender('table.dialog.attendance-updated'))
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
