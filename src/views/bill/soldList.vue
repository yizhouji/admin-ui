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
            <a-form-model-item label="单位">
              <a-input
                placeholder="请输入单位"
                v-model="form.type"
                allow-clear
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="开票时间">
              <a-input
                name="id"
                v-model="form.id"
                placeholder="请选择开票时间"
                allow-clear
              />
            </a-form-model-item>
          </a-col>

          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="数量">
              <a-input
                placeholder="请输入数量"
                v-model="form.date"
                allow-clear
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="客户名字">
              <a-input
                placeholder="请输入客户名字"
                v-model="form.date"
                allow-clear
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="客户联系方式">
              <a-input
                placeholder="请输入客户联系方式"
                v-model="form.date"
                allow-clear
              />
            </a-form-model-item>
          </a-col>
          <a-col
            :md="8"
            :sm="24"
          >
            <a-form-model-item label="是否已付款">
              <a-select
                v-model="form.type"
                placeholder="请选择"
                allow-clear
              >
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
            <a class="item">发送</a>
            <a class="item">打印</a>
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
          <template slot="visitd">
            <a>查看</a>
          </template>
        </a-table>
      </a-card>
    </div>
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
          title: '客户名字',
          dataIndex: 'name'
        },
        {
          title: '客户联系方式',
          dataIndex: 'phone'
        },
        {
          title: '单位',
          dataIndex: 'unit'
        },
        {
          title: '数量',
          dataIndex: 'count',
          scopedSlots: { customRender: 'sold' }
        },
        {
          title: '是否已付款',
          dataIndex: 'hasPay',
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: '开票时间',
          dataIndex: 'time',
          width: 200,
          ellipsis: true
        },
        {
          title: '查看',
          dataIndex: 'visitd',
          scopedSlots: { customRender: 'visitd' }
        }
      ],
      list: [
        {
          id: 1,
          name: '灯具',
          phone: '18000000000',
          unit: '个',
          count: '20',
          hasPay: 1,
          time: '20220-07-15 12:00:000'
        }, {
          id: 2,
          name: '灯具',
          phone: '18000000000',
          unit: '个',
          count: '20',
          hasPay: 1,
          time: '20220-07-15 12:00:000'
        }, {
          id: 3,
          name: '灯具',
          phone: '18000000000',
          unit: '个',
          count: '20',
          hasPay: 1,
          time: '20220-07-15 12:00:000'
        }, {
          id: 4,
          name: '灯具',
          phone: '18000000000',
          unit: '个',
          count: '20',
          hasPay: 1,
          time: '20220-07-15 12:00:000'
        }, {
          id: 5,
          name: '灯具',
          phone: '18000000000',
          unit: '个',
          count: '20',
          hasPay: 1,
          time: '20220-07-15 12:00:000'
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
