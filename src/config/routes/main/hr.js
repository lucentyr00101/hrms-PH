const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: 'hr',
  name: 'main-hr',
  meta: { title: 'HR', icon: 'user' },
  redirect: '/main/hr/leave-transactions',
  component: RouteView,
  children: [
    {
      path: 'leave-transactions',
      name: 'main-hr-leave-transactions',
      meta: { title: 'Leave Transactions' },
      component: () => import('@/views/main/hr/LeaveTransactions')
    },
    {
      path: 'leave-balance',
      name: 'main-hr-leave-balance',
      meta: { title: 'Leave Balance' },
      component: () => import('@/views/main/hr/LeaveBalance')
    },
    {
      path: 'claim-transactions',
      name: 'main-hr-claim-transactions',
      meta: { title: 'Claim Transactions' },
      component: () => import('@/views/main/hr/ClaimTransactions')
    },
    {
      path: 'loan-transactions',
      name: 'main-hr-loam-transactions',
      meta: { title: 'Loan Transactions' },
      component: () => import('@/views/main/hr/LoanTransactions')
    }
  ]
}
