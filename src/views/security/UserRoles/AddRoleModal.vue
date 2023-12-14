<template>
  <div>
    <a-modal
      :title="$t('table.dialog.add-user-role')"
      :maskClosable="false"
      :width="800"
      destroyOnClose
      v-model="addRoleModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item :label="`${$t('table.column.role-name')}: `">
          <a-input
            :maxLength="25"
            v-decorator="['name', { rules: [{ required: true, message: 'Roles Name is required.' }] }]"
            placeholder="example"
          >
          </a-input
          ></a-form-item>
        <a-form-item :label="`${$t('table.column.remark')}: `">
          <a-textarea
            :auto-size="{ minRows: 2, maxRows: 6 }"
            :maxlength="100"
            style="width: 100%"
            placeholder="Autoheight based on content lines="
            v-decorator="['remark']"
          />
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
import { colors } from '@/config/color-map'
import InfoCircle from '@/assets/info-circle.svg'

export default {
  name: 'AddRoleModal',

  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    addRoleModal: {
      get () {
        return this.$store.state.modal.addRoleModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_ROLE_MODAL')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => !err && this.showInfo())
    },
    showNotification () {
      this.$notification.open({
        message: i18nRender('table.dialog.user-role-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showInfo () {
      const _this = this
      this.$confirm({
        title: i18nRender('table.dialog.confirm-msg'),
        okText: i18nRender('table.dialog.yes'),
        cancelText: i18nRender('table.dialog.no'),
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
        async onOk () {
          const data = {
            name: _this.form.getFieldValue('name'),
            remarks: _this.form.getFieldValue('remark'),
            color: colors[Math.floor(Math.random() * colors.length)]
          }
          try {
            await _this.$store.dispatch('api/security/roles/addRole', data)
            _this.showNotification()
            _this.closeModal()
            _this.$emit('refreshTable')
          } catch (e) {
            _this.$message.error(e.response.data.message)
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
