<template>
  <a-modal
    centered
    :okText="$t('table.dialog.confirm')"
    :cancelButtonProps="{ style: 'display: none;' }"
    :visible="addEmployeeAssetModal"
    :destroyOnClose="true"
    :title="$t('table.dialog.add-assets')"
    :confirm-loading="loading"
    @cancel="closeModal"
    @ok="showConfirm"
  >
    <a-form :form="form" layout="horizontal" :label-col="{ span: 6 }" :wrapper-col="{ span: 15 }">
      <a-form-item :label="$t('table.column.employee')">
        <a-select
          show-search
          placeholder="Select"
          v-decorator="[
            'employee_id',
            {
              rules: [
                { required: true, message: $t('error.employee.required') }
              ]
            }
          ]"
        >
          <a-select-option v-for="(employees, index) in dropdown.employee" :key="index" :value="employees.value + index" @click="handleSelectChangeEmployee(employees)">{{ employees.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :label="$t('table.dialog.asset')">
        <a-select
          show-search
          placeholder="Select"
          v-decorator="[
            'company_assets_id',
            {
              rules: [
                { required: true, message: $t('error.asset.required') }
              ]
            }
          ]"
        >
          <a-select-option v-for="(assetSetups, index) in dropdown.assetSetup" :key="index" :value="assetSetups.value + index" @click="handleSelectChangeAsset(assetSetups)">{{ assetSetups.label }}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { i18nRender } from '@/locales'
import { mapGetters } from 'vuex'
import InfoCircle from '@/assets/info-circle.svg'

export default {
  props: {
    dropdown: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this, { name: 'addEmployeeAsset' }),
      fileList: [],
      employee: null,
      asset: null

    }
  },
  computed: {
    ...mapGetters('modal', ['addEmployeeAssetModal'])
  },
  methods: {
    handleSelectChangeEmployee (data) {
      this.employee = data.id
    },
    handleSelectChangeAsset (data) {
      this.asset = data.id
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_EMPLOYEE_ASSET_MODAL')
      this.fileList = []
      this.$emit('closeModal')
    },
    async showConfirm () {
      try {
        await this.form.validateFields()
        this.$confirm({
          centered: true,
          title: i18nRender('save.confirm'),
          okText: i18nRender('table.dialog.yes'),
          cancelText: i18nRender('table.dialog.no'),
          onOk: () => this.handleSubmit(),
          icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
        })
      } catch (e) {}
    },
    async handleSubmit () {
      const data = {
        employee_id: this.employee,
        company_assets_id: this.asset
      }
      try {
        this.loading = true
        await this.$store.dispatch('api/main/employeeManagement/assets/add', data)
        this.$notification.open({
          message: i18nRender('notification.assets.added'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
        this.closeModal()
        this.$emit('refreshTable')
        this.loading = false
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
