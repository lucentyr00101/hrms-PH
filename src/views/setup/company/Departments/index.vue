<template>
  <div>
    <a-card>
      <chosen-alert-box
        :isActive="true"
        :totalSelected="selectedRowKeys.length"
        position="right"
        @open="openAddDepartmentModal()"
        @delete="handleDelete(selectedRowKeys)"
      />
      <s-table
        ref="table"
        rowKey="id"
        :columns="columns"
        :data="loadData"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="{
          showSizeChanger: true,
          showQuickJumper: true,
          'show-total': (total, range) => $tc('table.column.total-items', total),
        }"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">{{ $t('table.dialog.edit') }}</a>
        </span>
      </s-table>
    </a-card>
    <add-department-modal @refreshTable="$refs.table.refresh()" />
    <edit-department-modal :model="mdl" />
  </div>
</template>

<script>
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'
import AddDepartmentModal from './AddDepartmentModal.vue'

import EditDepartmentModal from './EditDepartmentModal.vue'
import { i18nRender } from '@/locales'

const columns = [
  {
    title: i18nRender('table.column.department'),
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: i18nRender('table.column.descriptions'),
    dataIndex: 'descriptions',
    ellipsis: true,
    key: 'descriptions'
  },
  {
    title: i18nRender('table.column.action'),
    dataIndex: 'action',
    width: '30%',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: { AddDepartmentModal, ChosenAlertBox, EditDepartmentModal },
  name: 'SetupCompanyLeaveSetup',
  data () {
    return {
      columns,
      mdl: null,
      selectedRowKeys: [],
      queryParam: {},
      currentData: [],
      selectedNestedKeys: [],
      loadData: async (parameter) => {
        const { pageNo, pageSize } = parameter
        const _parameter = {
          page: pageNo - 1,
          page_size: pageSize
        }
        const params = Object.assign(_parameter, this.queryParam)
        const data = await this.$store.dispatch('api/setup/company/department/fetchList', params)
        this.currentData = data.items
        return data
      }
    }
  },
  methods: {
    handleEdit (data) {
      this.$store.commit('modal/TOGGLE_EDIT_DEPARTMENT_MODAL')
      this.mdl = { ...data }
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = [...selectedRowKeys]
    },
    // onSelect (key, selected) {
    //   const flatten = []
    //   // this function is to select/unselect all the nested children recursively
    //   this.selectKey(this.currentData, key.id, this.selectedNestedKeys, selected, flatten)
    //   // this function is to whether to select/unselect the parent recursively
    //   this.selectParent(flatten, this.selectedNestedKeys, key.id, selected)
    //   this.selectedRowKeys = this.selectedNestedKeys
    // },

    openAddDepartmentModal () {
      this.$store.commit('modal/TOGGLE_ADD_DEPARTMENT_MODAL')
    }
    // selection (arr, key, selected) {
    //   if (selected) {
    //     if (!arr.includes(key)) {
    //       arr.push(key)
    //     }
    //   } else {
    //     const index = arr.findIndex((val) => key === val)
    //     if (index >= 0) {
    //       arr.splice(index, 1)
    //     }
    //   }
    // },

    // selectParent (flatten, selectedNestedKeys, selectedKey, selected) {
    //   for (var i = flatten.length - 1; i >= 0; i--) {
    //     for (const [key, value] of Object.entries(flatten[i])) {
    //       if (value.includes(selectedKey)) {
    //         if (selected) {
    //           const insertParent = value.every((r) => selectedNestedKeys.includes(r))
    //           if (insertParent) {
    //             selectedNestedKeys.push(key)
    //             this.selectParent(flatten, selectedNestedKeys, key, selected)
    //           }
    //         } else {
    //           const unselectParent = value.some((r) => !selectedNestedKeys.includes(r))
    //           if (unselectParent) {
    //             const index = selectedNestedKeys.findIndex((k) => k === key)
    //             if (index >= 0) {
    //               selectedNestedKeys.splice(
    //                 selectedNestedKeys.findIndex((k) => k === key),
    //                 1
    //               )
    //             }
    //             this.selectParent(flatten, selectedNestedKeys, key, selected)
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    // selectKey (data, selectedKey, selectedNestedKeys, selected, flatten) {
    //   data.forEach((parent) => {
    //     if (parent.id === selectedKey) {
    //       // Search recursively to select/unselect all the nested child
    //       this.selection(selectedNestedKeys, selectedKey, selected)

    //       if (parent.children && parent.children.length > 0) {
    //         parent.children.forEach((child) => {
    //           this.selectKey(parent.children, child.id, selectedNestedKeys, selected, flatten)
    //         })
    //       }
    //     } else {
    //       // Search until selected key match
    //       if (parent.children && parent.children.length > 0) {
    //         flatten.push({ [parent.id]: parent.children.map((e) => e.id) })
    //         this.selectKey(parent.children, selectedKey, selectedNestedKeys, selected, flatten)
    //       }
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>
.add-button {
  margin-bottom: 16px;
  margin-left: auto;
}
</style>
