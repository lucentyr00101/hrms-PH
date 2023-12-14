<template>
  <div>
    <a-modal
      :title="$t('Attendance Details')"
      :width="800"
      v-model="viewAttendanceModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <div style="color: black;">
          <div :style="{marginLeft: '50px'}">
            <a-row>
              <!-- employee Code -->
              <a-row>
                <a-col :span="4"><div>{{ this.$t('table.column.employee-code') }}: </div></a-col>
                <a-col :span="8">{{ model && model.employeeCode }}</a-col>
                <a-col :span="4"><div>{{ this.$t('table.column.department') }}:</div></a-col>
                <a-col :span="8">{{ model && model.department }}</a-col>
              </a-row><br />
              <a-row>
                <a-col :span="4"><div>{{ this.$t('table.column.employee') }}: </div></a-col>
                <a-col :span="8">{{ model && model.employee }}</a-col>
                <a-col :span="4"><div>{{ this.$t('table.column.created-time') }}: </div></a-col>
                <a-col :span="8">{{ model && model.createdTime }}</a-col>
              </a-row><br />
              <a-row>
                <a-col :span="4"><div>{{ this.$t('table.column.location') }}: </div></a-col>
                <a-col :span="8">Petaling Jaya, Selangor</a-col>
                <a-col :span="4"><div>{{ this.$t('table.column.created-by') }}: </div></a-col>
                <a-col :span="8">Lucas</a-col>
              </a-row><br />
              <a-row>
                <a-col :span="4"><div>{{ this.$t('table.column.remarks') }}: </div></a-col>
                <a-col :span="8">Hello Hi Hello Hii</a-col>
              </a-row>
            </a-row>
          </div><br />
          <a-divider orientation="left">
            Punched Time Details:
          </a-divider><br />
          <div style="margin-left: 50px">
            <a-row>
              <div>
                <a-row>
                  <a-col :span="4"><div>{{ this.$t('table.column.attendance-type') }}: </div></a-col>
                  <a-col :span="8">Time In</a-col>
                  <a-col :span="4"><div>{{ this.$t('table.column.entry-time') }}: </div></a-col>
                  <a-col :span="8">{{ model && model.createdTime }}</a-col>
                </a-row><br />
                <a-row>
                  <a-col :span="4"><div>{{ this.$t('table.column.attendance-type') }}: </div></a-col>
                  <a-col :span="8">Lunch Break</a-col>
                  <a-col :span="4"><div>{{ this.$t('table.column.entry-time') }}: </div></a-col>
                  <a-col :span="8">{{ model && model.createdTime }}</a-col>
                </a-row><br />
                <a-row>
                  <a-col :span="4"><div>{{ this.$t('table.column.attendance-type') }}: </div></a-col>
                  <a-col :span="8">Time In</a-col>
                  <a-col :span="4"><div>{{ this.$t('table.column.entry-time') }}: </div></a-col>
                  <a-col :span="8">{{ model && model.createdTime }}</a-col>
                </a-row><br />
                <a-row>
                  <a-col :span="4"><div>{{ this.$t('table.column.attendance-type') }}: </div></a-col>
                  <a-col :span="8">Time Out</a-col>
                  <a-col :span="4"><div>{{ this.$t('table.column.entry-time') }}: </div></a-col>
                  <a-col :span="8">{{ model && model.createdTime }}</a-col>
                </a-row><br /><br />
                <a-row>
                  <strong>
                    <a-col :span="6"><div>{{ this.$t('table.column.work-time-durations') }}: </div></a-col>
                    <a-col :span="6">7 Hours 47 minutes</a-col>
                  </strong>
                  <!-- <a-col :span=""><div></div></a-col> -->
                  <!-- <a-badge style="width:200%" color="#87d068" :text=></a-badge> -->
                  <!-- `${$t('table.column.approved')}` -->
                  <a-col :span="10">
                    <div v-if="(model && model.status) === 'Pending'">
                      <a-badge style="width:200%" color="gold" :text="`${$t('table.column.pending')}`"></a-badge>
                    </div>
                    <div v-if="(model && model.status) === 'Approved'">
                      <a-badge style="width:200%" color="#87d068" :text="`${$t('table.column.approved')}`"></a-badge>
                    </div>
                    <div v-if="(model && model.status) === 'Modified'">
                      <a-badge style="width:200%" color="#f50" :text="`${$t('table.column.modified')}`"></a-badge>
                    </div>
                  </a-col>
                </a-row><br />
                <a-row>
                  <strong>
                    <a-col :span="3"><div>{{ this.$t('table.column.oTHours') }}: </div></a-col>
                    <a-col :span="9">888</a-col>
                  </strong>
                </a-row><br />
                <a-row>
                  <strong>
                    <a-col :span="7"><div>{{ this.$t('table.column.final-work-time-durations') }}: </div></a-col>
                    <a-col :span="5">8Hours</a-col>
                  </strong>
                </a-row><br />
              </div>
              <!-- Attendance Type -->
              <a-col :span="12">
                <br />
              <!-- <strong>
                <div>Work Time Duration: 7 Hours 47 minutes</div><br />
                <div>OT Hours: 888</div><br />
                <div>Final Work Time Durations: 8 Hours</div><br />
              </strong> -->
              </a-col>
            </a-row>
            <a-form-item style="float: right">
              <a-space>
                <div v-if="(model && model.status) != 'Pending' ">
                  <a-button disabled class="confirm-btn" type="danger" @click="handleSubmit()">{{ $t('table.dialog.approve') }}</a-button>
                </div>
                <div v-else>
                  <a-button class="confirm-btn" type="danger" @click="handleSubmit()">{{ $t('table.dialog.approve') }}</a-button>
                </div>
                <a-button class="confirm-btn" type="primary" @click="handleEditModal()">{{ $t('table.dialog.edit') }}</a-button>
              </a-space>
            </a-form-item><br />
          </div>
        </div>
      </a-form>
    </a-modal>
    <edit-attendance-modal :model="model"/>
  </div>
</template>
<script>
import { TreeSelect } from 'ant-design-vue'
import pick from 'lodash.pick'
import { i18nRender } from '@/locales'
import EditAttendanceModal from './EditAttendanceModal.vue'

const fields = ['createdTime', 'employeeCode', 'employee', 'department', 'remarks', 'location', 'status', 'attendanceType', 'workTimeDurations', 'oTHours']
export default {
  name: 'ViewAttendanceModal',
  components: { EditAttendanceModal },
  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      dp: this.data
    }
  },
  props: {
    data: { type: Array,
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
    viewAttendanceModal: {
      get () {
        return this.$store.state.modal.viewAttendanceModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    closeModal () {
      this.$store.commit('modal/TOGGLE_VIEW_ATTENDANCE_MODAL')
      this.form.resetFields()
    },
    handleEditModal () {
      this.$store.commit('modal/TOGGLE_EDIT_ATTENDANCE_MODAL')
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
        title: i18nRender('table.dialog.approve-msg'),
        okText: i18nRender('table.dialog.yes'),
        cancelText: i18nRender('table.dialog.no'),
        onOk () {
          // TODO - api call
          _this.$message.success(i18nRender('table.dialog.approved'))
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
