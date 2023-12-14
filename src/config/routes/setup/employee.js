import { i18nRender } from '@/locales/index'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export default {
  path: 'employee',
  name: 'setup-employee',
  meta: { title: 'Employee', icon: 'user' },
  redirect: '/setup/employee/employee-setup',
  component: RouteView,
  children: [
    // employee work shift setup
    {
      path: 'employee-work-shift-setup',
      name: 'setup-employee-employee-work-shift-setup',
      meta: { title: 'Employee Work Shift Setup' },
      component: () => import('@/views/setup/employee/WorkShiftSetup')

    },
    // employee setup
    {
      path: 'employee-setup',
      name: 'setup-employee-employee-setup',
      meta: { title: 'Employee Setup' },
      component: () => import('@/views/setup/employee/EmployeeSetup')

    },
    // employee setup > add >
    {
      path: 'employee-setup/add',
      name: 'setup-employee-employee-setup-add',
      meta: { title: 'Employee Information' },
      redirect: 'employee-setup/add/employee-information',
      hidden: true
    },
    // employee setup > add > employee information
    {
      path: 'employee-setup/add/employee-information',
      name: 'setup-employee-employee-setup-add-employee-information',
      meta: { title: i18nRender('setup.employee.employee-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/Add'),
      hidden: true
    },
    // employee setup > add > work information
    {
      path: 'employee-setup/add/work-information',
      name: 'setup-employee-employee-setup-add-work-information',
      meta: { title: i18nRender('setup.employee.work-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/Add'),
      hidden: true
    },
     // employee setup > add > payroll information
    {
      path: 'employee-setup/add/payroll-information',
      name: 'setup-employee-employee-setup-add-payroll-information',
      meta: { title: i18nRender('setup.employee.payroll-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/Add'),
      hidden: true
    },
    // employee setup > add > resignation
    {
      path: 'employee-setup/add/resignation',
      name: 'setup-employee-employee-setup-add-resignation',
      meta: { title: i18nRender('setup.employee.resignation') },
      component: () => import('@/views/setup/employee/EmployeeSetup/Add'),
      hidden: true
    },
    // employee setup > add
    {
      path: 'employee-setup/add',
      name: 'setup-employee-employee-setup-add',
      meta: { title: 'Add' },
      component: () => import('@/views/setup/employee/EmployeeSetup/Add/index'),
      hidden: true
    },
    // employee setup > view >
    {
      path: 'employee-setup/view',
      name: 'setup-employee-employee-setup-view',
      meta: { title: 'Employee Information' },
      redirect: 'employee-setup/view/employee-information',
      hidden: true
    },
    // employee setup > view > deduction
    {
      path: 'employee-setup/view/deduction/:id',
      name: 'setup-employee-employee-setup-view-deduction',
      meta: { title: i18nRender('setup.employee.deduction') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view > employee information
    {
      path: 'employee-setup/view/employee-information/:id',
      name: 'setup-employee-employee-setup-view-employee-information',
      meta: { title: i18nRender('setup.employee.employee-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view > work information
    {
      path: 'employee-setup/view/work-information/:id',
      name: 'setup-employee-employee-setup-view-work-information',
      meta: { title: i18nRender('setup.employee.work-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view > payroll information
    {
      path: 'employee-setup/view/payroll-information/:id',
      name: 'setup-employee-employee-setup-view-payroll-information',
      meta: { title: i18nRender('setup.employee.payroll-information') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view > allowance
    {
      path: 'employee-setup/view/allowance/:id',
      name: 'setup-employee-employee-setup-view-allowance',
      meta: { title: i18nRender('setup.employee.allowance') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view > resignation
    {
      path: 'employee-setup/view/resignation/:id',
      name: 'setup-employee-employee-setup-view-resignation',
      meta: { title: i18nRender('setup.employee.resignation') },
      component: () => import('@/views/setup/employee/EmployeeSetup/View'),
      hidden: true
    },
    // employee setup > view
    {
      path: 'employee-setup/view',
      name: 'setup-employee-employee-setup-view',
      meta: { title: 'View' },
      component: () => import('@/views/setup/employee/EmployeeSetup/View/index'),
      hidden: true
    },
    {
      path: 'attendance-setup',
      name: 'setup-employee-attendance-setup',
      meta: { title: 'Attendance Setup' },
      component: () => import('@/views/setup/employee/AttendanceSetup')
    },
    {
      path: 'work-report-setup',
      name: 'setup-employee-work-report-setup',
      meta: { title: 'Work Report Setup' },
      component: () => import('@/views/setup/employee/WorkReportSetup')
    },
    {
      path: 'qualifications',
      name: 'setup-employee-qualifications',
      meta: { title: 'Qualifications' },
      component: () => import('@/views/setup/employee/Qualifications')
    },
    {
      path: 'work-shift-setup',
      name: 'setup-employee-work-shift-setup',
      meta: { title: 'Work Shift Setup' },
      component: () => import('@/views/setup/employee/WorkShiftSetup')
    },
    {
      path: 'loan-setup',
      name: 'setup-employee-loan-setup',
      meta: { title: 'Loan Setup' },
      component: () => import('@/views/setup/employee/LoanSetup')
    }
  ]
}
