<template>
  <a-modal v-model="visible" width="600px" footer centered destroy-on-close>
    <div slot="title" class="modal-title text-center">备注</div>
    <div class="editRemake">
      <a-form-model
        class="ant-advanced-search-form"
        ref="ruleForm"
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        @submit="confirm"
      >
        <a-form-model-item label="类别" prop="productCategoryName">
          <a-input disabled placeholder="请输入类别" v-model="form.categoryName" allowClear />
        </a-form-model-item>
        <a-form-model-item label="商品名称" prop="productName">
          <a-input placeholder="请输入商品名称" v-model="form.productName" allowClear />
        </a-form-model-item>
        <a-form-model-item label="总库存" prop="productTotal">
          <a-input
            disabled
            style="width:100%"
            placeholder="请输入商品数量"
            :min="1"
            allowClear
            v-model="form.productTotal" />
        </a-form-model-item>
        <a-form-model-item label="剩余库存" prop="stock">
          <a-input
            disabled
            style="width:100%"
            placeholder="请输入商品数量"
            :min="1"
            allowClear
            v-model="form.stock" />
        </a-form-model-item>

        <a-form-model-item label="备注" prop="remark">
          <a-input type="textarea" placeholder="备注" style="min-height:100px" v-model="form.remark" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
          <a-button type="primary" html-type="submit" :loading="iconLoading">确定</a-button>
          <!-- <a-button @click="handleReset" :style="{ marginLeft: '8px' }">重置</a-button> -->
        </a-form-model-item>
      </a-form-model>
    </div>
  </a-modal>
</template>

<script>
import { remark } from '@/api/product'
export default {
  name: 'ImportGoods',
  data () {
    return {
      iconLoading: false,
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },

      form: {

      },

      headers: {
        authorization: 'authorization-text'
      },
      showUploading: false,
      fileList: [],
      visible: false
      // productsImportApi: productsImportApi
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
  methods: {
    show (data) {
      console.log(data)
      this.form = JSON.parse(JSON.stringify(data))
      this.visible = true
    },
    confirm (e) {
      e.preventDefault()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.form.productName) {
            this.$message.error('请输入商品名称')
            return
          }
          //  console.log(this.form)
          this.iconLoading = true

          let obj = {
            productId: this.form.productId,
            productName: this.form.productName,
            remark: this.form.remark
          }

          remark(obj)
            .then((res) => {
              this.$message.success(res.result)
                this.iconLoading = false
                this.visible = false
                this.$emit('getList')
            })
            .catch(() => {
              this.iconLoading = false
            })
        } else {
          //  console.log(this.form)
          return false
        }
      })
    }
  }
}
</script>

<style></style>
