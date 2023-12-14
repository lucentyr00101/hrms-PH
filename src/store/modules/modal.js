import * as user from './modals/security/user'
import * as roles from './modals/security/user-roles'
import * as calendar from './modals/setup/company/calendar'
import * as department from './modals/setup/company/departments'
import * as leaveSetup from './modals/setup/company/leave-setup'
import * as dictionary from './modals/setup/dictionary'
import * as assets from './modals/setup/company/assets'
import * as employeeAssets from './modals/main/employee-management/assets'
import * as sss from './modals/setup/payroll/sss'
import * as phic from './modals/setup/payroll/phic'
import * as hdmf from './modals/setup/payroll/hdmf'
import * as tin from './modals/setup/payroll/tin'
import * as resignation from './modals/setup/employee/employee-setup/resignation'
import * as workShiftSetup from './modals/setup/employee/employee-setup/work-shift-setup'
import * as attendanceSetup from './modals/setup/employee/employee-setup/attendance-setup'
import * as attendanceLists from './modals/main/employee-management/attendance-lists'

const modal = {
  namespaced: true,
  state: {
    ...user.state,
    ...roles.state,
    ...calendar.state,
    ...department.state,
    ...leaveSetup.state,
    ...dictionary.state,
    ...assets.state,
    ...employeeAssets.state,
    ...hdmf.state,
    ...sss.state,
    ...phic.state,
    ...tin.state,
    ...resignation.state,
    ...workShiftSetup.state,
    ...attendanceSetup.state,
    ...attendanceLists.state
  },
  mutations: {
    ...user.mutations,
    ...roles.mutations,
    ...calendar.mutations,
    ...department.mutations,
    ...leaveSetup.mutations,
    ...dictionary.mutations,
    ...assets.mutations,
    ...employeeAssets.mutations,
    ...hdmf.mutations,
    ...sss.mutations,
    ...phic.mutations,
    ...tin.mutations,
    ...resignation.mutations,
    ...attendanceSetup.mutations,
    ...workShiftSetup.mutations,
    ...attendanceLists.mutations
  },
  getters: {
    ...user.getters,
    ...leaveSetup.getters,
    ...dictionary.getters,
    ...assets.getters,
    ...employeeAssets.getters,
    ...resignation.getters
  }
}

export default modal
