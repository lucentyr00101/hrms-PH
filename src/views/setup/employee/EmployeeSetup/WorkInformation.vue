<template>
  <div>
    <FillEmployee :employeeId="employeeId" />
    <a-row>
      <a-form :form="form" :label-col="{ span: 9 }">
        <a-col :span="12">
          <a-form-item :label="`${$t('setup.employee.department')}: `" :wrapper-col="{ span: 14 }">
            <a-select
              :options="dropdownDepartment"
              v-decorator="['department_id', { rules: [{ required: true, message: 'Department is required.' }] }]"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
            </a-select>
          </a-form-item>

          <a-form-item :label="`${$t('setup.employee.supervisor')}: `" :wrapper-col="{ span: 14 }">
            <a-select
              :options="dropdownImmediateSupervisor"
              v-decorator="['immediate_supervisor_id']"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
            </a-select>
          </a-form-item>

          <a-form-item :label="`${$t('setup.employee.leave-group')}: `" :wrapper-col="{ span: 14 }">
            <a-select
              :options="dropdownLeaveGroup"
              v-decorator="['leave_group_id', { rules: [{ required: true, message: 'Leave Group is required.' }] }]"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
            </a-select>
          </a-form-item>

          <a-form-item :label="`${$t('setup.employee.claim-group')}: `" :wrapper-col="{ span: 14 }">
            <a-select
              v-decorator="['claim_group_id']"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
              <a-select-option value="cg1">Claim Group 01</a-select-option>
              <a-select-option value="cg2">Claim Group 02</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="`${$t('setup.employee.regularization-date')}: `" :wrapper-col="{ span: 14 }">
            <a-date-picker
              :style="{width: '100%'}"
              v-decorator="['regularization_date']"
              placeholder="Select Date"
              :disabled="disabled"
              @change="handleSelectChange"
            >
            </a-date-picker>
          </a-form-item>

          <a-form-item
            :label="`${$t('setup.employee.attachment')}`"
            :wrapper-col="{ span: 14 }"
            extra="Resume, Certificates, ID etc."
          >
            <a-space direction="vertical" size="large">
              <a-upload
                name="file"
                :multiple="true"
                :file-list="attachments"
                @change="handleChange"
                v-decorator="['attachments']"
                :disabled="disabled"
                :beforeUpload="() => false"
              >
                <div v-if="attachments.length < 20">
                  <a-button class="upload-btn" type="dashed">
                    <a-icon type="plus" style="margin-bottom: 10px"/>
                    {{ $t('table.dialog.upload') }}
                  </a-button>
                </div>
              </a-upload>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item :label="`${$t('setup.employee.status')}: `" :wrapper-col="{ span: 14 }">
            <a-select
              v-decorator="['status_id', { rules: [{ required: true, message: 'Status is required.' }] }]"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
              <a-select-option value="Active-Casual"> Active-Casual </a-select-option>
              <a-select-option value="Active-Probationary"> Active-Probationary </a-select-option>
              <a-select-option value="Active-Regular"> Active-Regular </a-select-option>
              <a-select-option value="Resigned-Casual"> Resigned-Casual </a-select-option>
              <a-select-option value="Resigned-Probationary"> Resigned-Probationary </a-select-option>
              <a-select-option value="Resigned-Regular"> Resigned-Regular </a-select-option>
            </a-select>
          </a-form-item>
          <!-- <= 99 from api -->
          <a-form-item :label="`${$t('setup.employee.probation-months')}: `" :wrapper-col="{ span: 14 }">
            <a-input-number
              :max="99"
              v-decorator="['probation_months', { rules: [{ required: true, message: 'Probation Months is required.' }, {validator: validate}] }]"
              placeholder="Enter"
              :style="{width: '100%', height:'44px', paddingTop: '5px'}"
              :disabled="disabled"
              @change="handleSelectChange"
            /></a-form-item>

          <a-form-item :label="`${$t('setup.employee.join-date')}: `" :wrapper-col="{ span: 14 }">
            <a-date-picker
              :style="{width: '100%'}"
              v-decorator="['join_date', { rules: [{ required: true, message: 'Join Date is required.' }] }]"
              placeholder="Select Date"
              :disabled="disabled"
              @change="onStartDateChange"
            >
            </a-date-picker>
          </a-form-item>

          <a-form-item :label="`${$t('setup.employee.resign-date')}: `" :wrapper-col="{ span: 14 }">
            <a-date-picker
              :style="{width: '100%'}"
              v-decorator="['resign_date']"
              placeholder="Select Date"
              :disabled="disabled"
              @change="onEndDateChange"
            >
            </a-date-picker>
          </a-form-item>
          <a-form-item :label="`${$t('setup.employee.tenure')}: `" :wrapper-col="{ span: 14 }">
            <a-input-number
              :readonly="true"
              :formatter="value => `${value} months`"
              :style="{width: '100%'}"
              v-decorator="['tenure']"
              placeholder="Enter"
              :disabled="disabled"
              @change="handleSelectChange"
            />
          </a-form-item>
          <a-form-item :label="`${$t('setup.employee.calendar')}: `" :wrapper-col="{ span: 14 }" style="margin-top: 50px">
            <a-select
              v-decorator="['calendar_id', { rules: [{ required: true, message: 'Calendar is required.' }] }]"
              placeholder="Select"
              :disabled="disabled"
              @change="handleSelectChange"
            >
              <a-select-option value="calendar1"> Calendar 1 </a-select-option>
              <a-select-option value="calendar2"> Calendar 2 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-form>
    </a-row>
    <div style="display: flex">
      <a-space style="margin-left: auto; margin-top: 8px">
        <a-button v-show="disabled" class="confirm-btn" :disabled="disabled" type="secondary" @click="cancel()">{{
          $t('table.dialog.cancel')
        }}</a-button>
        <a-button class="confirm-btn" v-if="disabled" type="primary" @click="disabled = false">{{
          $t('table.dialog.edit')
        }}</a-button>
        <a-button class="confirm-btn" v-if="!disabled" type="primary" @click="e => handleSubmit(e)">{{
          $t('table.dialog.confirm')
        }}</a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import FillEmployee from '@/components/Setup/Employee/EmployeeSetup/FillEmployee.vue'
import { i18nRender } from '@/locales'
import moment from 'moment'
import InfoCircle from '@/assets/info-circle.svg'
import { employeeSetupMixin } from '@/store/app-mixin'
import { mapGetters } from 'vuex'
import pick from 'lodash.pick'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const fields = ['status_id', 'department_id', 'calendar_id', 'leave_group_id', 'claim_group_id', 'immediate_supervisor_id', 'probation_months', 'join_date', 'resign_date', 'tenure', 'regularization_date']
console.log(fields)
export default {
  name: 'WorkInformation',
  mixins: [employeeSetupMixin],
  props: {
    // status: { type: String, default: '' }
    editable: { type: Boolean, default: null }
  },
  computed: {
    ...mapGetters('api/setup/employee/employeeSetup', ['employee']),

    checkWorkInfo () {
      const employeeWorkInfo = this.employee.employee_setup_work_info
      return employeeWorkInfo
    }
  },
  components: {
    FillEmployee
  },
  data () {
    console.log('this', this.editable)
    return {
      monthyes: null,
      try: null,
      month: null,
      formattedJoinDate: null,
      formattedCurrentDate: null,
      currentDate: null,
      image: null,
      imageUrl: '',
      attachments: [],
      form: this.$form.createForm(this, { name: 'employeeInformation' }),
      startDate: null,
      endDate: null,
      disabled: this.editable,
      employeeId: this.$route.params.id,
      dropdownDepartment: [],
      dropdownImmediateSupervisor: [],
      dropdownLeaveGroup: [],
      loadDepartmentType: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/workInformation/dropdownDepartment')
          data.forEach((item) => {
          // console.log('data', item.department)
          this.dropdownDepartment = [...this.dropdownDepartment, {
            value: item.id,
            label: item.department
          }]
        })
        return this.dropdownDepartment
      },
      loadImmediateSupervisor: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchList', {
          page: 0,
          page_size: 0,
          page_type: 'all'
        })
        data.items.forEach((item) => {
          this.dropdownImmediateSupervisor = [...this.dropdownImmediateSupervisor, {
            value: item.id,
            label: `${item.employee_last_name}, ${item.employee_first_name}`
          }]
        })
        return this.dropdownImmediateSupervisor
      },
      loadLeaveGroupType: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/workInformation/dropdownLeaveGroup')
        data.items.forEach((item) => {
          this.dropdownLeaveGroup = [...this.dropdownLeaveGroup, {
            value: item.id,
            label: item.leave_group
          }]
        })
        return this.dropdownLeaveGroup
      }
    }
  },
  async created () {
    this.loadLeaveGroupType()
    this.loadDepartmentType()
    this.loadImmediateSupervisor()
    if (this.employeeId !== undefined) {
      this.getEmployeeSetup(this.$route.params.id).then(res => {
        if (res.employee_setup_work_info !== null) {
          this.workInfoId = res.employee_setup_work_info.id
          this.disabled = true
          this.cacheData = JSON.parse(JSON.stringify(res.employee_setup_work_info))
          this.imageUrl = res.employee_setup_work_info.attachments
          this.form.setFieldsValue(pick(res.employee_setup_work_info, fields))
          this.setAttachments(res.employee_setup_work_info)
        } else {
          this.disabled = false
        }
      })
    } else {
      this.loading = false
    }
  },
  methods: {
    async loadAttachments () {
      this.getEmployeeSetup(this.$route.params.id).then(res => {
        this.setAttachments(res.employee_setup_work_info)
      })
    },
    async setAttachments (employeeSetupWorkInfo) {
      if (employeeSetupWorkInfo !== null) {
        this.attachments = JSON.parse(employeeSetupWorkInfo?.attachments || '[]')
          .map((attachment, index) => {
            const name = decodeURIComponent(this.getFilename(attachment))
            return {
              uid: index,
              name,
              status: 'done',
              url: attachment
            }
          })
      }
    },
    getFilename (name) {
      return name?.split('?')[0]?.split('/').pop()
    },
    validate (rule, value, callback) {
      const regex = /^\d*\.?\d*$/
      const regexDp = /^\s*(?=.*[1-9])\d*(?:\.\d{1,2})?\s*$/
      if (value && !regex.test(value)) {
        callback(new Error(this.$t('error.nan')))
      } else {
        if (value && !regexDp.test(value)) {
          callback(new Error(this.$t('error.2dp')))
        } else {
          callback()
        }
      }
    },
    async handleChange (info) {
      this.attachments = info.fileList
    },
    cancel () {
      this.disabled = true
    },
    handleSelectChange (val) {
      console.log(val)
    },
    showNotification () {
      this.$notification.open({
        message: this.$t('table.dialog.work-information-added'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    showUpdatedNotification () {
      this.$notification.open({
        message: this.$t('table.dialog.work-information-updated'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
      showInfo () {
        const _this = this
        this.cacheData = {
          attachments: _this.attachments,
          employee_id: _this.employeeId,
          status_id: _this.form.getFieldValue('status_id'),
          tenure: _this.form.getFieldValue('tenure'),
          department_id: _this.form.getFieldValue('department_id'),
          calendar_id: _this.form.getFieldValue('calendar_id'),
          leave_group_id: _this.form.getFieldValue('leave_group_id'),
          claim_group_id: _this.form.getFieldValue('claim_group_id'),
          immediate_supervisor_id: _this.form.getFieldValue('immediate_supervisor_id'),
          probation_months: _this.form.getFieldValue('probation_months'),
          join_date: _this.form.getFieldValue('join_date'),
          resign_date: _this.form.getFieldValue('resign_date'),
          regularization_date: _this.form.getFieldValue('regularization_date')
        }
        this.$confirm({
          title: _this.$t('table.dialog.confirm-msg'),
          okText: 'Yes',
          cancelText: 'No',
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
          async onOk () {
            //  this.loading = true
            const attachments = []
            for (const file of _this.attachments) {
              const imageUrl = file.url
                ? file.url
                : await getBase64(file.originFileObj)
              const filename = file.url
                ? _this.getFilename(file.url)
                : file.originFileObj?.name
              attachments.push({
                image: imageUrl,
                filename
              })
            }
            const body = {
              employee_id: _this.employeeId,
              attachments,
              status_id: _this.form.getFieldValue('status_id'),
              tenure: _this.form.getFieldValue('tenure') || '',
              department_id: _this.form.getFieldValue('department_id'),
              calendar_id: _this.form.getFieldValue('calendar_id'),
              leave_group_id: _this.form.getFieldValue('leave_group_id'),
              claim_group_id: _this.form.getFieldValue('claim_group_id'),
              immediate_supervisor_id: _this.form.getFieldValue('immediate_supervisor_id'),
              probation_months: _this.form.getFieldValue('probation_months'),
              join_date: moment(_this.form.getFieldValue('join_date')).format('YYYY-MM-DD').toString(),
              resign_date: _this.form.getFieldValue('resign_date') !== null || undefined ? moment(_this.form.getFieldValue('resign_date')).format('YYYY-MM-DD').toString() : null,
              regularization_date: _this.form.getFieldValue('regularization_date') !== null || undefined ? moment(_this.form.getFieldValue('regularization_date')).format('YYYY-MM-DD').toString() : null
            }
            try {
              if (_this.employee.employee_setup_work_info !== null) {
                await _this.$store.dispatch('api/setup/employee/employeeSetup/workInformation/update', {
                  id: _this.employee.employee_setup_work_info.id,
                  data: body
                })
                _this.showUpdatedNotification()
              } else {
                await _this.$store.dispatch('api/setup/employee/employeeSetup/workInformation/add', body)
                _this.showNotification()
              }
              _this.cancel()
              _this.$emit('titleIcon')
              _this.loadAttachments()
            } catch (e) {
              _this.$message.error(e.response.data.message)
            }
          }
        })
      },
    handleSubmit () {
      this.form.validateFields((err, values) => !err && this.showInfo())
    },
    // handleEdit () {
    //   this.disabled = false
    // },
    onStartDateChange (date) {
      this.formattedJoinDate = date.format('YYYY.MM.DD')
      this.formattedCurrentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
      this.joinYear = new Date(this.formattedJoinDate).getFullYear()// 2022
      this.joinMonth = new Date(this.formattedJoinDate).getMonth() + 1 // 07
      this.currentYear = new Date(this.formattedCurrentDate).getFullYear() // 2022
      this.currentMonth = new Date(this.formattedCurrentDate).getMonth() + 1 // 09
      this.calculteMonth = (this.currentMonth - this.joinMonth) + (12 * (this.currentYear - this.joinYear))
      this.calculteMonth < 0 ? this.form.setFieldsValue({ 'tenure': 0 }) : this.form.setFieldsValue({ 'tenure': this.calculteMonth })
      // this.startDate = date.unix()
    },
    onEndDateChange (date) {
      console.log(date)
      this.endDate = date.unix()
    },
    checkStartDate (rule, value, callback) {
      if (this.endDate) {
        return value.unix() <= this.endDate
          ? callback()
          : callback(i18nRender(i18nRender('error.start-date.later')))
      }
    },
    checkEndDate (rule, value, callback) {
      if (this.startDate) {
        return value.unix() >= this.startDate
          ? callback()
          : callback(i18nRender(i18nRender('error.end-date.earlier')))
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

.ant-row >>> .ant-upload-list-item-info {
  padding: 0 30px 0 4px !important;
  white-space: nowrap;
}

.ant-row >>> .ant-upload-list-item-name {
  white-space: inherit;
}
.upload-btn{
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 200px;
  justify-content: center;
  align-items: center;
  padding: 0px;
  font-size: 20px;
  background-color: light-grey;
}
</style>
