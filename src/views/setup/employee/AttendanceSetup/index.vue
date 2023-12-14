<template>
  <a-card>
    <chosen-alert-box
      :isActive="true"
      :totalSelected="selectedRowKeys.length"
      position="right"
      @open="openAddModal()"
      @delete="handleDelete(selectedRowKeys)"
    />
    <a-table
      :columns="columns"
      :data-source="data"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :pagination="{ showSizeChanger: true, showQuickJumper: true, pageSize: 10, total: data.length }"
      @change="onPageChange"
    >
      <template slot="statusName" slot-scope="text">

        <a-tag

          :color="'blue'"
        >
          {{ text }}
        </a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">{{ $t('table.dialog.edit') }}</a>
      </template>
    </a-table>
    <add-attendance-setup-modal />
    <edit-attendance-setup-modal :model="mdl"/>
  </a-card>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'

import { i18nRender } from '@/locales'
import AddAttendanceSetupModal from './AddAttendanceSetupModal.vue'
import EditAttendanceSetupModal from './EditAttendanceSetupModal.vue'

const columns = [
  {
    id: 1,
    title: i18nRender('table.column.attendance-type'),
    dataIndex: 'name',
    key: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    id: 2,
    title: i18nRender('table.column.sort'),
    dataIndex: 'sort',
    key: 'sort'
  },
  {
    id: 3,
    title: i18nRender('table.column.status-name'),
    dataIndex: 'statusName',
    key: 'statusName',
    scopedSlots: { customRender: 'statusName' }
  },
  {
    id: 3,
    title: i18nRender('table.column.descriptions'),
    dataIndex: 'description',
    key: 'description',
    scopedSlots: { customRender: 'description' },
    ellipsis: true
  },

  {
    id: 4,
    title: i18nRender('table.column.action'),
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    statusName: 'Working',
    sort: 1,
    description:
      'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description. This is a description',
    status: true
  },
  {
    key: '2',
    name: 'Jim Green',
    statusName: 'Off Work',
    sort: 2,
    description: 'This is a description',
    status: false
  },
  {
    key: '3',
    name: 'Joe Black',
    statusName: 'Overtime',
    sort: 3,
    description: 'This is a description',
    status: false
  }
]

export default {
  name: 'SetupEmployeeAttendanceSetup',
  components: { ChosenAlertBox, AddAttendanceSetupModal, EditAttendanceSetupModal },

  data () {
    return {
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      mdl: null
    }
  },
  computed: {},
  methods: {
    handleDelete (keys) {
      console.log('delete', keys)
    },

    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    onPageChange (val) {
      console.log(val)
    },

    openAddModal () {
      this.$store.commit('modal/TOGGLE_ADD_ATTENDANCE_SETUP_MODAL')
    },
    handleEdit (data) {
      this.$store.commit('modal/TOGGLE_EDIT_ATTENDANCE_SETUP_MODAL')
      this.mdl = { ...data }
    }

  }
}
</script>

<style scoped>

</style>
