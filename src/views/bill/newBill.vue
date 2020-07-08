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
            <a-form-model-item label="单位">
              <a-input placeholder="请输入单位" v-model="form.type" allowClear/>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人">
              <a-input name="id" v-model="form.id" placeholder="请输入开票人" allowClear/>
            </a-form-model-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人联系方式">
              <a-input placeholder="请输入开票人联系方式" v-model="form.date" allowClear/>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户名字">
              <a-input placeholder="请输入客户名字" v-model="form.date" allowClear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户联系方式">
              <a-input placeholder="请输入客户联系方式" v-model="form.date" allowClear/>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="是否已付款">
              <a-select v-model="form.type" placeholder="请选择" allowClear>
                <a-select-option value="1">
                  是
                </a-select-option>
                <a-select-option value="0">
                  否
                </a-select-option>
              </a-select>
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
  </page-header-wrapper>
</template>

<script>
export default {
name: 'GoodManage',
  components: {},
  data () {
    return {
      visible: false,
      columns: [
        {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '货名',
          dataIndex: 'name'
        },
        {
          title: '总库存',
          dataIndex: 'total',
          width: 100
        },
        {
          title: '卖出',
          dataIndex: 'sold',
          width: 100,
          scopedSlots: { customRender: 'sold' }
        },
        {
          title: '卖出金额',
          dataIndex: 'amount',
          width: 100,
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: '售出编号',
          dataIndex: 'num'
        },
        {
          title: '剩余库存',
          dataIndex: 'stock'
        },
        {
          title: '操作时间',
          dataIndex: 'time',
          ellipsis: true
        }
      ],
      list: [
        {
          id: '1',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          num: '10',
          amount: '1000',
          stock: '70个',
          time: '2012-07-08 12:00:00'
        },
        {
          id: '2',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          num: '10',
          amount: '1000',
          stock: '70个',
          time: '2012-07-08 12:00:00'
        },
        {
          id: '3',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          num: '10',
          amount: '1000',
          stock: '70个',
          time: '2012-07-08 12:00:00'
        },
        {
          id: '4',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          num: '10',
          amount: '1000',
          stock: '70个',
          time: '2012-07-08 12:00:00'
        },
        {
          id: '5',
          type: 'John Brown',
          name: '灯具',
          total: '100',
          sold: '20',
          num: '10',
          amount: '1000',
          stock: '70个',
          time: '2012-07-08 12:00:00'
        }
      ],
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 10
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        }
      },
      queryParam: {},
      expand: false,
      selectedRowKeys: [],
      form: {
        id: '',
        type: '',
        date: ''
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
    computed: {},
  created () {},
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
    },
    onChange (pageNumber) {
      console.log('Page: ', pageNumber)
    }
  }
}
</script>

<style>

</style>
