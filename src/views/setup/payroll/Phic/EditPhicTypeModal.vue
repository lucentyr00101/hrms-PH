<template>
  <div v-if="editPhicTypeModal">

    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item :label="`${$t('table.column.phic-type')} :`">
        <a-input
          :maxLength="25"
          v-decorator="['phic_type', { rules: [{ required: true, message: 'PHIC Type is required!' }] }]"
          placeholder="example"
        >
        </a-input
        ></a-form-item>
      <a-form-item :label="`${$t('table.column.descriptions')} :`">
        <a-input
          type="textarea"
          mode="tags"
          style="width: 100%"
          placeholder="Autoheight based on content lines="
          v-decorator="['descriptions']"
        >
        </a-input
        ></a-form-item>

      <editable-table :columns="columns" :dataSource="model && model.salaryRanges" :editableColumns="editableCol">
        <template v-slot="{isEditing, result}">
          <a-form-item :wrapperCol="{ span: 1, offset: 20 }">
            <div style="display:flex">
              <a-space>
                <a-button class="confirm-btn" type="secondary" @click="closeModal()" >{{
                  $t('table.dialog.cancel')
                }}</a-button>
                <a-button class="confirm-btn" type="primary" @click="handleSubmit(result)" :disabled="isEditing">{{
                  $t('table.dialog.confirm')
                }}</a-button>
              </a-space>
            </div>
          </a-form-item>
        </template>
      </editable-table>
    </a-form>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import pick from 'lodash.pick'
import EditableTable from '@/components/Table/EditableTable.vue'
const fields = ['phic_type', 'descriptions']
export default {
  components: { EditableTable },
  name: 'EditPayrollPhicTypeModal',
  props: {
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      // mock data

      editableCol: ['salary_min_range', 'salary_max_range', 'rate', 'min', 'max', 'employer_contribution_rate', 'employee_contribution_rate'],
      columns: [
        {
          title: i18nRender('table.column.salary-range'),
          children: [
            {
              title: i18nRender('table.column.min'),
              dataIndex: 'salary_min_range',
              scopedSlots: { customRender: 'salary_min_range' }
            },
            {
              title: i18nRender('table.column.max'),
              dataIndex: 'salary_max_range',
              scopedSlots: { customRender: 'salary_max_range' }
            }
          ]
        },
        {
          title: i18nRender('table.column.rate'),
          dataIndex: 'rate',
          scopedSlots: { customRender: 'rate' }
        },
        {
          title: i18nRender('table.column.min'),
          dataIndex: 'min',
          scopedSlots: { customRender: 'min' }
        },
        {
          title: i18nRender('table.column.max'),
          dataIndex: 'max',
          scopedSlots: { customRender: 'max' }
        },
        {
          title: i18nRender('table.column.employer-contribution-rate'),
          width: '15%',
          dataIndex: 'employer_contribution_rate',
          scopedSlots: { customRender: 'employer_contribution_rate' }
        },
        {
          title: i18nRender('table.column.employee-contribution-rate'),
          width: '15%',
          dataIndex: 'employee_contribution_rate',
          scopedSlots: { customRender: 'employee_contribution_rate' }
        },
        {
          title: i18nRender('table.column.action'),
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  computed: {
    editPhicTypeModal: {
      get () {
        return this.$store.state.modal.editPhicTypeModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  created () {
    fields.forEach(v => this.form.getFieldDecorator(v))
    this.$watch('model', () => {
      console.log(this.model)
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_EDIT_PHIC_TYPE_MODAL')
      this.form.resetFields()
      this.model.salaryRanges = []
    },
    handleSubmit (result) {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log({ ...values, phicData: result })
          _this.showInfo(values)
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
          _this.$message.success(i18nRender('table.dialog.phic-updated'))
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
