<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        ref="ruleForm"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品类型" prop="categoryId">
              <a-select
                style="width: 100%"
                allowClear
                @change="categoryChange"
                v-model="form.categoryId"
                placeholder="请输入商品类型"
              >
                <template v-for="item in categories">
                  <a-select-option :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
                </template>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="商品名称" prop="productName">
              <a-input placeholder="请输入商品名称" allowClear v-model="form.productName" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="经营状态" prop="businessStatus">
              <a-select v-model="form.businessStatus" placeholder="请选择" allow-clear>
                <a-select-option :value="1">经营中</a-select-option>
                <a-select-option :value="2">已下架</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="库存量">
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }" prop="minStock">
                <a-input-number placeholder="最小数量" :min="1" allowClear v-model="form.minStock" style="width:100%" />
              </a-form-model-item>
              <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-</span>
              <a-form-model-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }" prop="maxStock">
                <a-input-number placeholder="最大数量" :min="1" allowClear v-model="form.maxStock" style="width:100%" />
              </a-form-model-item>
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="创建时间">
              <a-range-picker v-model="creatTime" @change="onChange" allowClear style="width:100%" />
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
            <a class="item" @click="download">下载货物模板</a>
            <a-upload
              name="file"
              accept="application/vnd.ms-excel"
              :action="productsImportApi"
              :headers="headers"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <a class="item"> <a-spin v-if="showUploading" />导入表格</a>
            </a-upload>

            <div class="item-line">
              <a-dropdown :trigger="['hover']" overlayClassName="drop" style="cursor: pointer;">
                <div class="item-line">
                  <a-icon type="setting" />
                  <span>操作</span>
                </div>
                <a-menu slot="overlay">
                  <a-menu-item key="1" @click="addHandle">添加</a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </div>

        <BaseTable
          ref="BaseTable"
          :select="false"
          @getList="getList"
          @pageChange="pageChange"
          @onSelectChange="onSelectChange"
        >
          <a-table-column key="categoryName" title="货物类型" data-index="categoryName" />
          <a-table-column key="productName" title="货物名称" data-index="productName" />

          <a-table-column key="stock" title="现有库存" data-index="stock" class="stockTitle">
            <template slot-scope="text">
              <span style="color:#1890ff">{{ text }}</span>
            </template>
          </a-table-column>
          <a-table-column key="hasSold" title="已卖出" data-index="hasSold" />
          <a-table-column key="saleCount" title="又卖出" data-index="saleCount" />
          <a-table-column key="productTotal" title="货物总输入量" data-index="productTotal">
            <template slot-scope="text, record">
              <div class="count">
                {{ text }}
                <span class="bardge">{{ record.newlyIncreased | unit }}</span>
              </div>
            </template>
          </a-table-column>
          <a-table-column key="remark" title="备注" data-index="remark">
            <template slot-scope="text, record">
              <span v-if="text" @click="showDialog(record)">{{ text | formatStr(8) }}</span>
              <span v-else @click="showDialog(record)">{{ '备注' }}</span>
            </template>
          </a-table-column>
          <a-table-column key="operation" title="操作" data-index="operation">
            <template slot-scope="text, record">
              <a-button type="primary" size="small" @click="showDialog(record)">编辑</a-button>
              <a-button
                :loadin="loading"
                type="info"
                size="small"
                v-if="record.businessStatus === 2"
                @click="editBusinessStatus(record, 1)"
                style="margin-left:5px;"
              >上架</a-button
              >
              <a-button
                :loadin="loading"
                type="info"
                size="small"
                v-else
                @click="editBusinessStatus(record, 2)"
                style="margin-left:5px;"
              >下架</a-button
              >
              <a-button
                :loadin="deletloading"
                type="danger"
                size="small"
                @click="deletHandle(record)"
                style="margin-left:5px;"
              >删除</a-button
              >
            </template>
          </a-table-column>
        </BaseTable>
      </a-card>

      <EditRemark ref="editRemark" @getList="getList"></EditRemark>
    </div>
  </page-header-wrapper>
</template>

<script>
import BaseTable from '@/components/BaseTable'
import EditRemark from './editRemark'
import {
  getProducts,
  productsDownload,
  records,
  productsImport,
  productsImportApi,
  businessStatus,
  deletProduct
} from '@/api/product'
import { getJson } from '@/utils/util'
import { login } from '@/api/login'
export default {
  name: 'GoodManage',
  components: {
    BaseTable,
    EditRemark
  },
  filters: {
    unit: function (value) {
      let val = parseInt(value)
      if (val) {
        return '新增' + value
      } else {
        return ''
      }
    }
  },
  data () {
    return {
      visible: false,
      tableLoading: false,
      minStockMax: '',
      pagination: {
        pageNum: 1,
        pageSize: 10,
        hideOnSinglePage: true,
        total: 0,
        showQuickJumper: true
      },
      showUploading: false,
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
      queryParam: {},
      creatTime: undefined,
      expand: false,
      selectedRowKeys: [],
      form: {
        businessStatus: undefined,
        categoryId: undefined,
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 10,
        productName: ''
      },
      noteList: [],
      dataSource: '',
      listLoading: false,
      headers: {
        authorization: 'authorization-text'
      },
      fileList: [],
      productsImportApi: productsImportApi,
      loading: false,
      deletloading: false

    }
  },
  computed: {
    categories () {
      return this.$store.state.good.categories
    },
    units () {
      return this.$store.state.good.units
    }
  },
  created () {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getunits')
  },
  mounted () {
    // this.$refs.BaseTable.loading(this.columns, [])
    // this.getList()
  },
  methods: {
    // 删除
    deletHandle (data) {
      let self = this
      this.$confirm({
        title: '提示',
        content: h => <div style="color:red;">确认删除此商品？</div>,
        onOk () {
          self.deletloading = true
          deletProduct(data.productId)
            .then(res => {
              self.deletloading = false
              self.$message.success('删除成功')
              self.getList()
            })
            .catch(error => {
              self.deletloading = false
              self.$message.error(error.data.message)
            })
        },
        onCancel () {
        },
        class: 'test'
      })
    },
    // 上架下架
    editBusinessStatus (data, status) {
      this.loading = true

      businessStatus({ businessStatus: status, productId: data.productId })
        .then(res => {
          this.getList()
          this.loading = false
          this.$message.success(res.result)
        })
        .catch(() => {
          this.loading = false
        })
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
      },
    download () {
      productsDownload().then(res => {
        this.$message.success('下载成功')
        let blob = new Blob([res], {
          type: 'application/vnd.ms-excel'
        })
        let url = window.URL.createObjectURL(blob)
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        // 获取服务器端的文件名
        link.setAttribute('download', 'productTemplate.xls')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        // }
      })
    },
    addHandle () {
      this.$router.push('/goods/importGoods')
    },
    getList () {
      this.$refs.BaseTable.loading()
      getProducts(getJson(this.form))
        .then(res => {
          this.dataSource = res.result || []
          this.$refs.BaseTable.getData(res.result || [], this.form.pageNum, this.form.pageSize)
        })
        .catch(() => {
          this.$refs.BaseTable.hideLoading()
        })
    },
    handleOk () {
      this.visible = false
    },
    showDialog (data) {
      this.visible = true
      this.$refs.editRemark.show(data)
    },
    updated () {
      // console.log('updated')
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.pageNum = 1
      this.form.pageSize = 10
      if (this.form.minStock > this.form.maxStock) {
        this.$message.error('库存量输入有误')
        return
      }
      this.getList()
    },
    handleReset () {
      this.form = {
        categoryId: undefined,
        startTime: '',
        endTime: '',
        maxStock: '',
        minStock: '',
        pageNum: 1,
        pageSize: 10,
        productName: '',
        businessStatus: undefined
      }
      this.creatTime = undefined
      this.$refs.ruleForm.resetFields()
      this.$nextTick(() => {
        this.getList()
      })
    },
    onChange (date, dateString) {
      this.creatTime = dateString
      let form = this.form
      form.startTime = dateString[0]
      form.endTime = dateString[1]
      this.form = form
    },
    toggle () {
      this.expand = !this.expand
    },
    onSelectChange (selectedRowKeys) {
      // console.log('selectedRowKeys changed11: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    categoryChange (value) {
      // console.log(value)
      let form = this.form
      form.categoryId = value
      this.form = form
    },
    getRecords (productId) {
      this.listLoading = true
      const { pageSize, pageNum } = this
      records({
        pageSize,
        pageNum,
        productId
      })
        .then(res => {
          this.noteList = res.result.list || []
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    beforeUpload (file) {
      this.fileList = [...this.fileList, file]
      return true
    },
    handleChange ({ file, fileList, event }) {
      if (file.status === 'uploading') {
        this.showUploading = true
      }

      if (file.status === 'done') {
        this.showUploading = false

        if (file.response && file.response.result === '上传成功！') {
          // console.log(file.response)
          this.$message.success('上传成功！')
        } else {
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.listpart .ant-spin-container > .ant-list-items > .ant-list-item:last-child {
  border-bottom: none;
}

/deep/ .ant-upload-list-item-info {
  display: none;
}

/deep/ .ant-upload-list {
  display: none;
}

.count {
  position: relative;

  .bardge {
    display: inline-block;
    color: #f2637b;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    position: absolute;
    top: -15px;
    left: 80%;
    margin-right: -50%;
  }
}
/deep/ #table-container .ant-table-thead > tr > .stockTitle{
  color: #1890ff;
}
</style>
