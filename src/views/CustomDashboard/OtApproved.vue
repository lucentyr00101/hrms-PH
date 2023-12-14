<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="middle">
        <a-col :lg="{span:3}" :xs="{span:24}" :md="{span:8}" style="margin-top: 65px">
          <div class="ot-title">
            {{ $t('dashboard.analysis.ot.hour') }}
          </div>
          <div class="ot-title" >
            {{ $t('dashboard.analysis.ot.ot-approved') }}
          </div>
        </a-col>
        <a-col :lg="{span:3}" :xs="{span:24}" :md="{span:8}" v-for="(result, i) in results" :key="i">
          <a-card style="text-align:center; background:#fff">

            <div class="date-box">
              {{ result.date | moment('D MMM') }}
            </div>
            <a-space direction="vertical" size="large" style="width:100%">
              <div style="font-size:12px; color: #000;">
                {{ result.date | moment('dddd') }}
              </div>
              <div class="work-hour">
                {{ result.workHour }} {{ result.workHour > 1 ? 'hours': 'hour' }}
              </div>
              <div :class="`ot-box ot-box-${result.otApprovedStatus}`">
                <div class="ot-box-hour">{{ result.otApprovedHour }} {{ result.workHour > 1 ? 'hours': 'hour' }}</div>
                <div class="ot-box-status">{{ statusType[result.otApprovedStatus] }}</div>
              </div>
            </a-space>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>

export default {
  name: 'OtApproved',
  data () {
    return {
        statusType: {
            'pending': 'Pending',
            'approved': 'Approved',
            'rejected': 'Rejected'
        },
      results: [
        {
          'date': '2022-04-07',
          'workHour': 8,
          'otApprovedHour': 1.5,
          'otApprovedStatus': 'pending'
        },
        {
          'date': '2022-04-06',
          'workHour': 8,
          'otApprovedHour': 1,
          'otApprovedStatus': 'approved'
        },
        {
          'date': '2022-04-05',
          'workHour': 8,
          'otApprovedHour': 1.5,
          'otApprovedStatus': 'rejected'
        },
        {
          'date': '2022-04-04',
          'workHour': 8,
          'otApprovedHour': 1.5,
          'otApprovedStatus': 'rejected'
        },
        {
          'date': '2022-04-03',
          'workHour': 8,
          'otApprovedHour': 1.5,
          'otApprovedStatus': 'rejected'
        },
        {
          'date': '2022-04-02',
          'workHour': 8,
          'otApprovedHour': 2,
          'otApprovedStatus': 'rejected'
        },
        {
          'date': '2022-04-01',
          'workHour': 8,
          'otApprovedHour': 2,
          'otApprovedStatus': 'rejected'
        }
      ]
    }
  }

}
</script>

<style type="less" scoped>

.ant-card-bordered{
    border-radius: 10px;
    background: #20C997;
    margin-bottom: 10px;
}

.date-box {
    background: #5F63F2;
    padding: 4px;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-weight: 500;
}

.ot-box {
    padding: 8px;
    padding-left: 11px;
    padding-right: 11px;
    border-radius: 10px;
    min-width:85px;
    color: #fff;
    text-align: center;
    height: 60px;
}

.ot-box-approved {
    background: #49D940;
}
.ot-box-pending {
    background: #FFA800;
}
.ot-box-rejected {
    background: #F52C3C;
}

.work-hour {
    font-weight: 700;
    color: #000;
}

.ot-title{
    margin-top: 32px;
    background: #fff;
    padding: 8px;
    border-radius: 12px;
    text-align: center;
    font-weight: 700;
    color: #000;
    margin-bottom: 10px;
}

.ot-box-hour{
    font-size: 14px;
    font-weight: 500;
}

.ot-box-status {
    font-size: 10px;
}

</style>
