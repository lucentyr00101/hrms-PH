<template>
  <a-card>
    <a-tabs @change="callback" v-model="activeKey">
      <a-tab-pane v-for="(el, i) in tabMenu" :key="i">
        <span slot="tab" v-html="el.title">
        </span>
        <component :is="el.component" :editable="false" class="tab"></component>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import { i18nRender } from '@/locales'
import EmployeeInformation from '../EmployeeInformation.vue'
import PayrollInformation from '../PayrollInformation/index.vue'
import WorkInformation from '../WorkInformation.vue'
import Resignation from '../Resignation.vue'
import { employeeSetupMixin } from '@/store/app-mixin'

const tabMenu = [
  {
    title: i18nRender('setup.employee.employee-information'),
    pathname: 'setup-employee-employee-setup-add-employee-information',
    component: 'employee-information'
  },
  {
    title: i18nRender('setup.employee.work-information'),
    pathname: 'setup-employee-employee-setup-add-work-information',
    component: 'work-information'
  },
  {
    title: i18nRender('setup.employee.payroll-information'),
    pathname: 'setup-employee-employee-setup-add-payroll-information',
    component: 'payroll-information'
  },
  // {
  //   title: i18nRender('setup.employee.allowance'),
  //   pathname: 'setup-employee-employee-setup-add-allowance',
  //   component: 'allowance'
  // },
  {
    title: i18nRender('setup.employee.resignation'),
    pathname: 'setup-employee-employee-setup-add-resignation',
    component: 'resignation'
  }
]

export default {
  components: { EmployeeInformation, PayrollInformation, Resignation, WorkInformation },
  name: 'EmployeeSetupAdd',
  mixins: [employeeSetupMixin],
  props: {
    status: { type: String, default: '' }
  },
  data () {
    return {
      tabMenu,
      activeKey: 0
    }
  },
  methods: {
    titleIcon () {
      this.addIcon = `&nbsp<img src="/icons/warning-icon.svg"/>`
      this.tabMenu.forEach((item) => {
        // handle employee null
        if (this.employeeId === null || this.employeeId === undefined || this.employeeId === '') {
          if (item.component === 'work-information') {
            if (item.title !== `Work Information&nbsp<img src="/icons/warning-icon.svg"/>`) {
              item.title += this.addIcon
            }
          }
          // if (item.component === 'deduction') {
          //   if (item.title !== `Deduction&nbsp<img src="/icons/warning-icon.svg"/>`) {
          //     item.title += this.addIcon
          //   }
          // }
        }
      })
    },
    callback (val) {
      this.$router.push({ name: tabMenu[val].pathname })
    },
    getEditable () {
      return this.editable
    },
    handleEditable () {
      this.editable = !this.editable
    }
  },
  watch: {
    $route (to, from) {
      this.activeKey = tabMenu.findIndex((el) => el.pathname === to.name)
    }
  },
  created () {
    this.activeKey = tabMenu.findIndex((el) => el.pathname === this.$route.name)
    console.log(this.$route.params.length > 0)
    this.titleIcon()
  }

}
</script>

<style scoped>
.ant-card >>> .ant-card-body {
  padding-top: 0px;
}
</style>
