<template>
  <div>
    <a-card>
      <a-tabs :default-active-key="activeKey">
        <a-tab-pane key="1" tab="Leave Type">
          <h1></h1>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Leave Group">
          <LeaveGroup />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import LeaveGroup from './LeaveGroup.vue'
import { ref } from 'vue'

export default {
  name: 'LeaveSetup',

  components: { LeaveGroup },
  setup () {
    return {
      activeKey: ref('1')
    }
  }
}
</script>
