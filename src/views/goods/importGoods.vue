<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">输入信息</div>
          <div class="operation">
            <a class="item" @click="download">下载货物模板</a>
            <a-upload
              name="file"
              accept="application/vnd.ms-excel"
              :action="productsImportApi"
              :headers="headers"
              :before-upload="beforeUpload"
              @change="handleChange">
              <a class="item">
                <a-spin v-if="showUploading" />导入表格</a>
            </a-upload>
            <!-- <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div> -->
          </div>
        </div>
        <a-form-model
          class="ant-advanced-search-form"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @submit="confirm">
          <a-form-model-item label="类别" required prop="productCategoryName">
            <a-dropdown>
              <a-input
                name="id"
                v-model="form.productCategoryName"
                placeholder="请输入类别"
                autocomplete="off"
                allowClear
                @change="inputChange" />
              <a-menu slot="overlay" v-if="categories && categories.length>0">
                <a-menu-item v-for="item in categories" :key="item.key" @click="categoriesChange(item.key)">
                  <a>{{ item.value }}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-form-model-item>
          <a-form-model-item label="商品名称" prop="productName">
            <a-input placeholder="请输入商品名称" v-model="form.productName" :maxLength="15" allowClear />
          </a-form-model-item>
          <a-form-model-item label="商品数量" prop="amount">
            <a-input-number style="width:100%" placeholder="请输入商品数量" :min="1" allowClear v-model.number="form.amount" />
          </a-form-model-item>
          <a-form-model-item label="单位" prop="productUnit">
            <a-dropdown>
              <a-input placeholder="请输入单位" v-model="form.productUnit" maxlenth="3" autocomplete="off" allowClear />
              <a-menu slot="overlay" v-if="units && units.length>0">
                <a-menu-item v-for="item in units" :key="item.key" @click="unitsChange(item.value)">
                  <a>{{ item.value }}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </a-form-model-item>
          <a-form-model-item label="备注" prop="remark">
            <a-input type="textarea" placeholder="备注" style="min-height:100px" v-model="form.remark" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
            <a-button type="primary" html-type="submit" :loading="iconLoading">确定</a-button>
            <a-button @click="handleReset" :style="{ marginLeft: '8px' }">重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
  import {
    addProducts,
    productsDownload,
    productsImport,
    productsImportApi
  } from '@/api/product'

  // import { mapActions } from 'vuex'
  // import { log } from 'util'

  export default {
    name: 'ImportGoods',
    data () {
      return {
        iconLoading: false,
        labelCol: {
          span: 3
        },
        wrapperCol: {
          span: 14
        },

        form: {
          productCategory: '',
          productCategoryName: '',
          productName: '',
          amount: '',
          productUnit: '',
          remark: ''
        },
        rules: {
          productCategoryName: [{
            required: true,
            message: '请输入商品类型',
            trigger: 'blur'
          }],
          productName: [{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }],
          amount: [{
            required: true,
            message: '请输入商品数量',
            trigger: 'blur'
          }],
          productUnit: [{
            required: true,
            message: '请输入单位',
            trigger: 'blur'
          }]
        },
        headers: {
          authorization: 'authorization-text'
        },
        showUploading: false,
        fileList: [],
        productsImportApi: productsImportApi
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
    mounted () {},
    methods: {
      inputChange (e) {
        let form = this.form
        form.productCategory = ''
        form.productCategoryName = e.target.value
        this.form = form
      },
      categoriesChange (key) {
        let form = this.form
        form.productCategory = ''
        form.productCategoryName = this.getName(key)
        form.productCategory = key
        this.form = form
      },
      unitsChange (value) {
        let form = this.form
        form.productUnit = value
        this.form = form
      },
      getName (key) {
        let name = ''
        this.categories.forEach((element) => {
          if (element.key === key) {
            name = element.value
          }
        })
        return name
      },
      confirm (e) {
        e.preventDefault()
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //  console.log(this.form)
            this.iconLoading = true

            let obj = {
              productCategory: this.form.productCategory || this.form.productCategoryName,
              productName: this.form.productName,
              amount: this.form.amount,
              productUnit: this.form.productUnit,
              remark: this.form.remark
            }

            addProducts(obj)
              .then((res) => {
                this.$message.success(res.result)
                setTimeout(() => {
                  this.iconLoading = false
                  this.$router.push({
                    name: 'GoodsManage'
                  })
                }, 2000)
              })
              .catch(() => {
                this.iconLoading = false
              })
          } else {
            //  console.log(this.form)
            return false
          }
        })
      },
      download () {
        productsDownload().then((res) => {
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
      handleReset () {
        this.form = {
          productCategory: '',
          productCategoryName: '',
          productName: '',
          amount: '',
          productUnit: '',
          remark: ''
        }
        this.$refs.ruleForm.resetFields()
      },
      beforeUpload (file) {
        this.fileList = [...this.fileList, file]
        return true
      },
      handleChange ({
        file,
        fileList,
        event
      }) {
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

<style>
</style>
