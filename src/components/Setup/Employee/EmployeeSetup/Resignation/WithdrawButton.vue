<template>
  <div v-if="employee.id == currentUser.employee_setup.id">
    <a-button @click="showModal = true" type="danger">{{
      $t('resignation.withdraw')
    }}</a-button>

    <a-modal
      :title="$t('resignation.withdraw')"
      centered
      v-model="showModal"
      okText="Confirm"
      :cancelButtonProps="{ style: { display: 'none' } }"
      @ok="withdrawResignation"
      destroyOnClose
    >
      <p>{{ $t('resignation.withdraw-message') }}</p>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      showModal: false
    }
  },

  methods: {
    ...mapActions('api/setup/employee/employeeSetup/resignation', ['withdraw']),
    withdrawResignation () {
      return new Promise(async (resolve) => {
        this.loading = true
        await this.withdraw({ id: this.employeeResignation.id })
        this.showModal = false

        this.$notification.open({
          message: this.$t('notification.resignation.withdraw'),
          icon: <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
        })
        this.loading = false
        resolve()
      })
    }
  },
  computed: {
    ...mapGetters('api/auth', ['currentUser']),
    ...mapGetters('api/setup/employee/employeeSetup', ['employee']),
    ...mapGetters('api/setup/employee/employeeSetup/resignation', ['employeeResignation'])
  }
}
</script>
