<template>
  <div>
    <div class="header">HDMF</div>
    <a-row>
      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.hdmf-number')}: `" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['hdmf_number']"
            :maxLength="25"
            :disabled="editable"/>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.hdmf-type')}: `" :wrapper-col="{ span: 12 }">
          <a-select
            :options="hdmfTypeDropdown"
            v-decorator="['hdmf_type_id']"
            :width="80"
            :disabled="editable"
            @change="(e) => handleSelectChange(e)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.deduct-hdmf')}: `">
          <a-switch v-decorator="['deduct_hdmf' , {valuePropName: 'checked'}]" :disabled="editable"/>
        </a-form-item>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
    name: 'PayrollInfoHDMF',
    props: {
        form: { type: Object, default: null },
        editable: { type: Boolean, default: true }
    },
    data () {
        return {
            hdmfTypeDropdown: [],
            loadHDMFType: async () => {
                const data = await this.$store.dispatch('api/dropdown/fetchHDMFDropdown')
                data.forEach((item) => {
                    this.hdmfTypeDropdown = [...this.hdmfTypeDropdown, {
                        value: item.id,
                        label: item.hdmf_type
                    }]
                })
                return this.hdmfTypeDropdown
            }
        }
    },
    created () {
        this.loadHDMFType()
    },
    methods: {
        handleSelectChange (e) {
        console.log(e)
        }
    }
}

</script>

<style scoped>
.header {
  background-color: #e8e8e8;
  font-size: 15px;
  padding: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
