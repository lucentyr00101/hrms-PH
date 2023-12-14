<template>
  <a-card>
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="TAX Type: ">
        <a-input
          :maxLength="25"
          v-decorator="['tax_type', { rules: [{ required: true, message: $t('error.tax-type.required') }] }]"
          placeholder="example"
        >
        </a-input>
      </a-form-item>
      <a-form-item label="Descriptions:">
        <a-input
          :maxLength="100"
          type="textarea"
          mode="tags"
          style="width: 100%"
          placeholder="Autoheight based on content lines="
          v-decorator="['descriptions']"
        >
        </a-input>
      </a-form-item>
    </a-form>

    <editable-table :columns="columns" :dataSource="data" :editableColumns="editableCol" rowKey="" ref="editableTable">
      <template v-slot="{ isEditing, result }">
        <a-form-item :wrapperCol="{ span: 1, offset: 20 }">
          <div style="display: flex">
            <a-space>
              <a-button class="confirm-btn" type="secondary" @click="handleCancel">{{
                $t('table.dialog.cancel')
              }}</a-button>
              <a-button class="confirm-btn" type="primary" @click="showConfirm(result)" :disabled="isEditing">{{
                $t('table.dialog.confirm')
              }}</a-button>
            </a-space>
          </div>
        </a-form-item>
      </template>
    </editable-table>
  </a-card>
</template>

<script>
import { i18nRender } from '@/locales'
import pick from 'lodash.pick'
import InfoCircle from '@/assets/info-circle.svg'
import EditableTable from '@/components/Table/EditableTable.vue'

const fields = ['tax_type', 'descriptions']

export default {
  components: { EditableTable },
  name: 'ViewTax',
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      taxLoading: false,
      editableCol: [
        {
          dataIndex: 'salary_min_range',
          key: 'salary_min_range',
          valueType: 'text',
          smallerThan: 'salary_max_range'
        },
        {
          dataIndex: 'salary_max_range',
          key: 'salary_max_range',
          valueType: 'text'
        },
        {
          dataIndex: 'base_tax_amount',
          key: 'base_tax_amount',
          valueType: 'text'
        },
        {
          dataIndex: 'tax_rate',
          key: 'tax_rate',
          valueType: 'percent'
        }
      ],
      columns: [
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
          title: 'Base Tax Amount',
          dataIndex: 'base_tax_amount',
          key: 'base_tax_amount',
          scopedSlots: { customRender: 'base_tax_amount' }
        },
        {
          title: 'Tax Rate',
          dataIndex: 'tax_rate',
          key: 'tax_rate',
          scopedSlots: { customRender: 'tax_rate' }
        },
        {
          title: 'Action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: this.taxVal.taxDetails || [],
      count: 0
    }
  },
  props: {
    taxVal: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    closeTaxView () {
      console.log('closeTaxView')
      this.$store.commit('modal/TOGGLE_SETUP_PAYROLL_TIN_VIEW')
      this.form.resetFields()
    },
    handleCancel () {
      this.closeTaxView()
    },
    async showConfirm (result) {
      try {
        this.form.validateFields((err, values) => {
          if (this.$refs.editableTable.validateTable() && !err) {
            this.$confirm({
              centered: true,
              title: i18nRender('save.confirm'),
              okText: i18nRender('table.dialog.yes'),
              cancelText: i18nRender('table.dialog.no'),
              onOk: () => this.handleSubmit(result),
              icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
            })
          }
        })
      } catch (e) {}
    },
    async handleSubmit (result) {
      try {
        this.loading = true
        const data = {
          tax_type: this.form.getFieldValue('tax_type'),
          descriptions: this.form.getFieldValue('descriptions'),
          items: result
        }
        try {
          await this.$store.dispatch('api/setup/payroll/tax/addTax', data)
          this.closeTaxView()
          this.$notification.open({
            message: i18nRender('notification.tax.added'),
            icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
          })
        } catch (e) {
          this.$message.error(e.response.data.message)
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  },
  created () {
    fields.forEach((v) => this.form.getFieldDecorator(v))
    this.taxVal && this.form.setFieldsValue(pick(this.taxVal, fields))
  }
}
</script>

<style>
  .tax-view-table .ant-table-thead > tr > th .ant-table-header-column {
    text-align: center;
    display: unset !important;
  }
  .error {
    color: red;
  }
  .tax_rate {
    text-align: center;
  }
</style>
