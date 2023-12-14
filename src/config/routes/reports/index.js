const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export default {
  path: '/reports',
  name: 'reports',
  meta: { title: 'Reports', icon: 'project' },
  redirect: '/reports/user-role',
  component: RouteView,
  children: [
    {
      path: 'payslip-report',
      name: 'reports-candidate',
      meta: { title: 'Payslip Report', icon: 'project' }
      //   component: () => import('@/views/reports/Account')
    },
    {
      path: 'payroll-report',
      name: 'reports-userroles',
      meta: { title: 'Payroll Report', icon: 'project' }
      //   component: () => import('@/views/reports/UserRoles')
    },
    {
      path: 'sss-report',
      name: 'reports-sssreport',
      meta: { title: 'SSS Report', icon: 'project' }
      //   component: () => import('@/views/reports/Users')
    },
      {
      path: 'phic-report',
      name: 'reports-phicreport',
      meta: { title: 'PHIC Report', icon: 'project' }
      //   component: () => import('@/views/reports/Users')
    },
    {
      path: 'hdmf-report',
      name: 'reports-hdmf-hdmf-report',
      meta: { title: 'HDMF Report', icon: 'project' }
      //   component: () => import('@/views/reports/Users')
    },
    {
      path: 'tax-report',
      name: 'reports-tax-report',
      meta: { title: 'Tax Report', icon: 'project' }
      //   component: () => import('@/views/reports/Users')
    }

  ]
}
