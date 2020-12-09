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
            <a-form-model-item label="公司名字" prop="groupName">
              <a-input placeholder="请输入公司名字" v-model="form.groupName" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票时间" prop="groupName">
              <a-range-picker @change="onChange" v-model="date" allowClear style="width:100%" allow-clea />
            </a-form-model-item>
          </a-col>

          <a-col :md="8" :sm="24">
            <a-form-model-item label="数量">
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }" prop="startAmount">
                <a-input-number placeholder="最小数量" :min="1" allowClear v-model="form.startAmount" style="width:100%" />
              </a-form-model-item>
              <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-</span>
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }" prop="endAmount">
                <a-input-number placeholder="最大数量" :min="1" allowClear v-model="form.endAmount" style="width:100%" />
              </a-form-model-item>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户名字" prop="customer">
              <a-input placeholder="请输入客户名字" v-model="form.customer" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户联系方式" prop="customerPhone">
              <a-input placeholder="请输入客户联系方式" :maxLength="11" v-model="form.customerPhone" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="是否已付款" prop="payment">
              <a-select v-model="form.payment" placeholder="请选择" allow-clear>
                <a-select-option :value="1">是</a-select-option>
                <a-select-option :value="0">否</a-select-option>
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
            <!-- <a class="item">发送</a>
            <a class="item">打印</a> -->
            <!-- <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div> -->
          </div>
        </div>
        <!-- <a-table
          :columns="columns"
          :data-source="list"
          :loading="tableLoading"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <template slot="visitd">
            <a>查看</a>
          </template>
        </a-table>-->
        <BaseTable
          ref="BaseTable"
          @getList="getList"
          @pageChange="pageChange"
          :select="false"
          @onSelectChange="onSelectChange">
          <a-table-column key="customer" title="客户名字" data-index="customer" />
          <a-table-column key="customerPhone" title="客户联系方式" data-index="customerPhone" />
          <a-table-column key="payment" title="是否已付款" data-index="payment">
            <template slot-scope="text">{{ text ? '是':'否' }}</template>
          </a-table-column>
          <a-table-column key="createTime" title="开票时间" data-index="createTime" />
          <a-table-column key="visitd" title="操作">
            <template slot-scope="text,recored">
              <a @click="detailHandle(recored,recored.checkId)">查看</a>
            </template>
          </a-table-column>
        </BaseTable>
      </a-card>
    </div>
    <Details ref="Details"></Details>
  </page-header-wrapper>
</template>

<script>
  import BaseTable from '@/components/BaseTable'
  import Details from './components/details'
  import {
    getChecklists,
    getCheckDetails
  } from '@/api/bill'
  import {
    getJson
  } from '@/utils/util'

  export default {
    name: 'GoodManage',
    components: {
      BaseTable,
      Details
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
          customer: '',
          customerPhone: '',
          endAmount: '',
          endTime: '',
          groupName: '',
          pageNum: 1,
          pageSize: 10,
          payment: undefined,
          startAmount: '',
          startTime: ''
        },
        noteList: []
      }
    },
    computed: {},
    created () {

    },
    methods: {
      detailHandle (data, checkId) {
        getCheckDetails(checkId).then((res) => {
          this.$refs.Details.show(res.result, data.createTime)
        }).catch(error => {
          this.$message.error(error.data.message || '获取清单信息失败')
        })
      },
      getList () {
        this.tableLoading = true
        getChecklists(getJson(this.form))
          .then((res) => {
            this.list = res.result.list
            this.$refs.BaseTable.getData(res.result, this.form.pageNum, this.form.pageSize)
            this.tableLoading = false
          })
          .catch(() => {
            this.tableLoading = false
          })
      },
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
        this.form.pageNum = 1
        this.form.pageSize = 10
        if (this.form.minStock > this.form.maxStock) {
          this.$message.error('库存量输入有误')
          return
        }
        this.getList(this.form)
      },
      handleReset () {
        this.form = {
          customer: '',
          customerPhone: '',
          endAmount: '',
          endTime: '',
          groupName: '',
          pageNum: 1,
          pageSize: 10,
          payment: undefined,
          startAmount: '',
          startTime: ''
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
