<template>
  <div>
    <div class="header">SSS</div>
    <a-row>
      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.sss-number')}: `" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['sss_number']"
            :maxLength="25"
            :disabled="editable"/>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.sss-group')}: `" :wrapper-col="{ span: 12 }">
          <a-select
            :options="sssTypeDropdown"
            v-decorator="['sss_group_id']"
            :width="80"
            :disabled="editable"
            @change="(e) => handleSelectChange(e)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.deduct-sss')}: `">
          <a-switch v-decorator="['deduct_sss' , {valuePropName: 'checked'}]" :disabled="editable"/>
        </a-form-item>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
    name: 'PayrollInfoSSS',
    props: {
        form: { type: Object, default: null },
        editable: { type: Boolean, default: true }
    },
    data () {
        return {
            sssTypeDropdown: [],
            loadSSSType: async () => {
                const data = await this.$store.dispatch('api/dropdown/fetchSSSDropdown')
                data.forEach((item) => {
                    this.sssTypeDropdown = [...this.sssTypeDropdown, {
                    value: item.id,
                    label: item.sss_type
                    }]
                })
                return this.sssTypeDropdown
            }
        }
    },
    created () {
        this.loadSSSType()
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
