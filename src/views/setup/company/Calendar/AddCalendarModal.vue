<template>
  <div>
    <a-modal
      :title="$t('table.dialog.calendar')"
      width="900px"
      v-model="addCalendarModal"
      @cancel="closeModal()"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      destroyOnClose
    >
      <a-form :form="form" layout="inline">
        <div style="display: flex; flex-wrap: wrap;">
          <a-form-item label="Calendar Name" style="flex-basis: 48%" :labelCol="{ lg: 8, md: 8, sm: 10 }" :wrapperCol="{ lg: 16, md: 13, sm: 24 }">
            <a-input
              :maxLength="25"
              placeholder="example"
              v-decorator=" [
                'calendarName',
                { rules: [{ required: true, message: $t('error.calendar-name.required') }] },
              ] "
            />
          </a-form-item>
          <a-form-item label="Descriptions" style="flex-basis: 48%" :labelCol="{ lg: 8, md: 8, sm: 8 }" :wrapperCol="{ lg: 16, md: 13, sm: 24 }">
            <a-textarea
              :maxLength="100"
              :auto-size="{ minRows: 3, maxRows: 5 }"
              :span="24"
              v-decorator=" ['descriptions']"
            />
          </a-form-item>
        </div>
        <a-form-item style="display: block;" :wrapperCol="{ span: 24 }">
          <a-table
            :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
            rowKey="id"
            ref="table"
            size="default"
            :dataSource="dataSource"
            :columns="columns"
            :pagination="false"
            :scroll="{ y: 500 }"
            :loading="loading"
          >
            <span key="action" slot="action">
              <a id="edit" @click="() => {}" >{{ $t('table.dialog.edit-date') }}</a>
            </span>
          </a-table>
          <div class="has-error" v-if="showCheckError">
            <span class="ant-form-explain">{{ $t('error.holiday.at-least-one') }}</span>
          </div>
        </a-form-item>
        <div style="display: flex; align-items: center; justify-content: right;">
          <a-form-item>
            <a-button key="confirm" type="primary" @click="handleSubmit()"> Confirm </a-button>
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import InfoCircle from '@/assets/info-circle.svg'
import moment from 'moment'

export default {
  name: 'AddCalendarModal',
  props: {
    data: { type: Array, default: null }
  },
  data () {
    return {
      formLayout: 'inline',
      form: this.$form.createForm(this),
      selectedRowKeys: [],
      showCheckError: false,
      dataSource: [],
      loading: false
    }
  },
  watch: {
    async addCalendarModal (visible) {
      if (visible) {
        this.loading = true
        const data = await this.$store.dispatch('api/setup/company/calendarMasterList/fetchActiveList')
        this.dataSource = data
        this.loading = false
      }
    }
  },
  computed: {
    addCalendarModal: {
      get () {
        return this.$store.state.modal.addCalendarModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    },
    columns () {
      return [
        {
          title: 'Holiday',
          dataIndex: 'holiday',
          key: 'holiday'
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          customRender: (e, record, index) => {
            const { start_date: startDate, end_date: endDate } = record
            return `${this.formatDate(startDate)} - ${this.formatDate(endDate)}`
          }
        },
        {
          title: i18nRender('table.column.descriptions'),
          dataIndex: 'descriptions',
          key: 'descriptions',
          ellipsis: true
        },
        {
          title: i18nRender('table.column.title'),
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    formatDate (dateString) {
      return moment(dateString).format('YYYY-MM-DD')
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_CALENDAR_MODAL')
      this.selectedRowKeys = []
      this.dataSource = []
    },
    validateSelectedRows () {
      if (this.selectedRowKeys.length === 0) {
        this.showCheckError = true
        return false
      }
      this.showCheckError = false
      return true
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) this.form.validateFields((err, values) => !err && this.validateSelectedRows() && this.showInfo())
      })
    },
    showNotification () {
      this.$notification.open({
        message: this.$t('notification.calendar.added'),
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
            calendar_name: _this.form.getFieldValue('calendarName'),
            descriptions: _this.form.getFieldValue('descriptions'),
            selection_master_list_ids: [..._this.selectedRowKeys]
          }
          try {
            await _this.$store.dispatch('api/setup/company/calendar/addCalendar', data)
            _this.showNotification()
            _this.closeModal()
            _this.$emit('refreshTable')
          } catch (e) {
            _this.$message.error(e.response.data.message)
          }
        }
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>
