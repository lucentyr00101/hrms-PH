<template>

  <div>
    <FillEmployee :employeeId="employeeId" />
    <AddResignation
      v-if="!status || status === RESIGNATION_STATUS_VALUE.WITHDRAW"
    />
    <PendingResignation
      v-else-if="status === RESIGNATION_STATUS_VALUE.PENDING"
    />
    <RejectedResignation
      v-else-if="status === RESIGNATION_STATUS_VALUE.REJECTED"
    />
    <ApprovedResignation
      v-else-if="status === RESIGNATION_STATUS_VALUE.APPROVED"
    />
  </div>

</template>

<script>
import { RESIGNATION_STATUS_VALUE } from '@/constant/enum'
import { mapGetters } from 'vuex'
import { employeeSetupMixin } from '@/store/app-mixin'
import FillEmployee from '@/components/Setup/Employee/EmployeeSetup/FillEmployee.vue'

export default {
  name: 'Resignation',
  components: {
    AddResignation: () => import('@/components/Setup/Employee/EmployeeSetup/Resignation/AddResignation'),
    PendingResignation: () => import('@/components/Setup/Employee/EmployeeSetup/Resignation/PendingResignation'),
    RejectedResignation: () => import('@/components/Setup/Employee/EmployeeSetup/Resignation/RejectedResignation'),
    ApprovedResignation: () => import('@/components/Setup/Employee/EmployeeSetup/Resignation/ApprovedResignation/index'),
    FillEmployee
},
  data () {
    return {
      // Approved, Rejected, Pending, None
      employeeSetupResignation: null,
      employee: null,
      RESIGNATION_STATUS_VALUE
    }
  },
  mixins: [employeeSetupMixin],
  computed: {
    ...mapGetters('api/setup/employee/employeeSetup/resignation', ['status', 'employeeResignation'])
  }

}
</script>
