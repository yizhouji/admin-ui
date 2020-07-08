<template>
  <page-header-wrapper>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">输入信息</div>
          <div class="operation">
            <a class="item">下载货物模板</a>
            <a class="item">导入表格</a>
          </div>
        </div>
        <a-form-model
          class="ant-advanced-search-form"
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          @submit="handleSearch"
        >
          <a-form-model-item label="类别">
            <a-input name="id" v-model="form.type" placeholder="请输入类别" />
          </a-form-model-item>
          <a-form-model-item label="商品名称">
            <a-input placeholder="请输入商品名称" v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="商品数量">
            <a-input-number
              style="width:100%"
              placeholder="请输入商品数量"
              :min="1"
              v-model="form.keyword"
            />
          </a-form-model-item>
          <a-form-model-item label="单位">
            <a-input placeholder="请输入单位" v-model="form.ctime" />
          </a-form-model-item>
          <a-form-model-item label="备注">
            <a-input type="textarea" placeholder="备注" style="min-height:100px" v-model="form.note" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 3 }">
            <a-button type="primary" html-type="submit">确定</a-button>
            <a-button @click="handleReset" :style="{ marginLeft: '8px' }">重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'ImportGoods',
  data () {
    return {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
      form: {
        id: '',
        name: '',
        keyword: '',
        ctime: '',
        total: ''
      }
    }
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      console.log(this.form)
    },
    handleReset () {
      this.form = {
        id: '',
        name: '',
        keyword: '',
        ctime: '',
        total: ''
      }
    }
  }
}
</script>

<style>
</style>
