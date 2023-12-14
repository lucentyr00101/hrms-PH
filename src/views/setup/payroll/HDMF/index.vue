<template>
  <div>
    <a-card>
      <chosen-alert-box
        :isActive="true"
        position="right"
        :totalSelected="selectedRowKeys.length"
        @open="handleHDMFModal()"
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
        <a-switch key="status" slot="status" slot-scope="val, record" :default-checked="val === 'ACTIVE'" @change="e => handleStatus(e, record)"/>
        <span slot="action" slot-scope="text, record">
          <a @click="handleHDMFModal(record)">View</a>
        </span>
      </s-table>
    </a-card>
    <hdmf-modal :model="mdl" @refreshTable="$refs.table.refresh()"/>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import HdmfModal from './HDMFModal.vue'
import { i18nRender } from '@/locales'

const columns = [
  {
    title: 'HDMF type',
    dataIndex: 'hdmf_type',
    key: 'hdmf_type'
  },
  {
    title: 'Description',
    dataIndex: 'descriptions',
    key: 'descriptions',
    ellipsis: true
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Employer Contribution Rate',
    dataIndex: 'employer_contribution_rate',
    key: 'employer_contribution_rate'
  },
  {
    title: 'Employee Contribution Rate',
    dataIndex: 'employee_contribution_rate',
    key: 'employee_contribution_rate'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: { ChosenAlertBox, HdmfModal },
  name: 'SetupPayrollHDMF',
  data () {
    return {
      mdl: null,
      columns,
      selectedRowKeys: [],
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/payroll/hdmf/fetchList', params)
        return data
      }
    }
  },
  computed: {
    hasSelected () {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    async handleStatus (checked, record) {
      try {
        await this.$store.dispatch('api/setup/payroll/hdmf/updateStatus', { id: record.id, enabled: checked })
        this.$notification.open({
        message: checked ? i18nRender('notification.hdmf.enabled') : i18nRender('notification.hdmf.disabled'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
        this.$refs.table.refresh(true)
      } catch (e) {
        this.$message.error(e.response.data.message)
      }
    },
    handleHDMFModal (data) {
      this.$store.commit('modal/TOGGLE_SETUP_PAYROLL_HDMF_MODAL')
      this.mdl = { ...data }
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
