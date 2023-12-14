import department from './department'
import calendarMasterList from './calendar-master-list'
import calendar from './calendar'
import leaveGroup from './leave-group'
import assetSetup from './asset-setup'
export default {
  namespaced: true,
  modules: {
    department,
    calendarMasterList,
    calendar,
    leaveGroup,
    assetSetup
  }
}
