const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export default {
  path: 'employee-management',
  name: 'employee-management',
  meta: { title: 'Employee Management', icon: 'dollar' },
  redirect: '/main/employee-management/attendance-list',
  component: RouteView,
  children: [
    {
      path: 'attendance-list',
      name: 'main-employee-management-attendance-list',
      meta: { title: 'Attendance List' },
      component: () => import('@/views/main/employee-management/AttendanceList/index')
    },
    {
      path: 'work-report-list',
      name: 'main-employee-management-work-report-list',
      meta: { title: 'Work Report Lists' },
      component: () => import('@/views/main/employee-management/WorkReportList')
    },
    {
      path: 'assets-list',
      name: 'main-employee-management-assets-list',
      meta: { title: 'Assets Lists' },
      component: () => import('@/views/main/employee-management/AssetsList/')
    },
    {
      path: 'work-shift',
      name: 'main-employee-management-work-shift',
      meta: { title: 'Work Shift' },
      component: () => import('@/views/main/employee-management/WorkShift')
    }
  ]
}
