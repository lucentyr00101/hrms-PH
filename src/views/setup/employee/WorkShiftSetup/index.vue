<template>
  <div>
    <a-card>
      <chosen-alert-box
        :isActive="true"
        :totalSelected="selectedRowKeys.length"
        position="right"
        @open="openAddWorkShiftSetupModal()"
        @delete="handleDelete(selectedRowKeys)"
      />
      <s-table
        :row-selection="{ selectedRowKeys, onChange: onSelectChange }"
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
        <!-- moment("12-25-1995", "MM-DD-YYYY") -->
        <span slot="time" slot-scope="text, record">{{ record.work_start_time | moment('HH:mm') }} - {{ record.work_end_time | moment('HH:mm') }}</span>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('table.dialog.edit') }}</a>
        </span>
      </s-table>
    </a-card>
    <add-work-shift-setup-modal />
    <edit-work-shift-setup-modal :model="mdl"/>
  </div>
</template>

<script>
// import moment from 'moment'
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import AddWorkShiftSetupModal from './AddWorkShiftSetupModal.vue'
import EditWorkShiftSetupModal from './EditWorkShiftSetupModal.vue'
import { i18nRender } from '@/locales'

const columns = [
  {
    id: 1,
    title: i18nRender('table.column.work-shift-type'),
    dataIndex: 'work_shift_type',
    key: 'work_shift_type',
    scopedSlots: { customRender: 'work_shift_type' }
  },
  {
    id: 2,
    title: i18nRender('table.column.time'),
    dataIndex: 'time',
    key: 'time',
    ellipsis: true,
    scopedSlots: { customRender: 'time' }
  },
  {
    id: 3,
    title: i18nRender('table.column.remarks'),
    dataIndex: 'remarks',
    key: 'remarks',
    ellipsis: true,
    scopedSlots: { customRender: 'remarks' }
  },
  {
    title: i18nRender('table.column.action'),
    scopedSlots: { customRender: 'action' },
    key: 'action'
  }
]

export default {
  name: 'SetupEmployeeWorkShiftSetup',
  components: { ChosenAlertBox, AddWorkShiftSetupModal, EditWorkShiftSetupModal },

  data () {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      mdl: null,
      expandedRowKeys: [],
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/employee/workShiftSetup/fetchList', params)
        console.log('data', data.items)
        const workShiftSetupData = data.items
        workShiftSetupData.forEach((item) => {
          const date = '2022-12-12 '
          item.work_start_time = date + item.work_start_time
          item.work_end_time = date + item.work_end_time
        })
        return data
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    openAddWorkShiftSetupModal () {
      this.$store.commit('modal/TOGGLE_ADD_WORK_SHIFT_SETUP_MODAL')
    },
    handleEdit (data) {
      this.$store.commit('modal/TOGGLE_EDIT_WORK_SHIFT_SETUP_MODAL')
      this.mdl = { ...data }
    }
  }
}
</script>
