<template>
  <a-card>
    <chosen-alert-box
      :isActive="true"
      :totalSelected="selectedRowKeys.length"
      position="right"
      @open="openAddRoleModal()"
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
      <span slot="status" slot-scope="status,record">
        <a-switch :default-checked="status === 'ACTIVE'" @change="(e)=>handleStatusChange(e,record)" />
      </span>
      <template v-slot:action>
        <a @click="handleEdit(record)">{{ $t('table.dialog.rename') }}</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            {{ $t('table.dialog.more') }} <a-icon type="down" />
          </a>
          <down-outlined />
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="handleDelete">{{ $t('table.dialog.permission') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleDelete">{{ $t('table.dialog.data-access') }}</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleDelete">{{ $t('table.dialog.delete') }}</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
    </s-table>
    <add-role-modal @refreshTable="$refs.table.refresh(true)" />
  </a-card>
</template>

<script>
// import { getServiceList } from '@/api/manage'

import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import AddRoleModal from './AddRoleModal.vue'
import { i18nRender } from '@/locales'
// import { getServiceList } from '@/api/manage'

const columns = [
  {
    id: 1,
    title: i18nRender('table.column.role-name'),
    dataIndex: 'name',
    key: 'roleName',
    scopedSlots: { customRender: 'name' }
  },
  {
    id: 2,
    title: i18nRender('table.column.remark'),
    dataIndex: 'remarks',
    key: 'remark',
    ellipsis: true
  },
  {
    id: 3,
    title: i18nRender('table.column.status'),
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },

  {
    title: i18nRender('table.column.action'),
    scopedSlots: { customRender: 'action' },
    key: 'action'
  }
]

export default {
  name: 'UserRoles',
  components: { ChosenAlertBox, AddRoleModal },

  data () {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/security/roles/fetchList', params)
        return data
      }
    }
  },
  computed: {

  },
  methods: {
    handleDelete (keys) {
      console.log('delete', keys)
    },
    async handleStatusChange (checked, row) {
      try {
        await this.$store.dispatch('api/security/roles/updateStatus', { id: row.id, status: checked })
        this.$notification.open({
          message: checked ? i18nRender('notification.role.enabled') : i18nRender('notification.role.disabled'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
        this.$refs.table.refresh(true)
      } catch (e) {
        this.$message.error(e.response.data.message)
      }
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onPageChange (val) {
      console.log(val)
    },
    openAddRoleModal () {
        this.$store.commit('modal/TOGGLE_ADD_ROLE_MODAL')
    }
  }
}
</script>

<style scoped>
.ant-alert >>> .ant-alert-description {
  margin-left: auto;
}
.add-button {
  margin-bottom: 16px;
  margin-left: auto;
}
</style>
