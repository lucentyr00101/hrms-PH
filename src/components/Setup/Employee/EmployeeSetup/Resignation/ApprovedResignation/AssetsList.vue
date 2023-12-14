<template>
  <div>
    <h3>{{ $t('table.column.assets') }}:</h3>
    <a-table
      style="margin-bottom: 20px;"
      :columns="columns"
      :data-source="list"
      :pagination="false"
    >
      <span slot="employeeName" slot-scope="text, record">{{ record.employee_setup?.employee_last_name }}, {{ record.employee_setup?.employee_first_name }}</span>
      <span slot="action" slot-scope="text, record">
        <a-button
          v-if="isReturned(record)"
          type="danger"
          ghost
        >
          {{ $t('table.dialog.returned') }}
        </a-button>
        <a
          v-else
          @click="handleReturn(record)"
        >
          {{ $t('table.dialog.return') }}
        </a>
      </span>
    </a-table>
  </div>
</template>

<script>
import InfoCircle from '@/assets/info-circle.svg'
import { mapActions } from 'vuex'

export default {
  name: 'ResignationAssetsList',
  async created () {
    this.loadAssets()
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    columns () {
      return [
        { title: 'Employee Number', dataIndex: 'employee_setup.employee_number' },
        { title: 'Employee', dataIndex: 'employeeName', scopedSlots: { customRender: 'employeeName' } },
        { title: 'Department', dataIndex: 'employee_setup.employee_setup_work_info.company_department.department' },
        { title: 'Assets Type', dataIndex: 'company_assets_setup.assets_type' },
        { title: 'Assets', dataIndex: 'company_assets_setup.assets_name' },
        { title: 'Serial Number', dataIndex: 'company_assets_setup.serial_number' },
        { title: 'Value', dataIndex: 'company_assets_setup.value' },
        { title: 'Action', scopedSlots: { customRender: 'action' } }
      ]
    }

  },
  methods: {
    ...mapActions('api/main/employeeManagement/assets', ['returnAssets']),
    isReturned (record) {
      return record?.status === 'Available'
    },
    async loadAssets () {
      this.list = await this.$store.dispatch('api/main/employeeManagement/assets/handover', this.$route.params.id)
    },
    async handleReturn (record) {
      try {
        await this.returnAssets(record.id)
        this.loadAssets()
      } catch (e) {
        this.$confirm({
          centered: true,
          title: this.$t('resignation.assets-still-assigned'),
          okText: this.$t('table.dialog.okay'),
          cancelButtonProps: { style: { display: 'none' } },
          onOk: () => {},
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
        })
      }
    }
  }
}
</script>
