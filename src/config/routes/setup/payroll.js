const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: 's-payroll',
  name: 'setup-payroll',
  meta: { title: 'Payroll', icon: 'user' },
  redirect: '/setup/s-payroll/payroll-commission',
  exact: true,
  component: RouteView,
  children: [
    {
      path: 'commission',
      name: 'setup-payroll-commission',
      meta: { title: 'Commissions' },
      component: () => import('@/views/setup/payroll/Commission')
    },
    {
      path: 'allowance',
      name: 'setup-payroll-allowance',
      meta: { title: 'Allowance' },
      component: () => import('@/views/setup/payroll/Allowance')
    },
    {
      path: 'work-report-setup',
      name: 'setup-payroll-deduction',
      meta: { title: 'Deduction' }
    //   component: () => import('@/views/setup/payroll/WorkReportSetup')
    },
    {
      path: 'additional-remunation',
      name: 'setup-payroll-additional-remunation',
      meta: { title: 'Additional Remuneration' }
    //   component: () => import('@/views/setup/payroll/Qualifications')
    },
    {
      path: 'overtime',
      name: 'setup-payroll-overtime',
      meta: { title: 'Overtime' }
    //   component: () => import('@/views/setup/payroll/Qualifications')
    },
    {
      path: 'tax',
      name: 'setup-payroll-tax',
      meta: { title: 'Tax' },
      component: () => import('@/views/setup/payroll/TAX')
    },
    {
      path: 'sss',
      name: 'setup-payroll-sss',
      meta: { title: 'SSS' },
      component: () => import('@/views/setup/payroll/SSS')
    },
    {
      path: 'phic',
      name: 'setup-payroll-phic',
      meta: { title: 'PHIC' },
      component: () => import('@/views/setup/payroll/Phic')
    }, {
      path: 'hdmf',
      name: 'setup-payroll-hdmf',
      meta: { title: 'HDMF' },
      component: () => import('@/views/setup/payroll/HDMF/index')
    }

  ]
}
