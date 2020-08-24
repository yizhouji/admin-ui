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
              <div class="analysis-salesTypeRadio">
                <a-radio-group v-model="type" @change="onChange">
                  <a-radio-button value="1">本周</a-radio-button>
                  <a-radio-button value="2">本月</a-radio-button>
                  <a-radio-button value="3">全年</a-radio-button>
                </a-radio-group>
              </div>
            </div>
            <h4>销售额</h4>
            <div>
              <div id="chart" style="height:400px">
                <div class="none">暂无数据</div>
              </div>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="noteLoading" :bordered="false" title="记事本/图片" :style="{ height: '100%' }">
            <div slot="extra" style="height: inherit;">
              <div class="btnList">
                <div class="btn active" @click="addNote">新建</div>
                <div class="btn" @click="findNote">查看</div>
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
              </a-list>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-card
      :loading="loading"
      :bordered="false"
      style="margin-top:24px"
      :body-style="{padding: '0'}"
    >
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>本周</a>
              <a>本月</a>
              <a>全年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="销售额" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" title="销售额排行" />
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
import { Salerooms } from '@/api/index'
import { getNote } from '@/api/note'
import { forEach } from 'store/storages/all'
var echarts = require('echarts')

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchUserData = []
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}
const searchUserScale = [
  {
    dataKey: 'x',
    alias: '时间'
  },
  {
    dataKey: 'y',
    alias: '用户数',
    min: 0,
    max: 10
  }
]

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
      rankList,

      // 搜索用户数
      searchUserData,
      searchUserScale,
      barData,
      barData2,

      saleList: [],
      type: 1,
      noteList: [],
      significance: '',
      noteLoading: false,
      pagination: {
        current: 1,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        onChange: (page) => {
          let pagination = this.pagination
          pagination.current = page
          this.pagination = pagination
           console.log(this.pagination)
          this.$nextTick(() => {
            this.getNoteList()
          })
        }
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted () {
    this.getSalerooms(this.type)
    this.getNoteList()
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
    onChange (e) {
      this.getSalerooms(e.target.value)
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
      getNote(obj).then((res) => {
        let pagination = this.pagination
        pagination.total = (res.result && res.result.total) || 0
        this.pagination = pagination
        this.noteList = (res.result && res.result.list) || []
        this.noteLoading = false
      }).catch(() => {
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
          value: this.removePercent(element.money),
          name: element.productName
        }
        arr.push(obj)
      })
      this.saleList = arr
      let box = document.getElementById('chart')
      let myChart = echarts.init(box, 'light')
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
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
        },
        series: [
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
/deep/ .ant-list-item {
  padding: 5px 0;
  border-bottom: none;
}
/deep/ .ant-list-something-after-last-item .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
  border-bottom: none;
}
</style>
