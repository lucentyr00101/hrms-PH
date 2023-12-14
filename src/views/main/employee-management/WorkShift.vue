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
        <template slot="employee" slot-scope="text, record">
          {{ record.lastName }}, {{ record.firstName }}
        </template>
        <template slot="action" slot-scope="text, record">
          <a @click="openModal(record)">{{ $t('table.dialog.edit') }}</a>
        </template>
      </a-table>
      <work-shift-modal :showModal="showModal" :model="mdl" @closeModal="closeModal"/>
    </a-card>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import { i18nRender } from '@/locales'
import QueryForm from '@/components/Table/QueryForm.vue'
import WorkShiftModal from '@/components/Main/EmployeeManagement/WorkShiftModal.vue'
// import { ExportToCsv } from 'export-to-csv'
// import moment from 'moment'
import InfoCircle from '@/assets/info-circle.svg'

// const options = {
//   fieldSeparator: ',',
//   quoteStrings: '"',
//   decimalSeparator: '.',
//   showLabels: true,
//   showTitle: false,
//   filename: `EmployeeManagement_WorkShift_ExportedFile_${moment().format('YYYYMMDDHHMMSS')}`,
//   useTextFile: false,
//   useBom: true,
//   useKeysAsHeaders: true
//   // headers: ['ID', 'Employee Name', etc.] <--- disable useKeysAsHeaders before use
// }

// const csvExporter = new ExportToCsv(options)

const columns = [
{
    id: 1,
    title: i18nRender('table.column.employee-number'),
    dataIndex: 'employeeNumber',
    key: 'employeeNumber',
    order: 3
  },
  {
    id: 2,
    title: i18nRender('table.column.employee'),
    dataIndex: 'employee',
    key: 'employee',
    order: 2,
    scopedSlots: { customRender: 'employee' }
  },
  {
    id: 3,
    title: i18nRender('table.column.department'),
    dataIndex: 'department',
    key: 'department',
    valueType: 'select',
    valueEnums: {
      'Department 1': 'Department 1',
      'Department 2': 'Department 2'
    },
    scopedSlots: { customRender: 'department' }
  },
  {
    id: 4,
    title: i18nRender('table.column.month'),
    dataIndex: 'month',
    key: 'month',
    order: 1,
    valueType: 'date',
    dateType: 'month',
    datePlaceholder: 'Start month'
  },
  {
    id: 5,
    title: i18nRender('table.column.work-hours'),
    dataIndex: 'workHours',
    key: 'workHours'
  },
  {
    id: 6,
    title: i18nRender('table.column.work-days'),
    dataIndex: 'workDays',
    key: 'workDays'
  },
  {
    id: 7,
    title: i18nRender('table.column.action'),
    dataIndex: 'action',
    key: 'action',
    hideInSearch: true,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
{
    key: '1',
    employeeNumber: '1298xxxxxxxx',
    lastName: 'Brown',
    firstName: 'John',
    department: 'Admin',
    month: 'May',
    workHours: '8',
    workDays: '5'
  },
  {
    key: '2',
    employeeNumber: '1298xxxxxxxx',
    lastName: 'Green',
    firstName: 'Jim',
    department: 'Sales',
    month: 'May',
    workHours: '8',
    workDays: '5'
  },
  {
    key: '3',
    employeeNumber: '1298xxxxxxxx',
    lastName: 'Black',
    firstName: 'Joe',
    department: 'IT',
    month: 'May',
    workHours: '8',
    workDays: '5'
  }
]

export default {
  name: 'MainEmployeeMgmtWorkShift',
  components: { ChosenAlertBox, QueryForm, WorkShiftModal },

  data () {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      mdl: null,
      queryData: [],
      showModal: false
    }
  },
  computed: {},
  methods: {
    handleExport () {
      // csvExporter.generateCsv(data)
    },
    handleDelete (keys) {
      if (keys.length > 0) {
        const _this = this
        this.$confirm({
          title: i18nRender('table.dialog.confirm-msg'),
          okText: i18nRender('table.dialog.yes'),
          cancelText: i18nRender('table.dialog.no'),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />,
          onOk () {
            console.log('OK')
            // TODO - api call
            _this.$message.success(i18nRender('table.dialog.work-shift-deleted'))
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
