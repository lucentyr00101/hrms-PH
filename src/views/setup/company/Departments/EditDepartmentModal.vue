<template>
  <div>
    <a-modal
      :title="$t('table.dialog.edit-department')"
      :width="800"
      v-model="editDepartmentModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Department: ">
          <a-input
            :maxLength="25"
            v-decorator="['department', { rules: [{ required: true, message: ' Enter Department Name' }] }]"
            placeholder="example"
          >
          </a-input
          ></a-form-item>
        <a-form-item label="Descriptions:">
          <a-input
            :maxLength="100"
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autoheight based on content lines="
            v-decorator="['descriptions']"
          >
          </a-input
          ></a-form-item>
        <a-form-item label="Parent:">
          <a-tree-select
            v-decorator="['parent_id', { rules: [{ required: true, message: 'Parent department is required!' }] }]"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="departmentList"
            placeholder="Please select"
            tree-default-expand-all
            treeNodeLabelProp="label"
            :replaceFields="{title:'department', value: 'id'}"
          >
            <span slot="title" slot-scope="{ value }" style="color: #08c">
              Child Node1 {{ value }}
            </span>
          </a-tree-select>

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
import InfoCircle from '@/assets/info-circle.svg'

const fields = ['department', 'descriptions', 'parent']
export default {
  name: 'EditDepartmentModal',

  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  props: {
    departmentList: { type: Array,
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
    editDepartmentModal: {
      get () {
        return this.$store.state.modal.editDepartmentModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_EDIT_DEPARTMENT_MODAL')
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
          // TODO - api call
          _this.$message.success(i18nRender('table.dialog.department-updated'))
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
