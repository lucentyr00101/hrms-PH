<template>
  <div id="resignation">
    <img src="@/assets/info.png" alt="">
    <p class="title">{{ $t('resignation.title') }}</p>
    <div class="content">
      <p class="message">{{ $t('resignation.message') }}</p>
      <p class="option" v-for="(option, index) in options" :key="index">
        <a-icon type="smile" style="margin-right: 10px;" />
        {{ option }}
      </p>
    </div>
    <a-space style="align-self: end;">
      <cancel-button />
      <a-button type="primary" @click="$store.commit('modal/TOGGLE_RESIGNATION_REASON_MODAL')">{{ $t('resignation.resign') }}</a-button>
    </a-space>
    <ResignReasonModal />
  </div>
</template>

<script>
import CancelButton from '@/components/Setup/Employee/EmployeeSetup/CancelButton.vue'
export default {
  name: 'AddResignation',
  components: {
    ResignReasonModal: () => import('@/components/Setup/Employee/EmployeeSetup/Resignation/ResignReasonModal'),
    CancelButton
  },
  computed: {
    options () {
      return [
        this.$t('resignation.option-1'),
        this.$t('resignation.option-2')
      ]
    }
  }
}
</script>

<style lang="less" scoped>
#resignation {
  height: 100%;
  padding: 20% 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 24px;
    font-weight: 500;
    margin-top: 20px;
  }
  .message {
    font-weight: 700;
    font-size: 16px;
  }
  .option {
    font-weight: 400;
    font-size: 14px;
  }

  .content {
    background: #FAFAFA;
    padding: 24px 40px;
    margin-bottom: 40px;
  }
  .ant-btn.ant-btn-primary {
    align-self: end;
  }
}

[data-theme='realdark']{
  #resignation{
    .content {
      background: #1f1f1f !important;
      padding: 24px 40px;
      margin-bottom: 40px;
      }
    }
  }
</style>
