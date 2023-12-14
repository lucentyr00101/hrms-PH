<template>
  <div>
    <div class="header">TIN</div>
    <a-row >
      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.tin-category')}: `" :wrapperCol="{ span: 12 }">
          <a-select
            :options="taxTypeDropdown"
            :disabled="editable"
            v-decorator="['tax_category_id']"
            placeholder="Select"
            @change="handleSelectChange"
          />
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.tin-number')}: `" :wrapper-col="{ span: 12 }">
          <a-input :maxLength="25" :disabled="editable" v-decorator="['tin']"> </a-input>
        </a-form-item>
      </a-col>

      <a-col :span="8">
        <a-form-item :label="`${$t('setup.employee.tin-branch')}: `" :wrapper-col="{ span: 12 }">
          <a-input :maxLength="25" :disabled="editable" v-decorator="['tax_branch']" placeholder="enter"> </a-input>
        </a-form-item>
      </a-col>
    </a-row>

    <a-row style="margin-bottom: 30px">
      <!-- v-if="!editable"  -->
      <a-col class="switch-col" :span="6">
        <a-form-item valuePropName="checked" :label="`${$t('setup.employee.deduct-tin')}: `" :label-col="{ span: 15 }">
          <a-switch v-decorator="['deduct_tax', {valuePropName: 'checked'}]" :disabled="editable" />
        </a-form-item>
      </a-col>
      <a-col class="switch-col" :span="6">
        <a-form-item :label="`${$t('setup.employee.self-disabled')}: `" :label-col="{ span: 15 }">
          <a-switch
            v-decorator="['self_disabled', {valuePropName: 'checked'}]"
            :disabled="editable"
          />
        </a-form-item>
      </a-col>
      <a-col class="switch-col" :span="6">
        <a-form-item valuePropName="checked" :label="`${$t('setup.employee.spouse-disabled')}: `" :label-col="{ span: 15 }">
          <a-switch
            v-decorator="['spouse_disabled', {valuePropName: 'checked'}]"
            :disabled="editable"
          />
        </a-form-item>
      </a-col>
      <a-col class="switch-col" :span="6">
        <a-form-item valuePropName="checked" :label="`${$t('setup.employee.borne-by-employer')}: `" :label-col="{ span: 15 }">
          <a-switch
            v-decorator="['borne_by_employer', {valuePropName: 'checked'}]"
            :disabled="editable"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
    name: 'PayrollInfoTIN',
    props: {
        form: { type: Object, default: null },
        editable: { type: Boolean, default: false }
    },
    created () {
        this.loadTaxType()
    },
    data () {
        return {
            taxTypeDropdown: [],
            loadTaxType: async () => {
                const data = await this.$store.dispatch('api/dropdown/fetchTaxCategoryDropdown')
                data.forEach((item) => {
                    this.taxTypeDropdown = [...this.taxTypeDropdown, {
                        value: item.id,
                        label: item.tax_type
                    }]
                })
                return this.taxTypeDropdown
            }
        }
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
