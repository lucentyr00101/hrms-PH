<template>
  <div>
    <a-card>
      <a-tabs :default-active-key="activeKey">
        <a-tab-pane key="1" tab="Master List">
          <MasterListCalendar />
        </a-tab-pane>

        <a-tab-pane key="2" tab="Calendar">
          <RegularCalendar />
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <add-calendar-modal :data="activeData"/>
  </div>
</template>

<script>

import MasterListCalendar from '@/components/Setup/Company/Calendar/MasterListCalendar'
import RegularCalendar from '@/components/Setup/Company/Calendar/RegularCalendar'
import AddCalendarModal from './AddCalendarModal.vue'
import ChosenAlertBox from '@/components/Table/ChosenAlertBox.vue'

import { ref } from 'vue'
import moment from 'moment'
// dummy data to replicate UI design
const dataMaster = []
const activeData = []
const dataCal = []
const holidays = ['New Year', 'Labour Day', 'Christmas', 'Christmas Eve', 'National Day']
const holidayType = ['Regular Holiday', 'Festive Holiday', 'National Holiday']

for (let i = 0; i < holidays.length; i++) {
  dataMaster.push({
    key: i,
    holiday: holidays[i],
    holidayType: holidayType[i],
    startDate: moment('2022-09-08'),
    endDate: moment('2022-10-30'),
    description: `${holidays[i]}'s description`
  })
}

for (let i = 0; i < 46; i++) {
  dataCal.push({
    key: i,
    calName: 'Hello world',
    description: 'this is a description'
  })
}

export default {
  name: 'Calendar',
  data () {
    return {
      dataMaster,
      dataCal,
      activeData,
      selectedRowKeys: [],
      selectedRowKeysCal: [],
      action: null,
      mdl: null,
      moment,
      holidayType
    }
  },
  components: { AddCalendarModal, ChosenAlertBox, MasterListCalendar, RegularCalendar },
  setup () {
    return {
      activeKey: ref('1')
    }
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          this.showConfirm()
        }
      })
    },
    openAddCalendarModal () {
      this.$store.commit('modal/TOGGLE_ADD_CALENDAR_MODAL')
    },
    onSelectChange (selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
    },
    onSelectChangeCal (selectedRowKeys) {
      console.log('selectedRowKeys change: ' + selectedRowKeys)
      this.selectedRowKeysCal = selectedRowKeys
    },
    handleStatus (e, record) {
      dataMaster[record.key].status = e
      if (!e) {
        this.$message.success('Holiday disabled!')
        this.activeData = activeData.filter(data => dataMaster.status === true)
        console.log(this.activeData)
        console.log(activeData)
      } else {
        this.$message.success('Holiday enabled!')
        activeData.push(dataMaster[record.key])
      }
    },
    handleStatusCal (e, record) {},
    handleEdit () {
      this.$store.commit('modal/TOGGLE_ADD_CALENDAR_MODAL')
    }
  }
}
</script>
