<template>
  <div>
    <a-card class="antd-custom-table">
      <query-form :columns="columns" v-model="queryParam" @click="$refs.table.refresh(true)" />
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

        <span slot="status" slot-scope="status, record">
          <p v-if="record.status === 'Allocated'" ><span :style="{ color: '#32cd32' }" >{{ record.status }}</span></p>
          <p v-else>{{ record.status }}</p>
        </span>
        <span slot="action" slot-scope="text, record, index">
          <a @click="handleAction(text, record, index)">{{ $t('table.dialog.view') }}</a>
        </span>
      </s-table>
    </a-card>
    <AddAssetModal @refreshTable="$refs.table.refresh(true)" />
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import { STable } from '@/components'
import QueryForm from '@/components/Table/QueryForm'
import { i18nRender } from '@/locales'
import AddAssetModal from '@/components/Setup/Company/Assets/AddAssetModal.vue'
export default {
  name: 'SetupCompanyAssetsSetup',
  components: {
    ChosenAlertBox,
    QueryForm,
    STable,
    AddAssetModal
  },
  data () {
    return {
      selectedRowKeys: [], // Check here to configure the default column
      currentRow: null,
      columns: [
        { title: i18nRender('table.column.assets-type'), dataIndex: 'assets_type', order: 1 },
        { title: i18nRender('table.column.assets-name'), dataIndex: 'assets_name' },
        { title: i18nRender('table.column.serial-number'), dataIndex: 'serial_number', order: 2 },
        { title: i18nRender('table.column.remark'), dataIndex: 'remarks', hideInSearch: true, ellipsis: true },
        { title: i18nRender('table.column.value'), dataIndex: 'value' },
        {
          title: i18nRender('table.column.status'),
          dataIndex: 'status',
          valueType: 'select',
          scopedSlots: { customRender: 'status' },

          order: 3,
          valueEnums: {
            allocated: 'Allocated',
            idle: 'Idle',
            commissioned: 'Commissioned'
          }
        },
        {
          title: i18nRender('table.column.action'),
          dataIndex: 'id',
          hideInSearch: true,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 查询条件参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/company/assetSetup/fetchList', params)
        console.log('dt', data)
        return data
      }
    }
  },
  methods: {
    openModal (data) {
      this.$store.commit('modal/TOGGLE_ADD_ASSET_MODAL')
      this.showModal = true
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleAction (text, record, index) {
      console.log('act', { text, record, index })
    }
  }
}
</script>
