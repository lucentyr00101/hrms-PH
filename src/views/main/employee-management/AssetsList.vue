<template>
  <div>
    <a-card class="antd-custom-table">
      <query-form :columns="columns" v-model="queryParam" @click="$refs.table.refresh(true)"/>
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
          <a-button type="secondary">
            {{ $t('table.dialog.export') }}
          </a-button>
        </template>
      </chosen-alert-box>
      <s-table
        rowKey="id"
        ref="table"
        size="default"
        :columns="columns"
        :data="loadData"
        :pagination="{
          'show-total': (total, range) => $tc('table.column.total-items', total),
          showSizeChanger: true,
          showQuickJumper: true,
        }"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      >
        <span slot="employee_name" slot-scope="text, record">
          {{ record.employee_setup.employee_last_name }}, {{ record.employee_setup.employee_first_name }}
        </span>
        <span slot="action" slot-scope="text, record, index">
          <a @click="handleAction(text, record, index)">{{ $t('table.dialog.view') }}</a>
          <a-divider type="vertical" />
          <a @click="handleAction(text, record, index)">{{ $t('table.dialog.edit') }}</a>
        </span>
      </s-table>
    </a-card>
    <AddEmployeeAsset :dropdown="dropdown" @refreshTable="$refs.table.refresh(true)"/>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import { STable } from '@/components'
import QueryForm from '@/components/Table/QueryForm'
import { i18nRender } from '@/locales'
import AddEmployeeAsset from '@/components/Main/EmployeeManagement/AddEmployeeAsset'

export default {
  name: 'MainEmployeeMgmtAssetsList',
  components: {
    ChosenAlertBox,
    QueryForm,
    STable,
    AddEmployeeAsset
  },
  data () {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      currentRow: null,
      valueEnums: {},
      dropdown: { employee: [], assetSetup: [] },
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)

        const data = await this.$store.dispatch('api/main/employeeManagement/assets/fetchList', params)
        return data
      }
    }
  },
  computed: {
    columns () {
      return [
        { title: i18nRender('table.column.employee-number'), dataIndex: 'employee_setup.employee_number', order: 2 },
        {
          title: i18nRender('table.column.employee'),
          dataIndex: 'employee_name',
          order: 1,
          scopedSlots: { customRender: 'employee_name' }
        },
        {
          title: i18nRender('table.column.department'),
          dataIndex: 'employee_setup.employee_setup_work_info.department',
          order: 3,
          valueType: 'select',
          valueEnums: this.valueEnums
        },
        { title: i18nRender('table.column.assets-type'), dataIndex: 'company_assets_setup.assets_type' },
        { title: i18nRender('table.column.assets-name'), dataIndex: 'company_assets_setup.assets_name' },
        { title: i18nRender('table.column.serial-number'), dataIndex: 'company_assets_setup.serial_number' },
        { title: i18nRender('table.column.value'), dataIndex: 'company_assets_setup.value' },
        {
          title: i18nRender('table.column.action'),
          dataIndex: 'id',
          hideInSearch: true,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  async created () {
    const items = await this.$store.dispatch('api/setup/company/assetSetup/fetchAssetList')
    const { items: employees } = await this.$store.dispatch('api/setup/employee/employeeSetup/fetchList', {
      page: 0,
      page_size: 0,
      page_type: 'all'
    })
    items.forEach((item) => {
      this.valueEnums = { ...this.valueEnums, [item.id]: item.assets_name }
      this.dropdown.assetSetup.push({ id: item.id, value: item.assets_name, label: item.assets_name })
    })
    employees.forEach((item) => {
      this.dropdown.employee.push({ id: item.id, value: `${item.employee_last_name}, ${item.employee_first_name}`, label: `${item.employee_last_name}, ${item.employee_first_name}` })
    })
  },
  methods: {
    openModal (data) {
      this.$store.commit('modal/TOGGLE_ADD_EMPLOYEE_ASSET_MODAL')
      this.showModal = true
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleAction (text, record, index) {
      console.log({ text, record, index })
    }
  }
}
</script>
