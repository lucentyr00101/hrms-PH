
const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: '/security',
  name: 'security',
  meta: { title: 'Security', icon: 'safety' },
  redirect: '/security/user-role',
  component: RouteView,
  children: [
    {
      path: 'account',
      name: 'security-account',
      meta: { title: 'Account', icon: 'safety' },
      component: () => import('@/views/security/Account')
    },
    {
      path: 'user-role',
      name: 'security-userroles',
      meta: { title: 'User Roles', icon: 'safety' },
      component: () => import('@/views/security/UserRoles')
    },
     {
      path: 'users',
      name: 'security-users',
      meta: { title: 'Users', icon: 'safety' },
      component: () => import('@/views/security/Users')
    },
    {
      path: 'account-center',
      name: 'security-account-center',
      meta: { title: 'Account Center', icon: 'safety' },
      component: () => import('@/views/security/AccountCenter')
    }
  ]
}
