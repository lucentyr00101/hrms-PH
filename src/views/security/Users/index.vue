<template>
  <div>
    <a-card>
      <chosen-alert-box
        isActive
        position="right"
        :totalSelected="selectedRowKeys.length"
        @open="openAddUser()"
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
        <span key="roles" slot="roles" slot-scope="roles">
          <template v-for="(role, i) in roles">
            <a-tag
              v-if="role.security_roles"
              :key="i"
              :color="role.security_roles.color"
            >
              {{ role.security_roles.name }}
            </a-tag>
          </template>
        </span>
        <a-switch key="status" slot="status" slot-scope="val, record" :default-checked="val === 'ACTIVE'" @change="e => handleStatus(e, record)"/>
        <span key="action" slot="action" slot-scope="val,record">
          <a @click="openAddUser(record)">{{ $t('table.dialog.edit') }}</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">
              {{ $t('table.dialog.more') }} <a-icon type="down" />
            </a>
            <down-outlined />
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="openResetPassword(record.id)">{{ $t('table.dialog.reset-password') }}</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDelete">{{ $t('table.dialog.delete') }}</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </s-table>
      <AddUserModal :model="mdl" @refreshTable="$refs.table.refresh()" />
      <reset-password-modal :id="currentId" @clearId="currentId = ''" />
    </a-card>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import AddUserModal from './AddUserModal.vue'
import ResetPasswordModal from '../Account/ResetPasswordModal.vue'
import { i18nRender } from '@/locales'

const columns = [
  {
    title: i18nRender('table.column.email'),
    dataIndex: 'username',
    key: 'email'
  },
  {
    title: i18nRender('table.column.employee-name'),
    dataIndex: 'employee',
    key: 'employee',
    customRender: (text, record) => `${record.employee_setup.employee_last_name}, ${record.employee_setup.employee_first_name}`
  },
  {
    title: i18nRender('table.column.role-name'),
    dataIndex: 'security_user_roles',
    key: 'roles',
    scopedSlots: { customRender: 'roles' }
  },
  {
    title: i18nRender('table.column.status'),
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: i18nRender('table.column.action'),
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: { AddUserModal, ChosenAlertBox, ResetPasswordModal },
  name: 'Users',
  data () {
    return {
      columns,
      currentId: '',
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
        const data = await this.$store.dispatch('api/security/users/fetchList', params)
        return data
      },
      mdl: null
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start () {},
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleEdit () {},
    handleDelete () {},
    openAddUser (data) {
        this.$store.commit('modal/TOGGLE_ADD_USER_MODAL')
        this.mdl = { ...data }
    },
    openResetPassword (id) {
      this.currentId = id
      this.$store.commit('modal/TOGGLE_RESET_PASSWORD_MODAL')
    },
    async handleStatus (checked, record) {
      try {
        await this.$store.dispatch('api/security/users/updateStatus', { id: record.id, status: checked })
        this.$notification.open({
        message: checked ? i18nRender('notification.user.enabled') : i18nRender('notification.user.disabled'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
        this.$refs.table.refresh(true)
      } catch (e) {
        this.$message.error(e.response.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.info-container{
  width: 100%;
  background-color: #E6F7FF;
  border: 1px solid #BAE7FF;
  padding: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .info-left{
    display: flex;
    align-items: center;
    gap: 5px;
    span{
      color: #1890FF;
    }
  }

  .info-right{
    display: flex;
    align-items: center;
    .ant-btn{
      background: none;
      border: none;
      color: #1890FF;
    }
  }
}

</style>
