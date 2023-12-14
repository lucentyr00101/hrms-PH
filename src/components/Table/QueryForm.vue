<template>
  <a-form class="table-query" :form="form" @submit="handleSubmit($event)">
    <a-row :gutter="[10, 10]">
      <a-col
        :span="8"
        v-for="filter in filters"
        :key="filter.id"
      >
        <a-form-item :label="filter.title">
          <template v-if="filter.valueType === 'select'">
            <a-select
              v-decorator="[
                `${filter.dataIndex}`
              ]"
              placeholder="All"
              :options="filter.api ? filter.valueEnums : convertDropdownEnums(filter.valueEnums)"
            />
          </template>
          <template v-else-if="filter.valueType === 'date'">
            <a-month-picker v-if="filter.dateType === 'month'" v-decorator="[`${filter.dataIndex}`]" :placeholder="filter.datePlaceholder" />
            <a-week-picker v-else-if="filter.dateType === 'week'" v-decorator="[`${filter.dataIndex}`]" :placeholder="filter.datePlaceholder" />
            <a-range-picker v-else-if="filter.dateType === 'range'" v-decorator="[`${filter.dataIndex}`]" :placeholder="filter.datePlaceholder" />
            <a-date-picker v-else v-decorator="[`${filter.dataIndex}`]" :placeholder="filter.datePlaceholder" />
          </template>
          <template v-else>
            <a-input v-decorator="[`${filter.dataIndex}`]"></a-input>
          </template>
        </a-form-item>
      </a-col>
      <a-col v-if="filters.length <= 2" :span="8" :style="{ textAlign: 'right' }">
        <a-button @click="handleReset">Reset</a-button>
        <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit">Query</a-button>
      </a-col>
    </a-row>
    <a-row v-if="filters.length > 2" :gutter="[10, 10]">
      <a-col :span="24" :style="{ textAlign: 'right' }">
        <a-button @click="handleReset">Reset</a-button>
        <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit">Query</a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  computed: {
    orderedColumns () {
      return this.columns.filter(col => !!col.order).sort((a, b) => a.order - b.order)
    },
    unOrderedColumns () {
      return this.columns.filter(col => !col.order)
    },
    filters () {
      return [...this.orderedColumns, ...this.unOrderedColumns].reduce((filters, column) => {
        !column.hideInSearch && filters.push(column)
        return filters
      }, [])
    }
  },
  mounted () {
    if (this.value) {
      this.form.setFieldsValue(this.value)
    } else {
      this.form.resetFields()
    }
  },
  methods: {
    convertDropdownEnums (data) {
      return Object.keys(data).map((key) => {
        return {
          value: key,
          label: data[key]
        }
      })
    },
    handleReset () {
      this.form.resetFields()
      this.$emit('input', {})
      this.$emit('click')
    },
    handleSubmit (evt) {
      evt.preventDefault()
      this.form.validateFields({ force: true }, (err, fieldsValue) => {
        if (!err) {
          const values = {}
          for (const [key, value] of Object.entries(fieldsValue)) {
            if (value instanceof moment) {
              values[key] = value.format('YYYY-MM-DD')
            } else if (Array.isArray(value) && value[0] instanceof moment && value[1] instanceof moment) {
              values.fromDate = value[0].format('YYYY-MM-DD HH:mm:ss')
              values.toDate = value[1].format('YYYY-MM-DD HH:mm:ss')
            } else if (value) {
              values[key] = value
            }
          }
          this.$emit('input', values)
          this.$emit('click')
        }
      })

      console.log('submit query')
    }
  }
}
</script>

<style lang="less" scoped>
.table-query {
  padding: 0 10px;
  border-radius: 10px;
  max-width: none;
  .ant-calendar-picker {
    width: 100%;
  }
  .ant-row {
    margin-left: -10% !important;
  }
  .ant-form-item {
    display: flex;
    margin-bottom: 0;
    justify-content: flex-end;
    ::v-deep .ant-form-item-control-wrapper {
      width: 275px;
    }
  }
}
</style>
