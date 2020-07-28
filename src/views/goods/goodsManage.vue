<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品类型">
              <a-select style="width: 100%" allowClear @change="categoryChange" placeholder="请输入商品类型">
                <a-select-option v-for="item in categories" :key="item.key">{{ item.value }}</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品名称">
              <a-input placeholder="请输入商品名称" allowClear v-model="form.productName" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="库存量">
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                <a-input-number
                  placeholder="最小数量"
                  :min="1"
                  allowClear
                  v-model="form.minStock"
                  style="width:100%"
                />
              </a-form-model-item>
              <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-</span>
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
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
            <a-form-model-item label="商品名称">
              <a-range-picker @change="onChange" allowClear style="width:100%" />
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
            <a class="item">下载货物模板</a>
            <a class="item">导入表格</a>
            <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="list"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <template slot="note" slot-scope="text, record">
            <a @click="showDialog(record.id)">{{ text }}</a>
          </template>
        </a-table>
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
import { getProducts } from '@/api/product'
export default {
  name: 'GoodManage',
  components: {
  },
  data () {
    return {
      visible: false,
      minStockMax: '',

      columns: [
        {
          title: '货物类型',
          dataIndex: 'type'
        },
        {
          title: '货物名称',
          dataIndex: 'name'
        },
        {
          title: '总库存',
          dataIndex: 'total'
        },
        {
          title: '已卖出',
          dataIndex: 'sold'
        },
        {
          title: '又卖出',
          dataIndex: 'soldAgain'
        },
        {
          title: '卖出金额',
          dataIndex: 'amount'
        },
        {
          title: '剩余库存',
          dataIndex: 'stock'
        },
        {
          title: '备注',
          dataIndex: 'note',
          ellipsis: true,
          scopedSlots: { customRender: 'note' }
        }
      ],
      list: [
      ],
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
      expand: false,
      selectedRowKeys: [],
      form: {
        categoryId: '',
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 20,
        productName: ''
      },
      noteList: [
        {
          text:
            'Ant Design Title 1  Ant Design Title 1  Ant Design Title 1  Ant Design Title 1  Ant Design Title 1  Ant Design Title 1  Ant Design Title 1  Ant Design Title 1'
        },
        {
          text: 'Ant Design Title 2'
        },
        {
          text: 'Ant Design Title 3'
        },
        {
          text: 'Ant Design Title 4'
        }
      ]
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
    this.getList(this.form)
  },
  methods: {
    getList (form) {
      getProducts(form).then(res => {
          this.list = res.result
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
      this.getList(this.form)
    },
    handleReset () {
      this.form = {
       categoryId: '',
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 20,
        productName: ''
      }
      this.$refs.ruleForm.resetFields()
    },
    onChange (date, dateString) {
        let form = this.form
        form.startTime = dateString[0]
        form.endTime = dateString[1]
        this.form = form
    },
    toggle () {
      this.expand = !this.expand
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    categoryChange (value) {
         let form = this.form
         form.categoryId = value
        this.form = form
    }
  }
}
</script>

<style>
</style>
