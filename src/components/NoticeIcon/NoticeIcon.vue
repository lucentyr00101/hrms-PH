<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <template slot="content">
      <div :spinning="loading" >
        <!-- <a-tabs> -->
        <a-list :data-source="data">
          <div
            v-if="showLoadingMore"
            slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-spin v-if="loadingMore" />
            <a-button>
              More
            </a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-icon type="clock-circle" theme="filled"/>
            <a-list-item-meta :title="item.title" :description="item.time | moment('dddd')" />
            <!-- <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/> -->
          </a-list-item>
        </a-list>
      </div>
      <!-- <a-tab-pane tab="通知" key="1">

          </a-tab-pane> -->
      <!-- <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane>
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane> -->
      <!-- </a-tabs> -->
    </template>
    <span @click="fetchNotice" class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-badge :count="data.length">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script>
const data = [
  {
    title: 'Sick Leave',
    time: '2019-07-07'
  },
  {
    title: 'Parking Claim',
    time: '2019-07-08'
  },
  {
    title: 'Attendance',
    time: '2019-07-09'
  },
  {
    title: 'OT1',
    time: '2019-07-10'
  }
]

export default {
  name: 'HeaderNotice',
  data () {
    return {
      loading: false,
      loadingMore: false,
      visible: false,
      data,
      showLoadingMore: true
    }
  },
  methods: {
    fetchNotice () {
      if (!this.visible) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      } else {
        this.loading = false
      }
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-spin-container{
    height: 400px;
  }
  .header-notice-wrapper {
    top: 50px !important;
  }
  .ant-list-item-meta-title{
    position: absolute;
    left: 0;
  }
  .ant-list-item-meta-description{
    margin-top: 25px;
  }
  .anticon-clock-circle{
    margin-top: 25px;
    margin-right: 10px;
  }
  .header-notice{
    display: inline-block;
    transition: all 0.3s;
    span {
      vertical-align: initial;
    }
  }
  .ant-btn{
    border: none;
    font-weight: 600;
  }
</style>
