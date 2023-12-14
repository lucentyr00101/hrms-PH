<template>
  <div>
    <div class="header">PHIC</div>
    <a-row>
      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.phic-category')}: `" :wrapper-col="{ span: 12 }">
          <a-select
            :options="phicTypeDropdown"
            v-decorator="['phic_category_id']"
            :width="80"
            :disabled="editable"
            @change="(e) => handleSelectChange(e)"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.phic-number')}: `" :wrapper-col="{ span: 12 }">
          <a-input
            v-decorator="['phic_number']"
            :maxLength="25"
            :disabled="editable"/>
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item :label="`${$t('setup.employee.pay-phic')}: `">
          <a-switch v-decorator="['pay_phic' , {valuePropName: 'checked'}]" :disabled="editable"/>
        </a-form-item>
      </a-col>
    </a-row>

  </div>
</template>

<script>
export default {
    name: 'PayrollInfoPHIC',
    props: {
        form: { type: Object, default: null },
        editable: { type: Boolean, default: true }
    },
    data () {
      return {
        phicTypeDropdown: [],
        loadPhicType: async () => {
          const data = await this.$store.dispatch('api/dropdown/fetchPHICDropdown')
          data.forEach((item) => {
            this.phicTypeDropdown = [...this.phicTypeDropdown, {
              value: item.id,
              label: item.phic_type
            }]
          })
          return this.phicTypeDropdown
        }
      }
    },
    created () {
        this.loadPhicType()
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
