<template>
  <div>
    <div style="display: flex; margin-bottom: 20px">
      <a-space :class="position === 'right' ? 'rightClass' : 'leftClass'">
        <a-button :disabled="disabled" v-if="isActive" icon="plus" type="primary" @click="$emit('open')">
          {{ $t('table.dialog.add') }}
        </a-button>
        <slot name="action-button"></slot>
      </a-space>
    </div>
    <a-alert showIcon style="margin-bottom: 16px; display: flex">
      <template slot="message">
        <span style="margin-right: 12px"
          >{{ $t('table.top.chosen') }}: <a style="font-weight: 600">{{ totalSelected }}</a></span
        >
      </template>
      <template slot="description" style="margin-left: auto">
        <a :disabled="disabled" @click="handleDelete" :v-if="totalSelected > 0">{{ $t('table.top.delete') }}</a>
      </template>
    </a-alert>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
import InfoCircle from '@/assets/info-circle.svg'
export default {
  name: 'ChosenAlertBox',
  props: {
    totalSelected: { type: Number, default: 0 },
    position: { type: String, default: 'left' },
    isActive: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  methods: {
    handleDelete() {
      if (this.totalSelected === 0) return
      this.$confirm({
        centered: true,
        title: i18nRender('delete.confirm'),
        cancelText: i18nRender('table.dialog.no'),
        onOk: () => {
          this.$emit('delete')
        },
        icon: () => <img style={{ float: 'left', marginRight: '16px' }} src={InfoCircle} />
      })
    }
  }
}
</script>

<style scoped>
.ant-alert >>> .ant-alert-description {
  margin-left: auto;
}

.leftClass {
  margin-right: auto;
}

.rightClass {
  margin-left: auto;
}
</style>
