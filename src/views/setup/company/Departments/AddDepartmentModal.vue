<template>
  <div>
    <a-modal
      :title="$t('table.dialog.add-department')"
      :width="800"
      v-model="addDepartmentModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Department: ">
          <a-input
            :maxLength="25"
            v-decorator="['department', { rules: [{ required: true, message: $t('error.department-name.required') }] }]"
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
          <a-spin :spinning="loading">
            <a-tree-select
              v-decorator="['parent_id', { rules: [{ required: true, message: $t('error.parent.required') }] }]"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="treeData"
              placeholder="Please select"
              tree-default-expand-all
              :replaceFields="{title:'departmentName', value: 'id'}"
            />
          </a-spin>
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
import InfoCircle from '@/assets/info-circle.svg'

export default {
  name: 'AddDepartmentModal',
  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      treeData: [],
      loading: false
    }
  },
  watch: {
    async addDepartmentModal (visible) {
      if (visible) {
        this.loading = true
        const { items } = await this.$store.dispatch('api/setup/company/department/fetchList', { page_type: 'all' })
        const wrapper = {
          parent_id: null,
          id: 'Top',
          children: items,
          department: 'Top'
        }
        this.treeData = this.setTreeData([wrapper])
        console.log(wrapper)
        console.log(this.treeData)
        this.loading = false
      }
    }
  },
  computed: {
    addDepartmentModal: {
      get () {
        return this.$store.state.modal.addDepartmentModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    setTreeData (children) {
      return children.reduce((list, department) => {
        const data = {
          ...department,
          label: department.department,
          children: department.children?.length > 0 ? this.setTreeData(department.children) : []
        }
        list.push(data)
        return list
      }, [])
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_DEPARTMENT_MODAL')
      this.form.resetFields()
    },
    handleSubmit () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          _this.showInfo(values)
        }
      })
    },
    showNotif () {
      this.$notification.open({
        message: this.$t('table.dialog.department-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showInfo (values) {
      const _this = this
      this.$confirm({
        title: _this.$t('table.dialog.confirm-msg'),
        okText: _this.$t('table.dialog.yes'),
        cancelText: _this.$t('table.dialog.no'),
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
        async onOk () {
          if (!values.parent_id) {
            delete values.parent_id
          }
          try {
            await _this.$store.dispatch('api/setup/company/department/add', values)
            _this.$emit('refreshTable')
            _this.showNotif()
            _this.closeModal()
          } catch (e) {
            _this.$message.error(e.response.data.message)
          }
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
