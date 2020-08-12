<template>
  <page-header-wrapper>
    <a-card
      id="search-form"
      :bordered="false"
    >
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="明细类型">
              <a-input
                placeholder="请输入类别"
                v-model="form.type"
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="订单编号">
              <a-input
                name="id"
                v-model="form.id"
                placeholder="请输入订单编号"
              />
            </a-form-model-item>
          </a-col>

          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="时间筛选">
              <a-input
                placeholder="请选择时间"
                v-model="form.date"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col
            :span="24"
            :style="{ textAlign: 'right' }"
          >
            <a-button
              type="primary"
              html-type="submit"
            >
              查询
            </a-button>
            <a-button
              :style="{ marginLeft: '8px' }"
              @click="handleReset"
            >
              重置
            </a-button>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <div id="table-container">
      <a-card :bordered="false">
        <div
          class="table-title"
          slot="title"
        >
          <div class="text">
            货物统计
          </div>
          <div class="operation">
            <!-- <a class="item">下载货物模板</a>
            <a class="item">导入表格</a>-->
            <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="list"
        >
          <template
            slot="sold"
            slot-scope="text"
          >
            <div class="tag sold_tag">
              {{ text }}
            </div>
          </template>
          <template
            slot="amount"
            slot-scope="text"
          >
            <div class="tag amount_tag">
              {{ text }}
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
    <a-modal
      v-model="visible"
      width="400"
      footer
      centered
      destroy-on-close
    >
      <div
        slot="title"
        class="modal-title text-center"
      >
        备注
      </div>
      <a-list
        item-layout="horizontal"
        :data-source="noteList"
        :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 10, total: 50}"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <div
            class="text"
            style="color:#000000;"
          >
            {{ item.text }}
          </div>
          <div
            class="date"
            style="padding-left:30px;color:#666666;font-size:12px;"
          >
            2020-07-30 12:00:00
          </div>
        </a-list-item>
      </a-list>
    </a-modal>
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
      //  console.log('id:', id)
      this.visible = true
    },
    updated () {
      //  console.log('updated')
    },
    handleSearch (e) {
      e.preventDefault()
      //  console.log(this.form)
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
      //  console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange (pageNumber) {
      //  console.log('Page: ', pageNumber)
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  border-radius: 3px;
  border: 1px solid #dddddd;
  color: #dddddd;
  border-color: #dddddd;
  padding: 0 5px;
}
.sold_tag {
  color: #000000;
  border-color: #D9D9D9;
}
.amount_tag {
  color: #F2637B;
  border-color: #F2637B;
}
</style>
