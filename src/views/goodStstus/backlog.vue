<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">货物统计</div>
          <div class="operation">
            <!-- <a class="item">下载货物模板</a>
            <a class="item">导入表格</a>-->
            <!-- <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div> -->
          </div>
        </div>
        <!-- <a-table
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
        </a-table>-->
        <BaseTable
          ref="BaseTable"
          @getList="getList"
          @pageChange="pageChange"
          @onSelectChange="onSelectChange"
        >
          <a-table-column key="货物类型" title="货物类型" data-index="categoryName" />
          <a-table-column key="productName" title="货物名称" data-index="productName" />
          <a-table-column key="productTotal" title="总库存" data-index="productTotal" />
          <a-table-column key="hasSold" title="已卖出" data-index="hasSold" />
          <a-table-column key="createTime" title="输入时间" data-index="createTime" />
          <a-table-column key="stock" title="剩余库存" data-index="stock" />
          <a-table-column key="remark" title="备注" data-index="remark">
            <template slot-scope="text">
              <span>{{ text }}</span>
              <!-- <a @click="showDialog(record.categoryId)">{{ text }}</a> -->

            </template>
          </a-table-column>
        </BaseTable>
        <!-- <a-modal v-model="visible" width="400" footer centered destroy-on-close>
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
        </a-modal> -->
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import BaseTable from '@/components/BaseTable'

import { getOverstocks } from '@/api/overstocks'

export default {
  name: 'Backlog',
  components: {
    BaseTable
  },
  data () {
    return {
      visible: false,
      noteList: [],
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
      form: {
          pageNum: 1,
          pageSize: 10
        },
      selectedRowKeys: []
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    getList () {
      this.$refs.BaseTable.loading()
      getOverstocks(this.form)
        .then(res => {
          this.$refs.BaseTable.getData(res.result, this.form.pageNum, this.form.pageSize)
        })
        .catch(() => {
          this.$refs.BaseTable.hideLoading()
        })
    },
    onSelectChange (selectedRowKeys) {
      //  console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    showDialog (id) {
      //  console.log('id:', id)
      this.visible = true
    },
    pageChange (e) {
        let form = this.form
        form.pageNum = e.current
        if (e.pageSize !== form.pageSize) {
            form.pageSize = e.pageSize
            form.pageNum = 1
        }
        this.form = form
        this.getList()
      }
  }
}
</script>

<style>
</style>
