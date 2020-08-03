<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        ref="ruleForm"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品类型" prop="categoryId">
              <a-select
                style="width: 100%"
                allowClear
                @change="categoryChange"
                v-model="form.categoryId"
                placeholder="请输入商品类型"
              >
                <template v-for="item in categories">
                  <a-select-option :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
                </template>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品名称" prop="productName">
              <a-input placeholder="请输入商品名称" allowClear v-model="form.productName" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="库存量">
              <a-form-model-item
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                prop="minStock"
              >
                <a-input-number
                  placeholder="最小数量"
                  :min="1"
                  allowClear
                  v-model="form.minStock"
                  style="width:100%"
                />
              </a-form-model-item>
              <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-</span>
              <a-form-model-item
                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                prop="maxStock"
              >
                <a-input-number
                  placeholder="最大数量"
                  :min="1"
                  allowClear
                  v-model="form.maxStock"
                  style="width:100%"
                />
              </a-form-model-item>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="创建时间">
              <a-range-picker v-model="creatTime" @change="onChange" allowClear style="width:100%" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">货物统计</div>
          <div class="operation">
            <a class="item" @click="download">下载货物模板</a>
            <a class="item">导入表格</a>
            <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div>
          </div>
        </div>

        <BaseTable
          ref="BaseTable"
          @getList="getList"
          @pageNumChange="pageNumChange"
          @pageSizeChange="pageSizeChange"
          @onSelectChange="onSelectChange"
        >
          <a-table-column key="categoryName" title="货物类型" data-index="categoryName" />
          <a-table-column key="productName" title="货物名称" data-index="productName" />
          <a-table-column key="productTotal" title="总库存" data-index="productTotal" />
          <a-table-column key="hasSold" title="已卖出" data-index="hasSold" />
          <a-table-column key="saleCount" title="又卖出" data-index="saleCount" />
          <a-table-column key="stock" title="剩余库存" data-index="stock" />
          <a-table-column key="remark" title="备注" data-index="remark">
            <template slot-scope="text, record">
              <a @click="showDialog(record.categoryId)">{{ text }}</a>
            </template>
          </a-table-column>
        </BaseTable>
      </a-card>
      <a-modal v-model="visible" width="400" footer centered destroy-on-close>
        <div slot="title" class="modal-title text-center">备注</div>
        <a-list
          item-layout="horizontal"
          :data-source="noteList"
          :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 10, total: 50}"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="text" style="color:#000000;">{{ item.text }}</div>
            <div
              class="date"
              style="padding-left:30px;color:#666666;font-size:12px;"
            >2020-07-30 12:00:00</div>
          </a-list-item>
        </a-list>
      </a-modal>
    </div>
  </page-header-wrapper>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import { getProducts, productsDownload } from '@/api/product'
import { getJson } from '@/utils/util'
export default {
  name: 'GoodManage',
  components: {
    BaseTable
  },
  data () {
    return {
      visible: false,
      tableLoading: false,
      minStockMax: '',
      pagination: {
        pageSize: 20,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true
      },

      list: [],
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 18
        }
      },
      queryParam: {},
      creatTime: undefined,
      expand: false,
      selectedRowKeys: [],
      form: {
        categoryId: undefined,
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 20,
        productName: ''
      },
      noteList: [],
      dataSource: ''
    }
  },
  computed: {
    categories () {
      return this.$store.state.good.categories
    },
    units () {
      return this.$store.state.good.units
    }
  },
  created () {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getunits')
  },
  mounted () {
    // this.$refs.BaseTable.loading(this.columns, [])
    // this.getList()
  },
  methods: {
    pageNumChange (e) {
      let form = this.form
      form.pageNum = e.current
      this.form = form
      this.getList()
    },
    pageSizeChange (e) {
      let form = this.form
      form.pageNum = 1
      form.pageSize = e.pageSize
      this.form = form
      this.getList()
    },
    download () {
      productsDownload().then((res) => {
        this.$message.success('下载成功')
        let url = window.URL.createObjectURL(res)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取服务器端的文件名
        link.setAttribute('download', '历史考勤信息.xlsx')
        document.body.appendChild(link)
        link.click()

        // }
      })
    },
    getList () {
      this.$refs.BaseTable.loading()
      getProducts(getJson(this.form))
        .then((res) => {
          this.dataSource = res.result
          this.$refs.BaseTable.getData(res.result)
        })
        .catch(() => {
          this.$refs.BaseTable.hideLoading()
        })
    },
    handleOk () {
      this.visible = false
    },
    showDialog (id) {
      console.log('id:', id)
      this.visible = true
    },
    updated () {
      console.log('updated')
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.pageNum = 1
      this.form.pageSize = 20
      if (this.form.minStock > this.form.maxStock) {
        this.$message.error('库存量输入有误')
        return
      }
      this.getList()
    },
    handleReset () {
      this.form = {
        categoryId: undefined,
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 20,
        productName: ''
      }
      this.creatTime = undefined
      this.$nextTick(() => {
        this.getList()
      })
    },
    onChange (date, dateString) {
      this.creatTime = dateString
      let form = this.form
      form.startTime = dateString[0]
      form.endTime = dateString[1]
      this.form = form
    },
    toggle () {
      this.expand = !this.expand
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed11: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    categoryChange (value) {
      console.log(value)
      let form = this.form
      form.categoryId = value
      this.form = form
    }
  }
}
</script>

<style>
</style>
