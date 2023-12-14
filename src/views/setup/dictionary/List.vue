<template>
  <div>
    <a-card class="antd-custom-table">
      <query-form
        :columns="columns"
        v-model="queryParam"
        @click="$refs.table.refresh(true)"
      />
    </a-card>
    <a-card class="antd-custom-table">
      <chosen-alert-box
        :isActive="true"
        position="right"
        :totalSelected="selectedRows.length"
        @delete="handleDeleteSelected"
        @open="handleAdd"
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
        <span slot="action" slot-scope="text, record, index">
          <a @click="handleSetValues(text, record, index)">{{ $t('table.column.set-values') }}</a>
          <a-divider type="vertical" />
          <a @click="handleEdit(text, record, index)">{{ $t('table.dialog.edit') }}</a>
          <a-divider type="vertical" />
          <a @click="handleAction(text, record, index)">{{ $t('table.top.delete') }}</a>
        </span>
      </s-table>
    </a-card>
    <AddTypeModal :currentValue="currentValue" :action="action" @closeModal="currentRow = null" @refreshTable="$refs.table.refresh(true)" />
    <ValuesListModal :currentRow="currentRow" />
  </div>
</template>

<script>
import { STable } from '@/components'
import QueryForm from '@/components/Table/QueryForm'
import ChosenAlertBox from '@/components/Table/ChosenAlertBox'
import { i18nRender } from '@/locales'
import AddTypeModal from '@/components/Setup/Dictionary/AddTypeModal'
import ValuesListModal from '@/components/Setup/Dictionary/ValuesListModal'

export default {
  components: {
    QueryForm,
    STable,
    ChosenAlertBox,
    AddTypeModal,
    ValuesListModal
  },
  data () {
    return {
      currentRow: null,
      selectedRows: [],
      action: null,
      currentValue: null,
      columns: [
        {
          title: i18nRender('table.column.type-name'),
          dataIndex: 'type_name'
        },
        {
          title: i18nRender('table.column.code'),
          dataIndex: 'code'
        },
        {
          title: i18nRender('table.column.sort'),
          dataIndex: 'sort',
          hideInSearch: true
        },
        {
          title: i18nRender('table.column.status'),
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          hideInSearch: true
        },
        {
          title: i18nRender('table.column.remark'),
          dataIndex: 'remarks',
          hideInSearch: true,
          ellipsis: true
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
        const data = await this.$store.dispatch('api/setup/dictionary/fetchList', params)
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
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name
        //   }
        // })
      }
    }
  },
  methods: {
    handleAdd () {
      this.action = 'add'
      this.$store.commit('modal/TOGGLE_DICT_ADD_TYPE_MODAL')
    },
    handleEdit (text, record, index) {
      this.currentValue = record
      this.action = 'edit'
      this.$store.commit('modal/TOGGLE_DICT_ADD_TYPE_MODAL')
    },
    handleSetValues (text, record, index) {
      this.currentValue = record
      this.currentRow = record
      this.$store.commit('modal/TOGGLE_DICT_VALUES_LIST_MODAL')
    },
    handleSwitch (e, record) {
      this.$notification.open({
        message: e ? i18nRender('notification.dictionary-status.enable') : i18nRender('notification.dictionary-status.disable'),
        icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
      })
    },
    handleDeleteSelected () {
      console.log('Delete', this.selectedRows)
    },
    async handleStatusChange (checked, row) {
      try {
        await this.$store.dispatch('api/setup/dictionary/updateStatus', { id: row.id, status: checked })
        this.$notification.open({
          message: checked ? i18nRender('notification.dictionary-status.enable') : i18nRender('notification.dictionary-status.disable'),
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
    handleAction (text, record, index) {
      console.log({ text, record, index })
    }
  }
}
</script>

<style lang="less" scoped>
  .query-form {
    padding: unset !important;
  }
  </style>
