<template>
  <page-header-wrapper>
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
            <a class="item">导入表格</a> -->
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
          <template
            slot="note"
            slot-scope="text"
          >
            <a>{{ text }}</a>
          </template>
        </a-table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'Backlog',
  components: {
  },
  data () {
    return {
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
          title: '输入时间',
          dataIndex: 'time',
          width: 200
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
          time: '20220-07-15 12:00:000',
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
          time: '20220-07-15 12:00:000',
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
          time: '20220-07-15 12:00:000',
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
          time: '20220-07-15 12:00:000',
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
          time: '20220-07-15 12:00:000',
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
      selectedRowKeys: []
    }
  },
  methods: {
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style>

</style>
