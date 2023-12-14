<template>
  <div>
    <user-status />
    <action-section />
    <leave />
    <ot-approved />
  </div>
</template>

<script>
import Leave from './Leave'
import OtApproved from './OtApproved'
import UserStatus from './UserStatus'
import ActionSection from './ActionSection'
export default {
  components: { OtApproved, Leave, UserStatus, ActionSection },
  name: 'CustomDashboard'
}
</script>
