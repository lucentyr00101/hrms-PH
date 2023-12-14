<template>
  <a-card>
    <a-tabs @change="callback" v-model="activeKey">
      <!-- <a-tab-pane v-for="(el, i) in tabMenu" :key="i" :tab="el.title"> -->
      <a-tab-pane v-for="(el, i) in tabMenu" :key="i" >
        <span slot="tab" v-html="el.title">
        </span>
        <component :is="el.component" @titleIcon="titleIcon" :editable="getEditable()" @handleEditable="handleEditable" class="tab"></component>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script scoped>
import { employeeSetupMixin } from '@/store/app-mixin'
import EmployeeInformation from '../EmployeeInformation.vue'
import PayrollInformation from '../PayrollInformation/index.vue'
import WorkInformation from '../WorkInformation.vue'
import Resignation from '../Resignation.vue'

export default {
  name: 'EmployeeSetupView',
  mixins: [employeeSetupMixin],
  data () {
    return {
      activeKey: 0,
      editable: true,
      tabMenu: [
        {
          title: this.$t('setup.employee.employee-information'),
          pathname: 'setup-employee-employee-setup-view-employee-information',
          component: 'employee-information'
        },
        {
          title: this.$t('setup.employee.work-information'),
          pathname: 'setup-employee-employee-setup-view-work-information',
          component: 'work-information'
        },
        {
          title: this.$t('setup.employee.payroll-information'),
          pathname: 'setup-employee-employee-setup-view-payroll-information',
          component: 'payroll-information'
        },
        {
          title: this.$t('setup.employee.resignation'),
          pathname: 'setup-employee-employee-setup-view-resignation',
          component: 'resignation'
        }
      ]
    }
  },
  components: { EmployeeInformation, PayrollInformation, Resignation, WorkInformation },
  methods: {
    titleIcon () {
      this.object = this.getEmployeeSetup(this.employeeId)
      console.log('promise', this.object)
      this.addIcon = `&nbsp<img src="/icons/warning-icon.svg"/>`
      if (this.object instanceof Promise) {
        this.object.then(all => {
          this.tabMenu.forEach((item) => {
            // handle null
            if (all.employee_setup_work_info === null) {
              if (item.component === 'work-information') {
                if (item.title !== `Work Information&nbsp<img src="/icons/warning-icon.svg"/>`) {
                  item.title += this.addIcon
                }
              }
            }
            // handle not null
            if (all.employee_setup_work_info !== null) {
              if (item.component === 'work-information') {
                if (item.title === `Work Information&nbsp<img src="/icons/warning-icon.svg"/>`) {
                 item.title = ''
                 item.title = 'Work Information'
                }
              }
            }
            if (item.component === 'payroll-information') {
              item.title = this.$t('setup.employee.payroll-information')
              if (!all.employee_setup_payroll_info) {
                item.title += this.addIcon
              }
            }
          })
        })
      }
    },
    callback (val) {
      const { id } = this.$route.params
      this.$router.push({ name: this.tabMenu[val].pathname, params: { id } })
    },
    getEditable () {
      return this.editable
    },
    handleEditable () {
      this.editable = !this.editable
    }
  },
  props: {
  },
  watch: {
    $route (to, from) {
      this.activeKey = this.tabMenu.findIndex((el) => el.pathname === to.name)
    }
  },
  created () {
    this.activeKey = this.tabMenu.findIndex((el) => el.pathname === this.$route.name)
    this.titleIcon()
  }
}
</script>
