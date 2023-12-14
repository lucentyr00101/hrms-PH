<template>
  <div class="status-cards">
    <div class="status-card"><span class="bold">{{ $t('dashboard.analysis.table.date') }}: </span>  2022-04-25 13:00:09 </div>
    <div class="status-card"><span class="bold">{{ $t('dashboard.analysis.table.status') }}:</span> <span class="status-message">{{ statusMessage }}</span></div>
    <div class="status-card"><span class="bold">{{ $t('dashboard.analysis.table.logged-in') }}:</span> 13:00:09 </div>
    <div class="status-card"><span class="bold">{{ $t('dashboard.analysis.table.work-time') }}:</span> 5 Hours 35 minutes</div>
    <div class="status-card-button" >
      <a-button icon="plus" type="link"/>
      <span class="button-text"> {{ statusMessage }} </span>
      <a-popover placement="bottomRight">
        <template slot="content">
          <a-list :data-source="statusList">
            <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
              <a @click="handleAction(item.message)"><a-list-item-meta :title="item.message" /></a>
            </a-list-item>
          </a-list>
        </template>
        <a-button icon="ellipsis" type="link" />
      </a-popover>
    </div>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
const data = [
  'WORKING'
]

const statusList = [
    { message: i18nRender('dashboard.analysis.status.timeout') },
    { message: i18nRender('dashboard.analysis.status.working') },
    { message: i18nRender('dashboard.analysis.status.out-for-break') },
    { message: i18nRender('dashboard.analysis.status.off-work') },
    { message: i18nRender('dashboard.analysis.status.overtime') }
]

var statusMessage = statusList[1].message

export default {
    name: 'UserStatus',
    data () {
        return {
            data,
            statusList,
            statusMessage
        }
    },
    methods: {
        handleAction (currentMessage) {
            this.statusMessage = currentMessage
            console.log(statusMessage)
        }
    }
}
</script>

<style lang="less" scoped>

[data-theme='realdark'] {
  .status-card{
    background-color: #141414;
  }
}
.status-message{
  color: #52C41A;
  font-size: 20px;
}

.status-cards{
 display: flex;
 flex-direction: row;
 justify-content: space-between;
}
.button-text{
  color: white;
  font-size: 16px;
}
.status-card{
  background-color: white;
  width: 20%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-weight: 500;
  font-size: 16px;
    .bold{
      font-weight: bolder;
      margin-right: 5px;
    }
    &-button{
        background: #FF6385;
        width: max-content;
        border-radius: 10px;
        align-items: center;
        text-align: center;
        display: flex;
        padding: 20px;
        .ant-btn-link{
            background-color: none;
            color: white;
            margin: 0 5px 0 5px;
        }
    }
}

@media (max-width: 1200px){
  .status-cards{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }
  .status-card{
    justify-content: left;
    width: 80%;
  }
}
</style>
