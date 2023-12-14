<template>
  <a-card>
    <div v-show="!addSSSModal && !editSSSModal">
      <ChosenAlertBox
        :totalSelected="selectedRowKeys.length"
        :isActive="true"
        position="right"
        @open="openAddSSSModal()"
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
        <span slot="action" key="action" slot-scope="val, record">
          <a id="view" @click="openEditSSSModal(record)" >{{ $t('table.dialog.view') }}</a>
        </span>
      </s-table>
    </div>
    <AddSSSModal :model="mdl" @refreshTable="$refs.table.refresh()" />
    <EditSSSModal :model="mdl"/>
  </a-card>

</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import AddSSSModal from './AddSSSModal.vue'
import EditSSSModal from './EditSSSModal.vue'
import { i18nRender } from '@/locales'

const columns = [
    {
        title: 'SSS Type',
        dataIndex: 'sss_type',
        key: 'sss_type'
    },
    {
        title: i18nRender('table.column.descriptions'),
        dataIndex: 'descriptions',
        ellipsis: true,
        key: 'descriptions'
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
    name: 'SSS',
    components: { ChosenAlertBox, AddSSSModal, EditSSSModal },
    data () {
        return {
            mdl: null,
            hide: true,
            columns,
            selectedRowKeys: [],
            loadData: async (parameter) => {
            const { pageNo, pageSize } = parameter
            const _parameter = {
                page: pageNo - 1,
                size: pageSize
            }
            const params = Object.assign(_parameter, this.queryParam)
            const data = await this.$store.dispatch('api/setup/payroll/sss/fetchList', params)
            return data
            }
        }
    },
    computed: {
        addSSSModal: {
            get () {
                return this.$store.state.modal.addSSSModal
            },
            set () {
                // just to prevent error log when @cancel
            }
        },
        editSSSModal: {
            get () {
                return this.$store.state.modal.editSSSModal
            },
            set () {
                // just to prevent error log when @cancel
            }
        }
    },
    methods: {
        openAddSSSModal (data) {
            this.hide = false
            this.$store.commit('modal/TOGGLE_ADD_SSS_MODAL')
            this.mdl = { ...data }
        },
        openEditSSSModal (data) {
            this.hide = false
            this.$store.commit('modal/TOGGLE_EDIT_SSS_MODAL')
            this.mdl = { ...data }
            console.log(data)
        },
        onSelectChange (selectedRowKeys) {
            console.log('selectedRowKeys changed: ', selectedRowKeys)
            this.selectedRowKeys = selectedRowKeys
        },
        async handleStatus (checked, row) {
            console.log(row.id)
        try {
            await this.$store.dispatch('api/setup/payroll/sss/updateStatus', { id: row.id, enabled: checked })
            this.$notification.open({
            message: checked ? this.$t('notification.sss.enabled') : this.$t('notification.sss.disabled'),
            icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
            })
            this.$refs.table.refresh(true)
        } catch (e) {
            this.$message.error(e.response.data.message)
        }
        },
        handleDelete () {
            const _this = this
            this.$confirm({
                title: 'Are you sure to confirm this?',
                okText: 'Yes',
                cancelText: 'No',
                onOk () {
                    // TODO - api call
                    _this.$message.success('SSS is Deleted!')
                },
                onCancel () {
                    console.log('Cancel')
                }
            })
        }
    }
}
</script>
