<template>
  <div v-if="addPhicTypeModal">

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
        </a-input>
      </a-form-item>
      <editable-table :columns="columns" :dataSource="dataSource" :editableColumns="editableCol" ref="editableTable">
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
import EditableTable from '@/components/Table/EditableTable.vue'
import InfoCircle from '@/assets/info-circle.svg'

export default {
  components: { EditableTable },
  name: 'AddPayrollPhicTypeModal',

  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      // mock data
      dataSource: [],
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
          dataIndex: 'rate',
          valueType: 'text'
        },
        {
          dataIndex: 'min',
          valueType: 'text'
        },
            {
          dataIndex: 'max',
          valueType: 'text'
        },
        {
          dataIndex: 'employer_contribution_rate',
          valueType: 'text'
        },
        {
          dataIndex: 'employee_contribution_rate',
          valueType: 'text'
        }
      ],
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
    addPhicTypeModal: {
      get () {
        return this.$store.state.modal.addPhicTypeModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }

  },
  methods: {
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_PHIC_TYPE_MODAL')
      // reset form and modal
      this.form.resetFields()
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
        message: this.$t('table.dialog.phic-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showInfo (result) {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$confirm({
            title: i18nRender('table.dialog.confirm-msg'),
            okText: i18nRender('table.dialog.yes'),
            cancelText: i18nRender('table.dialog.no'),
            icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
            async onOk () {
              const data = {
                phic_type: _this.form.getFieldValue('phic_type'),
                descriptions: _this.form.getFieldValue('descriptions') || '',
                items: result
              }
              try {
                await _this.$store.dispatch('api/setup/payroll/phic/addPHIC', data)
                _this.showNotification()
                _this.closeModal()
                _this.$emit('refreshTable')
              } catch (e) {
                _this.$message.error(e.response.data.message)
              }
            },
            onCancel () {
              console.log('Cancel')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
