<template>
  <a-form :form="form" :label-col="{ span: 9 }">
    <a-row>
      <a-col :span="4" :style="{ textAlign: 'center' }">
        <a-space direction="vertical" size="large">
          <a-avatar width="40" icon="user" :src="imageUrl" />
          <a-upload name="profile" :fileList="fileList" v-decorator="['profile']" @change="handleChange">
            <a-button :disabled="disabled"> <a-icon type="upload" /> {{ $t('table.dialog.click-to-upload') }} </a-button>
          </a-upload>
        </a-space>
      </a-col>
      <a-col :span="10">
        <a-form-item :label="`${$t('setup.employee.employee-number')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="MPEJ1289128912"
            v-decorator="[
              'employee_number',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.employee-number')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.employee-last-name')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="employee last name"
            v-decorator="[
              'employee_last_name',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.employee-last-name')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.employee-first-name')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="employee first name"
            v-decorator="[
              'employee_first_name',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.employee-first-name')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.employee-middle-name')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="employee middle name"
            v-decorator="[
              'employee_middle_name',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.employee-middle-name')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.id-number')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="id number"
            v-decorator="[
              'id_number',
              {
                rules: [
                  { message: `${$t('setup.employee.id-number')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.email')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="100"
            :disabled="disabled"
            placeholder="email"
            v-decorator="[
              'email',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.email')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="`${$t('setup.employee.primary-contact')}: `"
          :wrapper-col="{ span: 14 }"
          extra="country code+mobile: 60175523033"
        >
          <a-input
            :maxLength="13"
            :disabled="disabled"
            placeholder="mobile number"
            v-decorator="[
              'primary_contact',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.primary-contact')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item
          :label="`${$t('setup.employee.secondary-contact')}: `"
          :wrapper-col="{ span: 14 }"
          extra="country code+mobile: 60175523033"
        >
          <a-input
            :maxLength="13"
            :disabled="disabled"
            placeholder="mobile number"
            v-decorator="['secondary_contact']"
          />
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item :label="`${$t('setup.employee.marital-status')}: `" :wrapper-col="{ span: 14 }">
          <a-select :disabled="disabled" placeholder="Select" v-decorator="['marital_status_id', { rules: [{required: true, message: `${$t('setup.employee.marital-status')} ${$t('error.is-required')}`}]}]">
            <a-select-option v-for="(maritalTypes, index) in maritalType" :key="index" :value="maritalTypes.id">{{ maritalTypes.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.nationality')}: `" :wrapper-col="{ span: 14 }">
          <a-select :disabled="disabled" placeholder="Select" v-decorator="['nationality_id', { rules: [{required: true, message: `${$t('setup.employee.nationality')} ${$t('error.is-required')}`}]}]">
            <a-select-option v-for="(nationalityTypes, index) in nationalityType" :key="index" :value="nationalityTypes.id">{{ nationalityTypes.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.gender')}: `" :wrapper-col="{ span: 14 }">
          <a-select :disabled="disabled" placeholder="Select" v-decorator="['gender_id', { rules: [{required: true, message: `${$t('setup.employee.gender')} ${$t('error.is-required')}`}]}]">
            <a-select-option v-for="(genderTypes, index) in genderType" :key="index" :value="genderTypes.id">{{ genderTypes.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.date-of-birth')}: `" :wrapper-col="{ span: 14 }">
          <a-date-picker
            v-decorator="['date_of_birth', { rules: [{ required: true, message: `${$t('setup.employee.date-of-birth')} ${$t('error.is-required')}` }] }]"
            :disabled="disabled"
            placeholder="Select date"
            :disabled-date="disabledDate"
            style="width:100%"
          >
          </a-date-picker>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.passport-number')}: `" :wrapper-col="{ span: 14 }">
          <a-input
            :maxLength="25"
            :disabled="disabled"
            placeholder="passport number"
            v-decorator="['passport_number']"
          />
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.passport-expiry-date')}: `" :wrapper-col="{ span: 14 }">
          <a-date-picker
            v-decorator="['passport_expiry_date']"
            :disabled="disabled"
            placeholder="Select date"
            style="width:100%"
          >
          </a-date-picker>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.highest-education')}: `" :wrapper-col="{ span: 14 }">
          <a-select :disabled="disabled" placeholder="Select" v-decorator="['highest_education_id', { rules: [{required: true, message: `${$t('setup.employee.highest-education')} ${$t('error.is-required')}`}]}]">
            <a-select-option v-for="(educationTypes, index) in educationType" :key="index" :value="educationTypes.id">{{ educationTypes.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="`${$t('setup.employee.address')}: `" :wrapper-col="{ span: 14 }">
          <a-textarea
            :maxLength="100"
            :disabled="disabled"
            placeholder="Autosize height based on content lines="
            v-decorator="[
              'address',
              {
                rules: [
                  { required: true, message: `${$t('setup.employee.address')} ${$t('error.is-required')}` }
                ],
              },
            ]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-card>
      <template slot="title" class="contact-list">{{ $t('setup.employee.emergency-contact') }}</template>
      <div>
        <employee-editable-table
          ref="editableTable1"
          :columns="emergencyContactColumns"
          :editableColumns="emergencyContactEditableColumns"
          v-model="emergencyResult"
          :disabled="disabled"
        />
      </div>
    </a-card>
    <a-card>
      <template slot="title" class="contact-list">{{ $t('setup.employee.list-of-dependant') }}</template>
      <div>
        <employee-editable-table
          ref="editableTable2"
          :columns="dependantsListColumns"
          :editableColumns="dependantsListEditableColumns"
          v-model="dependantResult"
          :disabled="disabled"
        />
      </div>
    </a-card>
    <div style="display: flex">
      <a-space style="margin-left: auto; margin-top: 8px">
        <a-button v-show="action === 'edit'" class="confirm-btn" type="secondary" @click="cancel()">{{
          $t('table.dialog.cancel')
        }}</a-button>
        <a-button class="confirm-btn" v-if="disabled" type="primary" @click="disabled = false">{{
          $t('table.dialog.edit')
        }}</a-button>
        <a-button class="confirm-btn" v-if="!disabled" type="primary" @click="showConfirm()">{{
          $t('table.dialog.confirm')
        }}</a-button>
      </a-space>
    </div>
  </a-form>
</template>

<script>
import EmployeeEditableTable from '@/components/Table/EmployeeEditableTable.vue'
import { i18nRender } from '@/locales'
import moment from 'moment'
import './employee.less'
import pick from 'lodash.pick'
import InfoCircle from '@/assets/info-circle.svg'
import { type } from '@/api/dictionary'
import { employeeSetupMixin } from '@/store/app-mixin'

const emergencyContactColumns = [
  {
    title: '#',
    dataIndex: 'index',
    scopedSlots: { customRender: 'index' }
  },
  {
    title: i18nRender('setup.employee.name'),
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: i18nRender('setup.employee.contact-number'),
    dataIndex: 'contact_number',
    scopedSlots: { customRender: 'contact_number' }
  },
  {
    title: i18nRender('setup.employee.relation'),
    dataIndex: 'relation',
    scopedSlots: { customRender: 'relation' }
  },
  {
    title: i18nRender('setup.employee.action'),
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const dependantsListColumns = [
  {
    title: '#',
    dataIndex: 'index',
    scopedSlots: { customRender: 'index' }
  },
  {
    title: i18nRender('setup.employee.name'),
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: i18nRender('setup.employee.dob'),
    dataIndex: 'date_of_birth',
    scopedSlots: { customRender: 'date_of_birth' }
  },
  {
    title: i18nRender('setup.employee.relation'),
    dataIndex: 'relation',
    scopedSlots: { customRender: 'relation' }
  },
  {
    title: i18nRender('setup.employee.action'),
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const fields = ['employee_number', 'employee_last_name', 'employee_first_name', 'employee_middle_name', 'id_number', 'email', 'primary_contact', 'secondary_contact', 'marital_status_id', 'nationality_id', 'gender_id', 'date_of_birth', 'passport_number', 'passport_expiry_date', 'highest_education_id', 'address']
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  components: { EmployeeEditableTable },
  name: 'EmployeeInformation',
  mixins: [employeeSetupMixin],
  data () {
    return {
      image: null,
      imageUrl: '',
      fileList: [],
      form: this.$form.createForm(this, { name: 'employeeInformation' }),
      emergencyContactColumns,
      dependantsListColumns,
      dependantResult: [],
      emergencyResult: [],
      emergencyContactEditableColumns: [
        {
          dataIndex: 'name',
          valueType: 'text'
        },
        {
          dataIndex: 'contact_number',
          valueType: 'text'
        },
        {
          dataIndex: 'relation',
          valueType: 'text'
        }
      ],
      dependantsListEditableColumns: [
        {
          dataIndex: 'name',
          valueType: 'text'
        },
        {
          dataIndex: 'date_of_birth',
          valueType: 'date'
        },
        {
          dataIndex: 'relation',
          valueType: 'text'
        }
      ],
      disabled: false,
      data: null,
      cacheData: null,
      maritalType: [],
      nationalityType: [],
      genderType: [],
      educationType: [],
      error1: true,
      error2: true,
      error3: true,
      employeeId: null,
      action: 'add'
    }
  },
  async created () {
    if (this.$route.params.id) {
      this.disabled = true
      this.action = 'edit'
      this.employeeId = this.$route.params.id
      this.getEmployeeSetup(this.$route.params.id).then(res => {
        this.cacheData = JSON.parse(JSON.stringify(res))
        this.imageUrl = res.profile
        this.emergencyResult = res.emergency_contacts.map((item) => ({ ...item }))
        this.dependantResult = res.dependents.map((item) => ({ ...item }))
        this.form.setFieldsValue(pick(res, fields))
      })
    }
    this.maritalType = await this.$store.dispatch('api/setup/dictionary/getDropdownValues', type.MARITAL)
    this.nationalityType = await this.$store.dispatch('api/setup/dictionary/getDropdownValues', type.NATIONALITY)
    this.genderType = await this.$store.dispatch('api/setup/dictionary/getDropdownValues', type.GENDER)
    this.educationType = await this.$store.dispatch('api/setup/dictionary/getDropdownValues', type.EDUCATION)
  },
  methods: {
    handleChange (info) {
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.imageUrl = imageUrl
        this.image = { image: imageUrl, filename: info.file.originFileObj.name }
      })
      // use this when upload image to server
      //   if (info.file.status === 'uploading') {
      //     this.loading = true
      //     return
      //   }
      //   if (info.file.status === 'done') {
      //     // Get this url from response in real world.
      //   }
    },
    cancel () {
      if (this.action === 'edit' && !this.disabled) {
        this.disabled = true
        // reset the value back to original
        this.imageUrl = this.cacheData.profile
        this.emergencyResult = this.cacheData.emergency_contacts.map((item) => ({ ...item }))
        this.dependantResult = this.cacheData.dependents.map((item) => ({ ...item }))
        this.form.setFieldsValue(pick(this.cacheData, fields))
      } else {
        this.$multiTab.closeCurrentPage()
        this.$router.push({ name: 'setup-employee-employee-setup' })
      }
    },
    disabledDate (current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day')
    },
    showConfirm () {
      this.form.validateFields((err) => {
        if (err) {
          this.error1 = true
        } else {
          this.error1 = false
        }
      })
      // validate editable table
      if (!this.$refs.editableTable1.validateTableEmpty()) {
        this.error2 = true
      } else {
        this.error2 = false
      }
      if (!this.$refs.editableTable2.validateTableEmpty()) {
        this.error3 = true
      } else {
        this.error3 = false
      }
      // if both validation has no error
      if (!this.error1 && !this.error2 && !this.error3) {
        this.$confirm({
          centered: true,
          title: i18nRender('save.confirm'),
          okText: i18nRender('table.dialog.yes'),
          cancelText: i18nRender('table.dialog.no'),
          onOk: () => this.handleSubmit(),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
        })
      }
    },
    handleSubmit () {
      try {
        this.loading = true
        const emergency = this.emergencyResult.map(item => {
          return { key: item.key, name: item.name, contact_number: item.contact_number, relation: item.relation }
        })
        const dependents = this.dependantResult.map(item => {
          return { key: item.key, name: item.name, date_of_birth: item.date_of_birth, relation: item.relation }
        })
        const formData = new FormData()
        if (this.image !== null) formData.append('profile', JSON.stringify(this.image))
        formData.append('employee_number', this.form.getFieldValue('employee_number'))
        formData.append('employee_last_name', this.form.getFieldValue('employee_last_name'))
        formData.append('employee_first_name', this.form.getFieldValue('employee_first_name'))
        formData.append('employee_middle_name', this.form.getFieldValue('employee_middle_name'))
        formData.append('id_number', this.form.getFieldValue('id_number') !== undefined ? this.form.getFieldValue('id_number') : null)
        formData.append('email', this.form.getFieldValue('email'))
        formData.append('primary_contact', this.form.getFieldValue('primary_contact'))
        formData.append('secondary_contact', this.form.getFieldValue('secondary_contact') !== undefined ? this.form.getFieldValue('secondary_contact') : null)
        formData.append('marital_status_id', this.form.getFieldValue('marital_status_id'))
        formData.append('nationality_id', this.form.getFieldValue('nationality_id'))
        formData.append('gender_id', this.form.getFieldValue('gender_id'))
        formData.append('date_of_birth', moment(this.form.getFieldValue('date_of_birth')).format('YYYY-MM-DD').toString())
        formData.append('passport_number', this.form.getFieldValue('passport_number') !== undefined ? this.form.getFieldValue('passport_number') : null)
        formData.append('passport_expiry_date', this.form.getFieldValue('passport_expiry_date') !== undefined ? moment(this.form.getFieldValue('passport_expiry_date')).format('YYYY-MM-DD').toString() : null)
        formData.append('highest_education_id', this.form.getFieldValue('highest_education_id'))
        formData.append('address', this.form.getFieldValue('address'))
        formData.append('emergency_contacts', JSON.stringify(emergency))
        formData.append('dependents', JSON.stringify(dependents))
        this.cacheData = {
          profile: this.imageUrl,
          employee_number: this.form.getFieldValue('employee_number'),
          employee_last_name: this.form.getFieldValue('employee_last_name'),
          employee_first_name: this.form.getFieldValue('employee_first_name'),
          employee_middle_name: this.form.getFieldValue('employee_middle_name'),
          id_number: this.form.getFieldValue('id_number'),
          email: this.form.getFieldValue('email'),
          primary_contact: this.form.getFieldValue('primary_contact'),
          secondary_contact: this.form.getFieldValue('secondary_contact'),
          marital_status_id: this.form.getFieldValue('marital_status_id'),
          nationality_id: this.form.getFieldValue('nationality_id'),
          gender_id: this.form.getFieldValue('gender_id'),
          date_of_birth: this.form.getFieldValue('date_of_birth'),
          passport_number: this.form.getFieldValue('passport_number'),
          passport_expiry_date: this.form.getFieldValue('passport_expiry_date'),
          highest_education_id: this.form.getFieldValue('highest_education_id'),
          address: this.form.getFieldValue('address'),
          emergency_contacts: emergency,
          dependents: dependents
        }
        if (this.action === 'add') {
          this.$store.dispatch('api/setup/employee/employeeSetup/addEmployee', formData)
          .then((res) => {
            this.employeeId = res.identifiers[0].id
            this.$notification.open({
              message: i18nRender('setup.employee.employee-information-added'),
              icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            })
            this.action = 'edit'
            this.disabled = true

            this.$router.push({ name: 'setup-employee-employee-setup-view-employee-information', params: { id: this.employeeId } })
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        } else {
          this.$store.dispatch('api/setup/employee/employeeSetup/editEmployee', { id: this.employeeId, data: formData })
          .then((res) => {
            this.$notification.open({
              message: i18nRender('setup.employee.employee-information-updated'),
              icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            })
            this.disabled = true
          }).catch(err => {
            this.$message.error(err.response.data.message)
          })
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.ant-avatar {
  width: 125px;
  height: 125px;
}
.ant-avatar.ant-avatar-icon {
  font-size: 70px;
  line-height: unset;
}
.ant-row .ant-form-item {
  margin-bottom: 18px;
}
.ant-row >>> .ant-upload-list-item-name {
  white-space: inherit;
}
.ant-card {
  border-radius: 2px;
}
</style>
