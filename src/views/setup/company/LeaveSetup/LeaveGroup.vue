<template>
  <div>
    <chosen-alert-box
      :isActive="true"
      position="right"
      :totalSelected="selectedRows.length"
      @delete="handleDelete(selectedRowKeys)"
      @open="handleAdd()"
    />
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
      <template slot="status" slot-scope="status, record">
        <a-switch :default-checked="record.status === 'ACTIVE'" @change="(e)=>handleStatusChange(e,record)" />
      </template>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">{{ $t('table.dialog.edit') }}</a>
      </span>
    </s-table>
    <leave-group :action="action" :currentRow="currentRow" @refreshTable="$refs.table.refresh(true)"/>
  </div>
</template>
<script>

import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import LeaveGroup from '@/components/Setup/Company/Leave/LeaveGroup.vue'
import { i18nRender } from '@/locales'

export default {
  name: 'SetupCompanyLeaveGroup',
  components: { ChosenAlertBox, LeaveGroup },

  data () {
    return {
      selectedRows: [],
      currentRow: null,
      action: null,
      columns: [
        {
          title: i18nRender('table.column.leave-group'),
          dataIndex: 'leave_group'
        },
        {
          title: i18nRender('table.column.descriptions'),
          dataIndex: 'descriptions',
          ellipsis: true
        },
        {
          title: i18nRender('table.column.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: i18nRender('table.column.action'),
          dataIndex: 'id',
          scopedSlots: { customRender: 'action' }
        }
      ],
      queryParam: {},
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/company/leaveGroup/fetchList', params)
        return data
      }
    }
  },
  computed: {
    rowSelection () {
      return {
        onChange: (selectedRowKeys, _selectedRows) => {
          this.setSelectedRows(selectedRowKeys)
        }
      }
    }
  },
  methods: {
    handleDelete (keys) {
      console.log('delete', keys)
    },
    async handleStatusChange (checked, row) {
      try {
        await this.$store.dispatch('api/setup/company/leaveGroup/updateStatus', { id: row.id, status: checked })
        this.$notification.open({
          message: checked ? i18nRender('notification.leave-group.enabled') : i18nRender('notification.leave-group.disabled'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
        this.$refs.table.refresh(true)
      } catch (e) {
        this.$message.error(e.response)
      }
    },
    setSelectedRows (data) {
      this.selectedRows = data
    },
    onPageChange (val) {
      console.log(val)
    },
    handleAdd () {
      this.action = 'add'
      this.$store.commit('modal/TOGGLE_ADD_LEAVE_GROUP_MODAL')
    },
    handleEdit (data) {
      this.action = 'edit'
      this.currentRow = data
      this.$store.commit('modal/TOGGLE_ADD_LEAVE_GROUP_MODAL')
    }
  }
}
</script>

<style scoped>

.add-button {
  margin-bottom: 16px;
  margin-left: auto;
}
</style>
