<template>
  <div v-if="addSSSModal">
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
      <a-form-item :label="`${$t('table.column.sss-type')} :`">
        <a-input
          :maxLength="25"
          v-decorator="['sss_type', { rules: [{ required: true, message: $t('error.sss-type.required') }] }]"
          placeholder="sss example"
        />
      </a-form-item>
      <a-form-item :label="`${$t('table.column.descriptions')} :`">
        <a-input
          type="textarea"
          :maxLength="100"
          mode="tags"
          style="width: 100%"
          placeholder="Autoheight based on content lines="
          v-decorator="['descriptions']"
        >
        </a-input>
      </a-form-item>
      <EditableTable :columns="columns" :dataSource="dataSource" :editableColumns="editableCol" ref="editableTable">
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
import { i18nRender } from '@/locales'
import InfoCircle from '@/assets/info-circle.svg'
import EditableTable from '@/components/Table/EditableTable.vue'

const dataSource = []
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

export default {
    name: 'AddSSSModal',
    components: { EditableTable },
    data () {
        return {
          formLayout: 'horizontal',
          form: this.$form.createForm(this),
          editingKey: '',
          count: 0,
          columns,
          dataSource,
          emptyRecord: false,
          error: true,
          editableCol: [
              {
                dataIndex: 'salary_min_range',
                valueType: 'text',
                smallerThan: 'salary_max_range'
              },
              {
                dataIndex: 'salary_max_range',
                valueType: 'text'
              },
              {
                dataIndex: 'employer_contribution',
                valueType: 'text'
              },
              {
                dataIndex: 'employee_contribution',
                valueType: 'text'
              },
              {
                dataIndex: 'ec_contribution',
                valueType: 'text'
              }
          ]
        }
    },
    computed: {
      addSSSModal: {
        get () { return this.$store.state.modal.addSSSModal },
        set () {}
      }
    },
    methods: {
      closeModal () {
        this.$store.commit('modal/TOGGLE_ADD_SSS_MODAL')
        this.$emit('refreshTable')
        this.form.resetFields()
        this.dataSource = []
        this.emptyRecord = false
      },
      handleSubmit (result) {
        // validate required fields
        this.form.validateFields((err) => {
          if (err) {
            this.error = true
            } else { this.error = false }
        })
        // validate editable table
        if (!this.$refs.editableTable.validateTable()) {
          this.error = true
        } else { this.error = false }
        // if both validation has no error
        if (!this.error) {
          this.showInfo(result)
        }
      },
      showNotification () {
        this.$notification.open({
          message: this.$t('table.dialog.sss-added'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
      },
      showInfo (result) {
        const _this = this
        this.$confirm({
          title: i18nRender('table.dialog.confirm-msg'),
          okText: i18nRender('table.dialog.yes'),
          cancelText: i18nRender('table.dialog.no'),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
          async onOk () {
            const data = {
              sss_type: _this.form.getFieldValue('sss_type'),
              descriptions: _this.form.getFieldValue('descriptions'),
              items: result
            }
            try {
              await _this.$store.dispatch('api/setup/payroll/sss/addSSS', data)
              _this.showNotification()
              _this.closeModal()
               _this.dataSource = []
              _this.$emit('refreshTable')
            } catch (e) {
              _this.$message.error(e.response.data.message)
            }
          }
        })
      },
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.find(item => key === item.key)
        if (target) {
          target[column] = value
          this.data = newData
        }
      }
    }
  }
</script>

<style scoped>
.ant-table-row-cell-break-word >>> .ant-table-row-cell-last{
    text-align: center;
    align-items: center;
    border: 2px solid red;
}
.ant-table-row-cell-break-word{
    border: 2px solid red;
}
th{
    text-align: center;
}

.editable-row-operations a {
  margin-right: 8px;
}
.error{
  color: red;
}
</style>
