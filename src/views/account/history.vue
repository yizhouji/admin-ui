/* eslint-disable vue/no-unused-vars */
<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        ref="ruleForm"
        @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="交易方式" prop="businessType">
              <a-select v-model="form.businessType" placeholder="请选择" allow-clear>
                <a-select-option :value="1">微信</a-select-option>
                <a-select-option :value="2">支付宝</a-select-option>
                <a-select-option :value="3">银联</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="订单号" prop="orderNo">
              <a-input placeholder="请输入订单号" v-model="form.orderNo" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票时间" prop="groupName">
              <a-range-picker @change="onChange" v-model="date" allowClear style="width:100%" allow-clea />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="支付状态" prop="status">
              <a-select v-model="form.status" placeholder="请选择" allow-clear>
                <a-select-option :value="0">未支付</a-select-option>
                <a-select-option :value="1">已支付</a-select-option>
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
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">货物统计</div>
          <div class="operation">

          </div>
        </div>
        <BaseTable
          ref="BaseTable"
          @getList="getList"
          @pageChange="pageChange"
          @onSelectChange="onSelectChange">
          <a-table-column key="orderNo" title="订单号" data-index="orderNo" />
          <a-table-column key="commodityName" title="产品名称" data-index="commodityName" />
          <a-table-column key="businessType" title="交易方式" data-index="businessType" >
            <template slot-scope="text">
              <template v-if="text===1">微信</template>
              <template v-else-if="text===2">支付宝</template>
              <template v-else>银联</template>
            </template>
          </a-table-column>
          <a-table-column key="businessMoney" title="支付金额" data-index="businessMoney" />
          <a-table-column key="payTime" title="付款时间" data-index="payTime" />
          <a-table-column key="statusName" title="支付状态" data-index="statusName" />
        </BaseTable>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '@/components/BaseTable'
  import {
    getHistory
  } from '@/api/user'
  import {
    getJson
  } from '@/utils/util'

  export default {
    name: 'GoodManage',
    components: {
      BaseTable
    },
    data () {
      return {
        visible: false,
        list: [],
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
        tableLoading: false,
        date: undefined,
        form: {
          businessType: undefined,
          endTime: '',
          pageNum: 1,
          pageSize: 10,
          orderNo: '',
          startTime: '',
          status: undefined
        },
        noteList: []
      }
    },
    computed: {},
    created () {

    },
    methods: {

      getList () {
        this.tableLoading = true
        getHistory(this.form)
          .then((res) => {
            this.dataSource = res.result || []
            this.$refs.BaseTable.getData(res.result || [], this.form.pageNum, this.form.pageSize)
            this.tableLoading = false
          })
          .catch(() => {
            this.tableLoading = false
          })
      },
      handleSearch (e) {
        e.preventDefault()
        this.form.pageNum = 1
        this.form.pageSize = 10
        this.getList(this.form)
      },
      handleReset () {
        this.form = {
          businessType: undefined,
          endTime: '',
          pageNum: 1,
          pageSize: 10,
          orderNo: '',
          startTime: '',
          status: undefined
        }
        this.date = undefined
        this.$refs.ruleForm.resetFields()

        this.$nextTick(() => {
          this.getList()
        })
      },
      toggle () {
        this.expand = !this.expand
      },
      onSelectChange (selectedRowKeys) {
        //  console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
      },
      onChange (date, dateString) {
        let form = this.form
        this.date = dateString
        form.startTime = dateString[0]
        form.endTime = dateString[1]
        this.form = form
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
