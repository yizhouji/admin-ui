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
              <div id="chart" style="height:400px"></div>
              <!-- <div>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :show-title="true" data-key="item*percent" />
                  <v-axis />
                  <v-legend data-key="item" />
                  <v-pie position="percent" color="item" :v-style="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :inner-radius="0.6" />
                </v-chart>
              </div>-->
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ height: '100%' }">
            <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">操作一</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">操作二</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-row :gutter="68">
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <number-info :total="12321" :sub-total="17.1">
                  <span slot="subtitle">
                    <span>搜索用户数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </span>
                </number-info>
                <!-- miniChart -->
                <div>
                  <mini-smooth-area
                    :style="{ height: '45px' }"
                    :data-source="searchUserData"
                    :scale="searchUserScale"
                  />
                </div>
              </a-col>
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <number-info :total="2.7" :sub-total="26.2" status="down">
                  <span slot="subtitle">
                    <span>人均搜索次数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </span>
                </number-info>
                <!-- miniChart -->
                <div>
                  <mini-smooth-area
                    :style="{ height: '45px' }"
                    :data-source="searchUserData"
                    :scale="searchUserScale"
                  />
                </div>
              </a-col>
            </a-row>
            <div class="ant-table-wrapper">
              <a-table
                row-key="index"
                size="small"
                :columns="searchTableColumns"
                :data-source="searchData"
                :pagination="{ pageSize: 5 }"
              >
                <span slot="range" slot-scope="text, record">
                  <trend :flag="record.status === 0 ? 'up' : 'down'">{{ text }}%</trend>
                </span>
              </a-table>
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

const searchTableColumns = [
  {
    dataIndex: 'index',
    title: '排名',
    width: 90
  },
  {
    dataIndex: 'keyword',
    title: '搜索关键词'
  },
  {
    dataIndex: 'count',
    title: '用户数'
  },
  {
    dataIndex: 'range',
    title: '周涨幅',
    align: 'right',
    sorter: (a, b) => a.range - b.range,
    scopedSlots: { customRender: 'range' }
  }
]
const searchData = []
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

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
      searchTableColumns,
      searchData,

      barData,
      barData2,

      saleList: [],
      type: 1
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted () {
    this.getSalerooms(this.type)
  },
  methods: {
    onChange (e) {
      this.getSalerooms(e.target.value)
    },
    getSalerooms (type) {
      Salerooms({ type }).then((res) => {
        if (res.result && res.result.length > 0) {
          this.initSaleroomsChart(res.result)
        }
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
            arr.forEach(element => {
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
</style>
