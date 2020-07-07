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
            <a-form-model-item label="类别">
              <a-input placeholder="请输入类别" v-model="form.type" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="订单编号">
              <a-input name="id" v-model="form.id" placeholder="请输入编号" />
            </a-form-model-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-model-item label="时间筛选">
              <a-input placeholder="请选择时间" v-model="form.date" />
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
          <a slot="name" slot-scope="text">{{ text }}</a>
        </a-table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'GoodManage',
  components: {
    // STable
  },
  data () {
    return {
      columns: [
        {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '货名',
          dataIndex: 'name',
          width: 80
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
          ellipsis: true
        }
      ],
      list: [
        {
          key: '1',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          soldAgain: '10',
          amount: '1000',
          stock: '70',
          note: '备注信息'
        },
        {
          key: '2',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          soldAgain: '10',
          amount: '1000',
          stock: '70',
          note: '备注信息'
        },
        {
          key: '3',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          soldAgain: '10',
          amount: '1000',
          stock: '70',
          note: '备注信息'
        },
        {
          key: '4',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          soldAgain: '10',
          amount: '1000',
          stock: '70',
          note: '备注信息'
        },
        {
          key: '5',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          soldAgain: '10',
          amount: '1000',
          stock: '70',
          note: '备注信息'
        }
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
        id: '',
        type: '',
        date: ''
      }
    }
  },
  computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  created () {
    // this.tableOption()
    // getRoleList({ t: new Date() })
  },
  methods: {
    updated () {
      console.log('updated')
    },
    handleSearch (e) {
      e.preventDefault()
      console.log(this.form)
    },
    handleReset () {
      this.form = {
        id: '',
        type: '',
        date: ''
      }
    },
    toggle () {
      this.expand = !this.expand
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>
</style>
