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
            <a-form-model-item label="规则编号">
              <a-input name="id" v-model="form.id" placeholder="请输入编号" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品名称">
              <a-input placeholder="请输入商品名称" v-model="form.name" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="关键字">
              <a-input placeholder="请输入关键字" v-model="form.keyword" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="创建时间">
              <a-input placeholder="请选择创建时间" v-model="form.ctime" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="库存量">
              <a-input placeholder="请输入库存量" v-model="form.total" />
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
      <a-modal v-model="visible" width="400" footer centered destroyOnClose>
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
export default {
  name: 'GoodManage',
  components: {
  },
  data () {
    return {
      visible: false,
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
        name: '',
        keyword: '',
        ctime: '',
        total: ''
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

  },
  created () {

  },
  methods: {
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
      console.log(this.form)
    },
    handleReset () {
      this.form = {
        id: '',
        name: '',
        keyword: '',
        ctime: '',
        total: ''
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
