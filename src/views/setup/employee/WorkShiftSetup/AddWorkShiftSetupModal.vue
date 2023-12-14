<template>
  <div>
    <a-modal
      :title="$t('Add Work Shift Type')"
      :width="800"
      v-model="AddWorkShiftSetupModal"
      :cancelButtonProps="{ style: { display: 'none' } }"
      :okButtonProps="{ style: { display: 'none' } }"
      @cancel="closeModal()"
    >
      <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <a-form-item label="Work Shift Type: " >
          <a-input
            :maxLength="25"
            v-decorator="['workShiftType', { rules: [{ required: true, message: 'Work Shift Type is required!' }] }]"
            placeholder="example"
          >
          </a-input
          ></a-form-item>
        <!-- <a-row>
          <a-col :span="5" :style="{textAlign:'right'}"><span style="color: red;">*</span>Time:</a-col>
          <a-col :span="19">
            <a-row>
              <a-col :span="5">
                <a-form-item
                  :style="{ display: 'inline-block' }"
                >
                  <a-time-picker
                    placeholder="End Time"
                    v-decorator="['endTime', { rules: [{ required: true, message: 'End Time is required!' }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="2" :style="{textAlign:'center', verticalAlign:'middle'}">-</a-col>
              <a-col :span="5">
                <a-form-item
                  :style="{ display: 'inline-block' }"
                >
                  <a-time-picker
                    placeholder="End Time"
                    v-decorator="['endTime', { rules: [{ required: true, message: 'End Time is required!' }] }]"
                  />
                </a-form-item></a-col>
            </a-row>
          </a-col>
        </a-row> -->
        <a-form-item
          style="margin-bottom:0;"
          label="Work Time"
          :labelCol="{ span: 7, offset: 1}"
          :wrapperCol="{ span: 12, offset: 0}">
          <a-time-picker
            style="width: 44%"
            placeholder="Start Time"
            v-decorator="['starTime', { rules: [{ required: true, message: 'hi' }] }]"
          />
          <span :style="{ display: 'inline-block', width: '20px', textAlign: 'center'}">
            -
          </span>
          <a-form-item
            :style="{ display: 'inline-block' }"
          >
            <a-time-picker
              style="width: 100%"
              placeholder="End Time"
              v-decorator="['endTime', { rules: [{ required: true, message: 'hii' }] }]"
            />
          </a-form-item>
        </a-form-item>

        <!-- <a-form-item
          label="Work Time"
          :labelCol="{ span: 7, offset: 1}"
          :wrapperCol="{ span: 15, offset: 0}">
          <a-time-picker
            style="width: 37%"
            placeholder="Start Time"
            v-decorator="['starTime', { rules: [{ required: true, message: 'Start Time is required!' }] }]"
          />
          <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
            -
          </span>
          <a-time-picker
            style="width: 37%"
            placeholder="End Time"
            v-decorator="['endTime', { rules: [{ required: true, message: 'End Time is required!' }] }]"
          />
        </a-form-item> -->
        <a-form-item label="Remarks:">
          <a-input
            :maxLength="100"
            type="textarea"
            mode="tags"
            style="width: 100%"
            placeholder="Autosize height based on content lines="
            v-decorator="['remarks']"
          >
          </a-input
          ></a-form-item>
        <a-form-item label="Late Deduction By">
          <a-input
            style="width: 100%"
            placeholder="example"
          >
            <a-select
              slot="addonAfter"
              v-decorator="['lateDeductionBy', { initialValue: 'hourly' }]"
              style="width: 100px"
            >
              <a-select-option value="hourly">
                hourly
              </a-select-option>
              <a-select-option value="minutes">
                minutes
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item label="Late Deduction Amount">
          <a-input
            type="number"
            placeholder="example"
            v-decorator="['lateDeductionAmount']"
            addon-after="$"
          >
          </a-input>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 1, offset: 18 }">
          <a-button class="confirm-btn" type="primary" @click="handleSubmit()">{{ $t('table.dialog.confirm') }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import { i18nRender } from '@/locales'

export default {
  name: 'AddWorkShiftSetupModal',

  data () {
    return {
      TreeSelect,
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      dp: this.data
    }
  },
  props: {
    data: { type: Array,
    default () {
      return null
      }
    }
  },
  computed: {
    AddWorkShiftSetupModal: {
      get () {
        return this.$store.state.modal.AddWorkShiftSetupModal
      },
      set () {
        // just to prevent error log when @cancel
      }

    }
  },
  methods: {
    accessChild (data) {
      data.forEach(el => {
        const lastParentKey = el.key
        if (el.children && el.children.length > 0) {
          el.children.forEach((elj) => {
              if (lastParentKey) { elj.parent = lastParentKey }
          })
          return this.accessChild(el.children)
        }
      })
    },
    closeModal () {
      this.$store.commit('modal/TOGGLE_ADD_WORK_SHIFT_SETUP_MODAL')
      this.form.resetFields()
    },
    handleSubmit () {
      const _this = this
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          _this.showInfo()
        }
      })
    },
    showInfo () {
      const _this = this
      this.$confirm({
        title: i18nRender('table.dialog.confirm-msg'),
        okText: i18nRender('table.dialog.yes'),
        cancelText: i18nRender('table.dialog.no'),
        onOk () {
          // TODO - api call
          _this.$message.success(i18nRender('table.dialog.work-shift-setup-added'))
          _this.closeModal()
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
