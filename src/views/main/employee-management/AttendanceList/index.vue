<template>
  <div>
    <a-card class="antd-custom-table">
      <query-form
        :columns="columns"
        v-model="queryParam"
        @click="$refs.table.refresh(true)"
      />
    </a-card>
    <a-card class="antd-custom-table">
      <chosen-alert-box
        :isActive="true"
        :totalSelected="selectedRowKeys.length"
        position="right"
        @open="openModal()"
        @delete="handleDelete(selectedRowKeys)"
      >
        <template v-slot:action-button>
          <a-button type="secondary" @click="handleExport">
            {{ $t('table.dialog.export') }}
          </a-button>
        </template>
      </chosen-alert-box>
      <a-table
        :columns="columns"
        :data-source="data"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: 10, total: data.length, 'show-total': (total, range) => $tc('table.column.total-items', total) }"
        @change="onPageChange"
      >
        <!-- <template slot="action" slot-scope="text, record">
          <a @click="openModal(record)">{{ $t('table.dialog.edit') }}</a>
        </template> -->
        <span slot="status">
          <a-badge color="#f50"/>
          Modified
          <a-badge color="#87d068" text="Approved" />
          <a-badge color="gold" text="Pending" />
        </span>
        <span slot="status" slot-scope="status, record">
          <p v-if="record.status === 'Approved'" ><a-badge style="width:200%" color="#87d068" :text="`${$t('table.column.approved')}`"></a-badge></p>
          <p v-else-if="record.status === 'Pending'" ><a-badge style="width:200%" color="gold" :text="`${$t('table.column.pending')}`"></a-badge></p>
          <p v-else-if="record.status === 'Modified'" ><a-badge style="width:200%" color="#f50" :text="`${$t('table.column.modified')}`"></a-badge></p>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleViewAttendanceLists(record)">{{ $t('table.column.view') }}</a>
          </template>
          <!-- <span slot="action" slot-scope="text, record">
            <a @click="handleViewAttendanceLists(record)">{{ $t('table.dialog.edit') }}</a>
          </span> -->
        </span>
      </a-table>
      <!-- <template slot="footer">
        Footer123
      </template> -->
      <add-attendance-modal :showModal="showModal" :model="mdl" @closeModal="closeModal"/>
      <view-attendance-modal :model="mdl"/>
    </a-card>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import QueryForm from '@/components/Table/QueryForm.vue'
import AddAttendanceModal from './AddAttendanceModal.vue'
import ViewAttendanceModal from './ViewAttendanceModal.vue'
import EditAttendanceModal from './EditAttendanceModal.vue'
// import { ExportToCsv } from 'export-to-csv'
// import moment from 'moment'
import InfoCircle from '@/assets/info-circle.svg'
// import EditAttendanceModal from './EditAttendanceModal.vue'

// const options = {
//   fieldSeparator: ',',
//   quoteStrings: '"',
//   decimalSeparator: '.',
//   showLabels: true,
//   showTitle: false,
//   filename: `EmployeeManagement_AttendanceLists_ExportedFile_${moment().format('YYYYMMDDHHMMSS')}`,
//   useTextFile: false,
//   useBom: true,
//   useKeysAsHeaders: true
//   // headers: ['ID', 'Employee Name', etc.] <--- disable useKeysAsHeaders before use
// }

// const csvExporter = new ExportToCsv(options)

const data = [
{
    key: '1',
    employeeCode: '1298xxxxxxxx',
    employee: 'Bluebear234',
    department: 'Admin',
    workTimeDurations: '8H 00m',
    oTHours: '1H',
    finalWorkTimeDuration: '8H 00m',
    createdTime: '2021-08-31 05:55:59',
    status: 'Approved'
  },
  {
    key: '2',
    employeeCode: '1298xxxxxxxx',
    employee: 'Bluebear234',
    department: 'Admin',
    workTimeDurations: '8H 00m',
    oTHours: '1H',
    finalWorkTimeDuration: '8H 00m',
    createdTime: '2021-08-31 05:55:59',
    status: 'Pending'
  },
  {
    key: '3',
    employeeCode: '1298xxxxxxxx',
    employee: 'Bluebear234',
    department: 'Admin',
    workTimeDurations: '8H 00m',
    oTHours: '1H',
    finalWorkTimeDuration: '8H 00m',
    createdTime: '2021-08-31 05:55:59',
    status: 'Modified'
  }
]

export default {
  name: 'MainEmployeeMgmtAttendanceList',
  components: { ChosenAlertBox, QueryForm, AddAttendanceModal, ViewAttendanceModal, EditAttendanceModal },

  data () {
    return {
      data,
      selectedRowKeys: [], // Check here to configure the default column
      mdl: null,
      queryData: [],
      showModal: false,
      showViewModal: false
    }
  },
  computed: {
   columns () {
    return [
    {
        id: 1,
        title: this.$t('table.column.employee-code'),
        dataIndex: 'employeeCode',
        key: 'employeeCode'
      },
      {
        id: 2,
        title: this.$t('table.column.employee'),
        dataIndex: 'employee',
        key: 'employee',
        scopedSlots: { customRender: '' }
      },
      {
        id: 3,
        title: this.$t('table.column.department'),
        dataIndex: 'department',
        key: 'department',
        valueType: 'select',
        valueEnums: {
          'Department 1': 'Department 1',
          'Department 2': 'Department 2'
        }
        // scopedSlots: { customRender: 'department' }
      },
      {
        id: 4,
        title: this.$t('table.column.work-time-durations'),
        dataIndex: 'workTimeDurations',
        key: 'workTimeDurations',
        valueType: 'date'
      },
      {
        id: 5,
        title: this.$t('table.column.oTHours'),
        dataIndex: 'oTHours',
        key: 'oTHours',
        hideInSearch: true
      },
      {
        id: 6,
        title: this.$t('table.column.final-work-time-durations'),
        dataIndex: 'finalWorkTimeDuration',
        key: 'finalWorkTimeDuration'
      },
      {
        id: 7,
        title: this.$t('table.column.created-time'),
        dataIndex: 'createdTime',
        key: 'createdTime',
        hideInSearch: true
        // scopedSlots: { customRender: '' }
      },
      {
        id: 8,
        title: this.$t('table.column.status'),
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
        hideInSearch: true
      },
      {
        id: 9,
        title: this.$t('table.column.action'),
        dataIndex: 'action',
        key: 'action',
        hideInSearch: true,
        scopedSlots: { customRender: 'action' }
      }
]
   } },
  methods: {
    //  edit () {
    //   this.$store.commit('modal/TOGGLE_EDIT_ATTENDANCE_MODAL')
    // },
    handleViewAttendanceLists (data) {
      this.$store.commit('modal/TOGGLE_VIEW_ATTENDANCE_MODAL')
      this.mdl = { ...data }
      //  this.showViewModal = true
      // this.mdl = data
    },
    closeViewModal () {
      this.showViewModal = false
    },
    handleExport () {
      // csvExporter.generateCsv(data)
    },
    handleDelete (keys) {
      if (keys.length > 0) {
        const _this = this
        this.$confirm({
          title: this.$t('table.dialog.confirm-msg'),
          okText: this.$t('table.dialog.yes'),
          cancelText: this.$t('table.dialog.no'),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
          onOk () {
            console.log('OK')
            // TODO - api call
            _this.$message.success(_this.$t('table.dialog.attendance-deleted'))
          },
          onCancel () {
            console.log('Cancel')
          }
        })
      }
    },

    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    onPageChange (val) {
      console.log(val)
    },

    queryValue (val) {
      // TODO - handle table query api call
      console.log(val)

      // Sample Query checking
      for (let i = 0; i < this.data.length; i++) {
        if (val.employeeLastName === this.data[i].employeeLastName) {
          this.queryData = []
          this.queryData[i] = this.data[i]
          console.log(this.queryData)
        }
      }
    },
    openModal (data) {
      this.showModal = true
      this.mdl = data
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style scoped>

</style>
