<template>
  <div v-if="editSSSModal">

    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item :label="`${$t('table.column.sss-type')} :`">
        <a-input
          :maxLength="25"
          v-decorator="['sss_type', { rules: [{ required: true, message: 'SSS Type is required!' }] }]"
          placeholder="sss example"
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

      <EditableTable :columns="columns" :dataSource="model && model.salaryRanges" :editableColumns="editableCol">
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
      </EditableTable>
    </a-form>
  </div>
</template>

<script>
import pick from 'lodash.pick'
import EditableTable from '@/components/Table/EditableTable.vue'
import { i18nRender } from '@/locales'

const editableCol = ['salary_min_rage', 'salary_max_range', 'employer_contribution', 'employee_contribution', 'ec_contribution']
const columns = [
    {
        title: 'Salary Range',
        children: [
            {
                title: 'Min',
                dataIndex: 'salary_min_range',
                key: 'salary_min_range',
                width: '18%',
                scopedSlots: { customRender: 'salary_min_range' }
            },
             {
                title: 'Max',
                dataIndex: 'salary_max_range',
                key: 'salary_max_range',
                width: '18%',
                scopedSlots: { customRender: 'salary_max_range' }
            }
        ]
    },
    {
        title: 'Employer Contribution',
        dataIndex: 'employer_contribution',
        key: 'employer_contribution',
        scopedSlots: { customRender: 'employer_contribution' }
    },
    {
        title: 'Employee Contribution',
        dataIndex: 'employee_contribution',
        key: 'employee_contribution',
        scopedSlots: { customRender: 'employee_contribution' }
    },
    {
        title: 'EC Contribution',
        dataIndex: 'ec_contribution',
        key: 'ec_contribution',
        scopedSlots: { customRender: 'ec_contribution' }
    },
    {
        title: i18nRender('table.column.action'),
        dataIndex: 'action',
        width: '15%',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
]
const fields = ['sss_type', 'descriptions', 'salary_min_rage', 'salary_max_range', 'employer_contribution', 'employee_contribution', 'ec_contribution']
export default {
    name: 'EditSSSModal',
    data () {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),
            columns,
            editableCol
        }
    },
    created () {
      fields.forEach(v => this.form.getFieldDecorator(v))
      this.$watch('model', () => {
        this.model && this.form.setFieldsValue(pick(this.model, fields))
      })
    },
    components: { EditableTable },
    props: {
      model: {
        type: Object,
        default: () => null
      }
    },
    computed: {
        editSSSModal: {
            get () {
                return this.$store.state.modal.editSSSModal
            },
            set () {

            }
        }
    },
    methods: {
      closeModal () {
        this.$store.commit('modal/TOGGLE_EDIT_SSS_MODAL')
        this.form.resetFields()
      },
      handleSubmit () {
        alert('123')
        const _this = this
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            _this.showInfo()
          }
        })
      }
    },
    showInfo () {
      const _this = this
      this.$confirm({
        title: i18nRender('table.dialog.confirm-msg'),
        okText: i18nRender('table.dialog.yes'),
        cancelText: i18nRender('table.dialog.no'),
        onOk () {
          console.log('OK')
          _this.$message.success(i18nRender('table.dialog.leave-group-updated'))
          _this.closeModal()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
}
</script>
