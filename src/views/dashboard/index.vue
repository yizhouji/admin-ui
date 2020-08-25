<template>
  <div>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="!isMobile && 'desktop'">
      <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="antd-pro-pages-dashboard-analysis-salesCard"
            :bordered="false"
            title="销售额类别占比"
            :style="{ height: '100%' }"
          >
            <div slot="extra" style="height: inherit;">
              <div class="extra-wrapper saleChange">
                <div class="extra-item marketChange">
                  <a @click="salaChange('1')" :class="type === '1'?'active':''">本周</a>
                  <a @click="salaChange('2')" :class="type === '2'?'active':''">本月</a>
                  <a @click="salaChange('3')" :class="type === '3'?'active':''">全年</a>
                </div>
              </div>
            </div>
            <h4>销售额</h4>
            <!-- <div v-show="saleList && saleList.length>0"> -->
            <div id="chart" style="height:400px"></div>
            <!-- </div> -->
            <!-- <div v-show="!(saleList && saleList.length>0)"> -->
            <!-- <div class="nodata">暂无数据</div> -->
            <!-- </div> -->
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            :loading="noteLoading"
            :bordered="false"
            title="记事本/图片"
            :style="{ height: '100%' }"
          >
            <div slot="extra" style="height: inherit;">
              <div class="btnList">
                <div class="btn active" @click="addNote">新建</div>
                <div class="btn" @click="findNote">更多</div>
              </div>
            </div>
            <div class="noteChangeBtn">
              <a-button style="color:#f2637b;border-color:#f2637b;" @click="noteChange('1')">重要事件</a-button>
              <a-button style="color:#3ba0ff;border-color:#3ba0ff;" @click="noteChange('2')">一般事件</a-button>
              <a-button style="color:#999999;border-color:#999999;" @click="noteChange('3')">全部</a-button>
            </div>
            <div class="noteList">
              <a-list :data-source="noteList" :pagination="pagination" item-layout="horizontal">
                <a-list-item slot="renderItem" slot-scope="item" @click="findNote(item.notepadId)">
                  <template>
                    <div class="item" :key="item.notepadId">
                      <div class="doted danger" v-if="item.significance === 1 "></div>
                      <div class="doted info" v-if="item.significance === 2 "></div>
                      <div class="doted gray" v-if="item.significance === 3 "></div>
                      <div class="title">{{ item.notepadTitle }}</div>
                      <div class="date">{{ item.createTime }}</div>
                    </div>
                  </template>
                </a-list-item>
                <div class="img">
                  <template v-for="(item,index) in imgList">
                    <template v-if="index < 4">
                      <img
                        :src="item.url"
                        alt
                        :key="item.notepadId"
                        @click="findNote(item.notepadId)"
                      />
                    </template>
                  </template>
                </div>
              </a-list>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-card :bordered="false" style="margin-top:24px" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item marketChange">
              <a @click="marketChange('1')" :class="marketType === '1'?'active':''">最近7天</a>
              <a @click="marketChange('2')" :class="marketType === '2'?'active':''">最近30天</a>
              <a @click="marketChange('3')" :class="marketType === '3'?'active':''">最近1年</a>
            </div>
            <!-- <a-range-picker :style="{width: '256px'}" /> -->
          </div>
          <a-tab-pane loading="true" tab="销售额" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <!-- <bar :data="barData" title="销售额排行" /> -->
                <div class="title" style="padding-left:20px">销售额趋势</div>
                <div id="marketChart" style="height:300px"></div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="产品销售额排名" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import {
  // ChartCard,
  // MiniArea,
  // MiniBar,
  // MiniProgress,
  RankList,
  Bar,
  Trend,
  NumberInfo,
  MiniSmoothArea
} from '@/components'
import { baseMixin } from '@/store/app-mixin'
import { Salerooms, getMarkets } from '@/api/index'
import { getNote } from '@/api/note'
import { forEach } from 'store/storages/all'
var echarts = require('echarts')

export default {
  name: 'Index',
  mixins: [baseMixin],
  components: {
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      loading: true,
      rankList: [],
      saleList: [],
      type: '1',
      noteList: [],
      significance: '',
      noteLoading: false,
      pagination: {
        current: 1,
        pageNum: 1,
        pageSize: 6,
        total: 0,
        onChange: (page) => {
          let pagination = this.pagination
          pagination.current = page
          this.pagination = pagination
          this.$nextTick(() => {
            this.getNoteList()
          })
        }
      },
      imgList: [],
      marketType: '1'
    }
  },
  created () {},
  mounted () {
    this.getSalerooms(this.type)
    this.getNoteList()
    this.getmarkets(this.marketType)
  },
  methods: {
    addNote () {
      this.$router.push({
        name: 'note',
        query: {
          add: true
        }
      })
    },
    findNote (id) {
      if (id) {
        this.$router.push({
          name: 'note',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          name: 'note'
        })
      }
    },
    noteChange (significance) {
      let pagination = this.pagination
      if (significance === '3') {
        significance = ''
      }
      this.significance = significance
      pagination.current = 1
      this.pagination = pagination
      this.$nextTick(() => {
        this.getNoteList()
      })
    },
    salaChange (val) {
      if (val === this.type) {
        return false
      } else {
        this.type = val
        this.getSalerooms(val)
      }
    },
    // 获取销售额类别占比
    getSalerooms (type) {
      Salerooms({ type }).then((res) => {
        this.saleList = res.result || []
        this.initSaleroomsChart(res.result || [])
      })
    },
    // 获取记事本
    getNoteList () {
      const { current, pageSize } = this.pagination
      let obj = {
        pageNum: current,
        pageSize,
        significance: this.significance
      }
      this.noteLoading = true
      getNote(obj)
        .then((res) => {
          let pagination = this.pagination
          pagination.total = (res.result && res.result.total) || 0
          this.pagination = pagination
          this.noteList = (res.result && res.result.list) || []
          let imgArr = []
          let list = res.result.list
          list.forEach((element) => {
            if (element.imgPaths && element.imgPaths.length > 0) {
              let imgPath = element.imgPaths
              imgPath.forEach((i) => {
                let obj = {
                  url: i,
                  notepadId: element.notepadId
                }
                imgArr.push(obj)
              })
            }
          })
          this.imgList = imgArr
          this.noteLoading = false
        })
        .catch(() => {
          this.noteLoading = false
        })
    },
    removePercent (val) {
      if (val.indexOf('%') > -1) {
        return Number(val.replace(/%/, ''))
      }
      return Number(val)
    },

    initSaleroomsChart (data) {
      let arr = []
      data.forEach((element) => {
        let obj = {
          value: this.removePercent(element.percentage),
          name: element.productName
        }
        arr.push(obj)
      })
      this.saleList = arr
      let box = document.getElementById('chart')
      let myChart = echarts.init(box, 'light')
      // 绘制图表

      let showed = !arr.length
      myChart.clear()
      if (showed) {
        myChart.setOption({
          title: {
              show: showed, // show 可以在上面顶一个一个 let show = null;
              textStyle: {
                color: '#999999',
                fontSize: 14
              },
              text: '暂无数据', // 这个你可以定义一个变量，也可以直接写死'暂无数据'
              left: 'center',
              top: 'center'
            }
        })
      } else {
        myChart.setOption({
          title: {
            show: showed, // show 可以在上面顶一个一个 let show = null;
            textStyle: {
              color: '#000',
              fontSize: 16
            },
            text: '暂无数据', // 这个你可以定义一个变量，也可以直接写死'暂无数据'
            left: 'center',
            top: 'center'
          },

          tooltip:
            arr.length > 0
              ? {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
                }
              : '',
          legend:
            arr.length > 0
              ? {
                  orient: 'vertical',
                  top: 'middle',
                  right: 10,
                  align: 'auto',
                  itemWidth: 10,
                  itemHeight: 10,
                  formatter: function (name) {
                    let val = ''
                    arr.forEach((element) => {
                      if (name === element.name) {
                        val = element.value
                      }
                    })
                    return name + '  ￥' + val
                  }
                }
              : {},
          series:
            arr.length > 0
              ? [
                  {
                    name: '销售额',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    right: 100,
                    label: {
                      show: false,
                      position: 'center'
                    },
                    emphasis: {
                      label: {
                        show: true,
                        fontSize: '24'
                      }
                    },
                    labelLine: {
                      show: false
                    },
                    data: arr
                  }
                ]
              : []
        })
      }
    },
    getmarkets (type) {
      getMarkets({ type }).then((res) => {
        let rankList = []
        if (res.result && res.result.saleRankings) {
          let saleRankings = res.result.saleRankings
          saleRankings.forEach((element) => {
            rankList.push({
              name: element.productName,
              total: element.saleroom
            })
          })
          this.rankList = rankList
        }
        if (res.result && res.result.saleroomTendencies) {
          this.initMarketChart(res.result.saleroomTendencies, type)
        }
      })
    },
    marketChange (type) {
      if (this.marketType === type) {
        return false
      } else {
        this.marketType = type
        this.$nextTick(() => {
          this.getmarkets(type)
        })
      }
    },
    initMarketChart (data, type) {
      let timeArr = []
      let valArr = []
      data.forEach((element) => {
        if (type === '1' || type === '2') {
          let text = element.timeText
          text = text.substr(text.length - 5, 5)
          timeArr.push(text)
        } else {
          timeArr.push(element.timeText)
        }

        valArr.push(element.saleroom)
      })
      let box = document.getElementById('marketChart')
      let myChart = echarts.init(box, 'light')
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis', // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
          showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 100, // 隐藏延迟，单位ms
          transitionDuration: 0.4, // 动画变换时间，单位s
          backgroundColor: 'rgba(0,0,0,0.7)', // 提示背景颜色，默认为透明度为0.7的黑色
          borderColor: '#333', // 提示边框颜色
          borderRadius: 4, // 提示边框圆角，单位px，默认为4
          borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
          padding: 5, // 提示内边距，单位px，默认各方向内边距为5，
          // 接受数组分别设定上右下左边距，同css
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              // 直线指示器样式设置
              color: '#48b',
              width: 2,
              type: 'solid'
            },
            shadowStyle: {
              // 阴影指示器样式设置
              width: 'auto', // 阴影大小
              color: 'rgba(150,150,150,0.3)' // 阴影颜色
            }
          },
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: timeArr
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: valArr,
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}
/deep/ .ant-list-pagination {
  text-align: center;
}

/deep/ .ant-pagination-item {
  border: none;
}
/deep/ .ant-pagination-prev .ant-pagination-item-link,
/deep/ .ant-pagination-next .ant-pagination-item-link {
  border: none;
}
.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
.btnList {
  display: flex;
  align-items: center;
  .btn {
    padding: 0 10px;
    cursor: pointer;
  }
  .active {
    color: #1890ff;
  }
}
/deep/ .noteChangeBtn {
  margin-bottom: 20px;
  button {
    margin-right: 10px;
  }
}
.doted {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-right: 15px;
}
.info {
  background: #3ba0ff;
}
.danger {
  background: #f2637b;
}
.gray {
  background: #999999;
}
.noteList {
  .item {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000000;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    .title {
      flex: 1;
    }
  }
}
.marketChange {
  a {
    color: #666666;
  }
  .active {
    color: #1890ff;
  }
}
/deep/ .ant-list-item {
  padding: 5px 0;
  border-bottom: none;
  cursor: pointer;
}
/deep/ .ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
  border-bottom: none;
}
/deep/ .img {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  img {
    cursor: pointer;
    width: 80px;
    height: 80px;
    margin: 10px 10px 10px 0;
  }
}

.saleChange {
  line-height: 1;
  padding-right: 0;
}
</style>
