<template>
  <div>
    <a-card>
      <chosen-alert-box
        v-if="!viewTax"
        :isActive="true"
        position="right"
        :totalSelected="selectedRowKeys.length"
        @open="handleTaxView()"
        @delete="handleDelete(selectedRowKeys)"
      />
      <s-table
        v-if="!viewTax"
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
        <a-switch
          key="status"
          slot="status"
          slot-scope="val, record"
          :default-checked="val === 'ACTIVE'"
          @change="(e) => handleStatus(e, record)"
        />
        <span slot="action" slot-scope="text, record">
          <a @click="handleTaxView(record)">View</a>
        </span>
      </s-table>
      <tax-view v-else :taxVal="taxVal"></tax-view>
    </a-card>
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import TaxView from './TAXView.vue'
import { i18nRender } from '@/locales'

const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    TaxType: `Tax - ${i}`,
    descriptions: `Hello Tax - ${i}`,
    status: true,
    taxDetails: [
       {
          key: '1',
          salaryMin: Math.ceil(Math.random() * 100),
          salaryMax: Math.ceil(Math.random() * 10000),
          editable: false,
          baseTaxAmount: Math.ceil(Math.random() * 1000),
          taxRate: `${Math.ceil(Math.random() * 100)} %`
        },
        {
          key: '2',
          salaryMin: Math.ceil(Math.random() * 100),
          salaryMax: Math.ceil(Math.random() * 10000),
          editable: false,
          baseTaxAmount: Math.ceil(Math.random() * 1000),
          taxRate: `${Math.ceil(Math.random() * 100)} %`
        }
    ]
  })
}

const columns = [
  {
    title: 'Tax type',
    dataIndex: 'tax_type',
    key: 'TaxType'
  },
  {
    title: 'Description',
    dataIndex: 'descriptions',
    key: 'descriptions',
    ellipsis: true
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
  components: { ChosenAlertBox, TaxView },
  name: 'SetupPayrollTax',
  data () {
    return {
      data,
      taxVal: null,
      columns,
      selectedRowKeys: [],
      queryParam: {},
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/payroll/tax/fetchList', params)
        return data
      }
    }
  },
  computed: {
    viewTax: {
      get () {
        return this.$store.state.modal.setupPayrollTinView
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    async handleStatus (checked, row) {
      try {
        await this.$store.dispatch('api/setup/payroll/tax/updateStatus', { id: row.id, status: checked })
        this.$notification.open({
          message: checked ? i18nRender('notification.tax.enabled') : i18nRender('notification.tax.disabled'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
        this.$refs.table.refresh(true)
      } catch (e) {
        this.$message.error(e.response)
      }
    },
    handleTaxView (data) {
      this.$store.commit('modal/TOGGLE_SETUP_PAYROLL_TIN_VIEW')
      this.taxVal = { ...data }
    }
  }
}
</script>
