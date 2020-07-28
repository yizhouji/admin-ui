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
            slot="remark"
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
import { getOverstocks } from '@/api/overstocks'

export default {
  name: 'Backlog',
  components: {
  },
  data () {
    return {
      columns: [
        {
          title: '货物类型',
          dataIndex: 'categoryName'
        },
        {
          title: '货物名称',
          dataIndex: 'productName'
        },
        {
          title: '总库存',
          dataIndex: 'productTotal'
        },
        {
          title: '已卖出',
          dataIndex: 'hasSold'
        },
        {
          title: '输入时间',
          dataIndex: 'createTime',
          width: 200
        },
        {
          title: '剩余库存',
          dataIndex: 'stock'
        },
        {
          title: '备注',
          dataIndex: 'remark',
          ellipsis: true,
          scopedSlots: { customRender: 'remark' }
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
      selectedRowKeys: []
    }
  },
  created () {
     this.getList()
  },
  mounted () {

  },
  methods: {
    getList () {
      getOverstocks().then((res) => {
        this.list = res.result
      })
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
