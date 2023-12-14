<template>
  <a-card>
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; align-content: center">
      <a-space direction="vertical" :size="30" >

        <a-space direction="vertical" style="margin: 30px 0 0 80px" :size="40">
          <a-avatar :size="150" icon="user" :src="imageUrl" />
          <a-upload :beforeUpload="() => false" name="file" :multiple="false" @change="handleChange">
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
        </a-space>

        <a-space direction="vertical" size="large">
          <a-form :form="form" :label-col="{ span: 10 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
            <a-form-item :label="`${$t('table.column.employee-code')}:`">
              <a-input
                :maxLength="25"
                :disabled="true"
                v-decorator="['employee_number']"
                placeholder=""
                @change="handleInput"
              />
            </a-form-item>

            <a-form-item :label="`${$t('table.column.email')}:`">
              <a-input
                :maxLength="25"
                v-decorator="['email', {
                  rules: [
                    { required: true, message: `${$t('setup.employee.email')} ${$t('error.is-required')}` }
                  ]
                }]"
                placeholder="example"
                @change="handleInput"
              />
            </a-form-item>

            <a-form-item :label="`${$t('table.column.display-name')}:`">
              <a-input
                :maxLength="25"
                v-decorator="['display_name']"
                placeholder="example"
                @change="handleInput"
              />
            </a-form-item>
            <div style="display: flex; align-items: flex-end; flex-direction: column; margin-left: 200px">
              <a-form-item>
                <a-button :disabled="disableUpdate" class="confirm-btn" @click="handleSubmit()">{{ $t('table.dialog.update') }}</a-button>
              </a-form-item>

              <a-form-item >
                <a-button class="confirm-btn" type="primary" @click="handleResetPassword()">{{ $t('table.dialog.reset-password') }}</a-button>
              </a-form-item>
            </div>
          </a-form>
        </a-space>
      </a-space>

    </div>
    <ResetPasswordModal/>
  </a-card>
</template>

<script>
import ResetPasswordModal from './ResetPasswordModal.vue'
import { i18nRender } from '@/locales'
import InfoCircle from '@/assets/info-circle.svg'
import { employeeSetupMixin } from '@/store/app-mixin'
import { mapGetters } from 'vuex'
import { pick } from 'lodash'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const fields = ['employee_number', 'email', 'display_name']

export default {
  components: { ResetPasswordModal },
    name: 'Account',
    mixins: [employeeSetupMixin],
    data () {
        return {
          imageUrl: '',
          file: null,
          formLayout: 'vertical',
          form: this.$form.createForm(this),
          disableUpdate: true
        }
    },
    created () {
      this.setAccountUser()
      this.$watch('currentUser', () => {
        this.setAccountUser()
      })
    },
    computed: {
      ...mapGetters('api/auth', ['currentUser'])
    },
    methods: {
      setAccountUser () {
        this.imageUrl = this.currentUser?.employee_setup?.profile
        const employeeUser = this.currentUser?.employee_setup
        this.imageUrl = employeeUser?.profile
        const data = {
          employee_number: employeeUser?.employee_number,
          email: employeeUser?.email,
          display_name: employeeUser?.display_name || `${employeeUser?.employee_first_name}, ${employeeUser?.employee_last_name}`
        }
        fields.forEach(v => this.form.getFieldDecorator(v))
        this.form.setFieldsValue(pick(data, fields))
      },
      async handleChange (info) {
        if (info.fileList?.length) {
          this.disableUpdate = false
          this.file = info.file
          this.imageUrl = await getBase64(info.file)
        } else {
          this.disableUpdate = true
          this.file = null
          this.imageUrl = this.currentUser?.employee_setup?.profile
        }
      },
      handleSubmit () {
        const _this = this
        this.form.validateFields((err, values) => {
          if (!err) {
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
            _this.handleOk()
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      },
      async handleOk () {
        try {
          const data = {
            profile: this.file ? {
              filename: this.file.name,
              image: this.imageUrl
            } : undefined,
            email: this.form.getFieldValue('email'),
            display_name: this.form.getFieldValue('display_name')
          }
          await this.$store.dispatch('api/security/users/editAccount', data)
          await this.$store.dispatch('api/auth/fetchCurrentUser')
          this.$message.success(i18nRender('table.dialog.account-updated'))
          this.file = null
        } catch (e) {
          this.$message.error(e.response.data.message)
        }
      },
      handleResetPassword () {
        this.$store.commit('modal/TOGGLE_RESET_PASSWORD_MODAL')
      },
      handleInput (e) {
        if (e.target.value !== null || e.target.value !== '') {
          this.disableUpdate = false
        } else {
          this.disableUpdate = true
        }
      }
    }

}
</script>
