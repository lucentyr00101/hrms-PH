const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: 'm-payroll',
  name: 'main-payroll',
  meta: { title: 'Payroll', icon: 'dollar' },
  redirect: '/main/m-payroll/generate',
  component: RouteView,
  children: [
    {
      path: 'generate',
      name: 'main-payroll-generate',
      meta: { title: 'Generate Payroll' },
      component: () => import('@/views/main/payroll/GeneratePayroll')
    },
    {
      path: 'commissions',
      name: 'main-payroll-commissions',
      meta: { title: 'Commissions' },
      component: () => import('@/views/main/payroll/Commissions')
    },
    {
      path: 'bonus',
      name: 'main-payroll-bonus',
      meta: { title: 'Bonus' },
      component: () => import('@/views/main/payroll/Bonus')
    },
    {
      path: 'allowance',
      name: 'main-payroll-allowance',
      meta: { title: 'Allowance' },
      component: () => import('@/views/main/payroll/Allowance')
    },
    {
      path: 'deduction',
      name: 'main-payroll-deduction',
      meta: { title: 'Deduction' },
      component: () => import('@/views/main/payroll/Deduction')
    },
    {
      path: 'additional-remuneration',
      name: 'main-payroll-additional-remuneration',
      meta: { title: 'Additional Remuneration' },
      component: () => import('@/views/main/payroll/AdditionalRemuneration')
    }
  ]
}
