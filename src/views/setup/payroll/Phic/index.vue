<template>
  <a-card>
    <div v-show="!addPhicTypeModal && !editPhicTypeModal">
      <chosen-alert-box
        :totalSelected="selectedRowKeys.length"
        @delete="handleDelete(selectedRowKeys)"
        isActive
        position="right"
        @open="openAddModal()"
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
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a-switch key="status" slot="status" slot-scope="val, record" :default-checked="val === 'ACTIVE'" @change="e => handleStatus(e, record)"/>
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('table.dialog.view') }}</a>
        </span>
      </s-table>
    </div>
    <add-phic-type-modal @refreshTable="$refs.table.refresh()" />
    <edit-phic-type-modal :model="mdl" />
  </a-card>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'

import { i18nRender } from '@/locales'
import AddPhicTypeModal from './AddPhicTypeModal.vue'
import EditPhicTypeModal from './EditPhicTypeModal.vue'

const columns = [
  {
    id: 1,
    title: i18nRender('table.column.phic-type'),
    dataIndex: 'phic_type',
    key: 'phic_type',
    scopedSlots: { customRender: 'phic_type' }
  },
  {
    id: 2,
    title: i18nRender('table.column.descriptions'),
    dataIndex: 'descriptions',
    key: 'descriptions',
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
  name: 'SetupPayrollPhic',
  components: { ChosenAlertBox, AddPhicTypeModal, EditPhicTypeModal },

  data () {
    return {
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      mdl: null,
      hide: true,
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/payroll/phic/fetchList', params)
        return data
      }
    }
  },
   computed: {
    addPhicTypeModal: {
      get () {
        return this.$store.state.modal.addPhicTypeModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    },
    editPhicTypeModal: {
      get () {
        return this.$store.state.modal.editPhicTypeModal
      },
      set () {
        // just to prevent error log when @cancel
      }
    }
  },
  methods: {
    handleDelete (keys) {
      console.log('delete', keys)
    },
    handleEdit (record) {
      this.hide = false
      this.$store.commit('modal/TOGGLE_EDIT_PHIC_TYPE_MODAL')
      this.mdl = { ...record }
    },
    async handleStatus (checked, record) {
      try {
        await this.$store.dispatch('api/setup/payroll/phic/updateStatus', { id: record.id, enabled: checked })
        this.$notification.open({
        message: checked ? i18nRender('notification.phic.enabled') : i18nRender('notification.phic.disabled'),
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
    openAddModal () {
      this.hide = false
      this.$store.commit('modal/TOGGLE_ADD_PHIC_TYPE_MODAL')
    }
  }
}
</script>

<style scoped></style>
