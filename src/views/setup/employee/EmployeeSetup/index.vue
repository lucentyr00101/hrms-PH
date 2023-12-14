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
        position="right"
        :totalSelected="selectedRows.length"
        @delete="handleDeleteSelected"
        @open="handleAdd"
      >
        <template v-slot:action-button >
          <a-button type="secondary" @click="handleExport">
            {{ $t('table.dialog.export') }}
          </a-button>
        </template>
      </chosen-alert-box>
      <s-table
        :row-selection="rowSelection"
        rowKey="id"
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :pagination="{
          'show-total': (total, range) => $tc('table.column.total-items', total),
          showSizeChanger: true,
          showQuickJumper: true
        }"
      >
        <span slot="employee_last_name" slot-scope="text, record">
          {{ text }}
          <a-tooltip v-if="record?.employee_setup_resignation_pending_for_approval?.status === 'Pending for Approval'">
            <template slot="title">
              Resignation for Approval.
            </template>
            <a-icon type="info-circle" class="infor-circle-red" />
          </a-tooltip>
          <a-tooltip v-if="record?.employee_setup_payroll_info === null">
            <template slot="title">
              No Payroll Information yet.
            </template>
            <a-icon type="info-circle" />
          </a-tooltip>
        </span>

        <span slot="department" slot-scope="text, record">
          <span v-if="record.employee_setup_work_info">
            <span v-if="record.employee_setup_work_info.company_department">
              {{ record.employee_setup_work_info.company_department.department }}
            </span>
            <span v-else> - </span>
          </span>
          <span v-else> - </span>

        </span>

        <span slot="joinDate" slot-scope="text, record">
          <span v-if="record.employee_setup_work_info">
            <span v-if="record.employee_setup_work_info.join_date">
              {{ record.employee_setup_work_info.join_date | moment-date }}
            </span>
            <span v-else>-</span>
          </span>
          <span v-else>- </span>
        </span>

        <span slot="status" slot-scope="text, record">
          <span v-if="record.employee_setup_work_info">
            <employee-status v-if="record.employee_setup_work_info.status_id" :status="record.employee_setup_work_info.status_id" />
            <span v-else> - </span>
          </span>

          <span v-else>
            <span> - </span>
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">View</a>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import { i18nRender } from '@/locales'
import QueryForm from '@/components/Table/QueryForm.vue'
import EmployeeStatus from './EmployeeStatus.vue'
import { EMPLOYEE_STATUS_VALUE_NAME } from '@/constant/enum'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserRoles',
  components: { ChosenAlertBox, QueryForm, EmployeeStatus },
  data () {
    return {
      data: [],
      selectedRows: [],
      queryData: [],
      // csvExporter,
      queryParam: {},
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        this.setEmployeeFilter(params)
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchList', params)
        return data
      },
      departmentDropdown: [],
      loadDepartmentDropdown: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchDepartmentDropdown')
        data.forEach((item) => {
          this.departmentDropdown = [...this.departmentDropdown, {
            value: item,
            label: item
          }]
        })
        return this.departmentDropdown
      },
      lastNameDropdown: [],
      loadLastNameDropdown: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchLastNameDropdown')
        data.forEach((item) => {
          this.lastNameDropdown = [...this.lastNameDropdown, {
            value: item,
            label: item
          }]
        })
        return this.lastNameDropdown
      },
      numberDropdown: [],
      loadNumberDropdown: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchNumberDropdown')
        data.forEach((item) => {
          this.numberDropdown = [...this.numberDropdown, {
            value: item,
            label: item
          }]
        })
        return this.numberDropdown
      },
      emailDropdown: [],
      loadEmailDropdown: async () => {
        const data = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchEmailDropdown')
        data.forEach((item) => {
          this.emailDropdown = [...this.emailDropdown, {
            value: item,
            label: item
          }]
        })
        return this.emailDropdown
      }
    }
  },
  async created () {
    this.loadDepartmentDropdown()
    this.loadLastNameDropdown()
    this.loadNumberDropdown()
    this.loadEmailDropdown()
    this.setQueryParam()
  },
  computed: {
    ...mapGetters('filterList', ['employeeFilter']),
    rowSelection () {
      return {
        onChange: (selectedRowKeys, _selectedRows) => {
          this.setSelectedRows(selectedRowKeys)
        }
      }
    },
    columns () {
      return [
      {
        id: 1,
        title: i18nRender('table.column.employee-number'),
        dataIndex: 'employee_number',
        key: 'employee_number',
        valueType: 'select',
        api: true,
        valueEnums: this.numberDropdown,
        order: 5,
        sorter: true
        // ellipsis: true

      },
      {
        id: 2,
        title: i18nRender('table.column.employee-last-name'),
        dataIndex: 'employee_last_name',
        key: 'employee_last_name',
        valueType: 'select',
        api: true,
        valueEnums: this.lastNameDropdown,
        order: 2,
        scopedSlots: { customRender: 'employee_last_name' },
        sorter: true
        // ellipsis: true

      },
      {
        id: 3,
        title: i18nRender('table.column.employee-first-name'),
        dataIndex: 'employee_first_name',
        key: 'employee_first_name',
        hideInSearch: true,
        sorter: true
        // ellipsis: true

      },
      {
        id: 4,
        title: i18nRender('table.column.employee-middle-name'),
        dataIndex: 'employee_middle_name',
        key: 'employee_middle_name',
        hideInSearch: true,
        sorter: true
        // ellipsis: true

      },
      // employee_setup_work_info.company_department.department
      {
        id: 5,
        title: i18nRender('table.column.department'),
        dataIndex: 'department',
        key: 'department',
        order: 4,
        scopedSlots: { customRender: 'department' },
        valueType: 'select',
        api: true,
        valueEnums: this.departmentDropdown
        // ellipsis: true

      },
      // employee_setup_work_info.join_date
      {
        id: 6,
        title: i18nRender('table.column.join-date'),
        dataIndex: 'join_date',
        key: 'joinDate',
        order: 1,
        scopedSlots: { customRender: 'joinDate' },
        valueType: 'date',
        datePlaceholder: 'Select Date',
        sorter: true
        // ellipsis: true
      },
      {
        id: 7,
        title: i18nRender('table.column.email'),
        dataIndex: 'email',
        key: 'email',
        valueType: 'select',
        api: true,
        valueEnums: this.emailDropdown,
        order: 6,
        sorter: true

      },
      // employee_setup_work_info.status_id
      {
        id: 8,
        title: i18nRender('table.column.status'),
        dataIndex: 'status',
        key: 'status',
        order: 3,
        scopedSlots: { customRender: 'status' },
        valueType: 'select',
        valueEnums: EMPLOYEE_STATUS_VALUE_NAME
        // ellipsis: true

      },
      {
        title: i18nRender('table.column.action'),
        scopedSlots: { customRender: 'action' },
        key: 'action',
        hideInSearch: true
        // ellipsis: true
      }
      ]
    }
  },
  methods: {
    setQueryParam () {
      this.queryParam = {
        email: this.employeeFilter?.email || 'All',
        employee_number: this.employeeFilter?.employee_number || 'All',
        employee_last_name: this.employeeFilter?.employee_last_name || 'All',
        join_date: this.employeeFilter?.join_date,
        status: this.employeeFilter?.status || 'All',
        department: this.employeeFilter?.department || 'All'
      }
    },
    async handleExport () {
      await this.$store.dispatch('api/setup/employee/employeeSetup/exportEmployee', this.queryParam)
    },
    handleDeleteSelected () {
      console.log('Delete', this.selectedRows)
    },
    setSelectedRows (data) {
      this.selectedRows = data
    },
    handleAdd () {
      this.$router.push({ name: 'setup-employee-employee-setup-add' })
    },
    handleEdit (data) {
      this.$router.push({ name: 'setup-employee-employee-setup-view-employee-information', params: { id: data.id } })
    },
    ...mapActions('filterList', ['setEmployeeFilter'])
  }
}
</script>

<style scoped>
.ant-alert >>> .ant-alert-description {
  margin-left: auto;
}
.infor-circle-red {
  color: red;
  margin-right: 5px;
}
</style>
