<template>
  <div>
    <a-modal
      centered
      :width="800"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      :visible="addLeaveGroupModal"
      :destroyOnClose="true"
      :title="action2 === 'edit' ? $t('table.dialog.edit-leave-group') : $t('table.dialog.add-leave-group')"
      :confirm-loading="loading"
      @cancel="closeModal"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" class="custom-ant-form-item">
        <a-form-item label="Leave Group: ">
          <a-input
            :maxLength="25"
            v-decorator="[
              'leaveGroup',
              {
                rules: [
                  { required: true, message: $t('error.leave-group.required') }
                ]
              }
            ]"
            placeholder="example"
          >
          </a-input>
        </a-form-item>
        <a-form-item label="Descriptions:">
          <a-input
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autoheight based on content lines="
            v-decorator="['descriptions']"
            maxLength="100"
          >
          </a-input>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="showConfirm()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import { mapGetters } from 'vuex'
import InfoCircle from '@/assets/info-circle.svg'

export default {
  name: 'LeaveGroup',
  props: {
    currentRow: {
      type: Object,
      default: () => null
    },
    action: {
      type: String,
      default: () => null
    }
  },
  data () {
    return {
      loading: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'addLeaveGroup' })
    }
  },
  computed: {
    ...mapGetters('modal', ['addLeaveGroupModal']),
    action2: {
      get () {
          return this.action
      },
      set () {
          // just to prevent error
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_LEAVE_GROUP_MODAL')
      this.form.resetFields()
    },
    async showConfirm () {
      try {
        await this.form.validateFields()
        this.$confirm({
          centered: true,
          title: i18nRender('save.confirm'),
          okText: i18nRender('table.dialog.yes'),
          cancelText: i18nRender('table.dialog.no'),
          onOk: () => this.handleSubmit(),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
        })
      } catch (e) {}
    },
    async handleSubmit () {
      try {
        this.loading = true
        if (this.action === 'add') {
          const data = {
            leave_group: this.form.getFieldValue('leaveGroup'),
            descriptions: this.form.getFieldValue('descriptions')
          }
          try {
            await this.$store.dispatch('api/setup/company/leaveGroup/addLeaveGroup', data)
            this.$notification.open({
              message: i18nRender('notification.leave-group.added'),
              icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            })
            this.closeModal()
            this.$emit('refreshTable')
          } catch (e) {
            this.$message.error(e.response.data.message)
          }
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style>
  .custom-ant-form-item .ant-col-12 {
    width: 53%;
  }
</style>
