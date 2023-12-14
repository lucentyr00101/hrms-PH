const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: 'company',
  name: 'setup-company',
  meta: { title: 'Company', icon: 'user' },
  redirect: '/setup/company/company-profile',
  component: RouteView,
  children: [
    {
      path: 'company-profile',
      name: 'setup-company-company-profile',
      meta: { title: 'Company Profile' },
      component: () => import('@/views/setup/company/CompanyProfile')
    },
    {
      path: 'banks',
      name: 'setup-company-bank',
      meta: { title: 'Banks' },
      component: () => import('@/views/setup/company/Banks')
    },
    {
      path: 'department',
      name: 'setup-company-department',
      meta: { title: 'Departments' },
      component: () => import('@/views/setup/company/Departments/index')
    },
    {
      path: 'calendar',
      name: 'setup-company-calendar',
      meta: { title: 'Calendar' },
      component: () => import('@/views/setup/company/Calendar')
    },
    {
      path: 'leave-setup',
      name: 'setup-company-leave-setup',
      meta: { title: 'Leave Setup' },
      component: () => import('@/views/setup/company/LeaveSetup/index')
    }, {
      path: 'leave-setting',
      name: 'setup-company-leave-setting',
      meta: { title: 'Leave Setting' },
      component: () => import('@/views/setup/company/LeaveSetting')
    },
    {
      path: 'announcment',
      name: 'setup-company-announcement',
      meta: { title: 'Announcement' },
      component: () => import('@/views/setup/company/Announcement')
    },
    {
      path: 'assets-setup',
      name: 'setup-company-assets-setup',
      meta: { title: 'Assets Setup' },
      component: () => import('@/views/setup/company/AssetsSetup')
    },
    {
      path: 'library',
      name: 'setup-company-library',
      meta: { title: 'Library' },
      component: () => import('@/views/setup/company/Library')
    }
  ]
}
