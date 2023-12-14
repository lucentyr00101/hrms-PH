<template>
  <div style="margin-top: 60px">
    <a-row :gutter="[25, 25]">
      <a-col :xl="{ span: 6 }" :lg=" {span: 12} " v-for="(item, i) in data" :key="i">
        <a-card class="action-btn">
          <img :class="'btn-img-' + item.index" :src="item.imgSrc" />
          {{ item.title }}
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { i18nRender } from '@/locales'
const data = [
    {
        index: 0,
        title: i18nRender('dashboard.analysis.action.attendance'),
        imgSrc: 'icons/Attendance Icon.svg',
        imgSrcActive: 'icons/Attendance Icon-w.svg'
    },
    {
        index: 1,
        title: i18nRender('dashboard.analysis.action.claim'),
        imgSrc: 'icons/Claim Icon.svg',
        imgSrcActive: 'icons/Claim  Icon-w.svg'
    },
    {
        index: 2,
        title: i18nRender('dashboard.analysis.action.work-report'),
        imgSrc: 'icons/Work Report Icon.svg',
        imgSrcActive: 'icons/Work Report Icon-w.svg'
    },
    {
        index: 3,
        title: i18nRender('dashboard.analysis.action.leave'),
        imgSrc: 'icons/Leave Icon.svg',
        imgSrcActive: 'icons/Leave Icon-w.svg'
    },
    {
        index: 4,
        title: i18nRender('dashboard.analysis.action.announcement'),
        imgSrc: 'icons/Announcement Icon.svg',
        imgSrcActive: 'icons/AnnouncementIcon-w.svg'
    },
    {
        index: 5,
        title: i18nRender('dashboard.analysis.action.library'),
        imgSrc: 'icons/Library Icon.svg',
        imgSrcActive: 'icons/Library Icon-w.svg'
    },
    {
        index: 6,
        title: i18nRender('dashboard.analysis.action.assets'),
        imgSrc: 'icons/Assets Icon.svg',
        imgSrcActive: 'icons/Assets Icon-w.svg'
    },
    {
        index: 7,
        title: i18nRender('dashboard.analysis.action.payslip'),
        imgSrc: 'icons/Payslip Icon.svg',
        imgSrcActive: 'icons/Payslip Icon-w.svg'
    }
]
export default {
   name: 'ActionSection',
    data () {
        return {
            data,
            selectedIndex: null
        }
    },
    methods: {
        handleActive (selectedIndex) {
           this.selectedIndex = selectedIndex
           console.log(this.selectedIndex)
        }
    }

}
</script>

<style lang="less" scoped>

[data-theme='realdark'] {
  .action-btn{
    background-color: #141414;
  }
}

.action-btn{
    border: none;
    background-color: white;
    border-radius: 10px;
    font-size: 18px;
    color: #5F63F2;
    font-weight: 500;
    display: flex;
    align-items: center;
    text-align: center;
    align-content: center;
    padding-left: 10%;
    & img {
      margin-right: 20px;
    }
   &:active{
    background-color:  #5F63F2;
    color: white;
    border: none;
    .btn-img-{
      &0{
        content: url('/icons/Attendance Icon-w.svg')
      }
      &1{
        content: url('/icons/Claim Icon-w.svg')
      }
      &2{
        content: url('/icons/Work Report Icon-w.svg')
      }
      &3{
        content: url('/icons/Leave Icon-w.svg')
      }
      &4{
        content: url('/icons/Announcement Icon-w.svg')
      }
      &5{
        content: url('/icons/Library Icon-w.svg')
      }
      &6{
        content: url('/icons/Assets Icon-w.svg')
      }
      &7{
        content: url('/icons/Payslip Icon-w.svg')
      }
    }
   }
}
</style>
