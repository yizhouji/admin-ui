<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch"
      >
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="单位">
              <a-input
                placeholder="请输入单位"
                v-model="form.groupName"
                allow-clear
                name="groupName"
                :maxLength="20"
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人">
              <a-input
                name="drawer"
                v-model="form.drawer"
                placeholder="请输入开票人"
                allow-clear
                :maxLength="10"
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人联系方式">
              <a-input
                name="drawerPhone"
                placeholder="请输入开票人联系方式"
                v-model="form.drawerPhone"
                allow-clear
                :maxLength="11"
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户名字">
              <a-input
                name="customer"
                placeholder="请输入客户名字"
                v-model="form.customer"
                :maxLength="10"
                allow-clear
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户联系方式">
              <a-input
                name="customerPhone"
                placeholder="请输入客户联系方式"
                v-model="form.customerPhone"
                allow-clear
                :maxLength="11"
              />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="是否已付款">
              <a-select name="payment" v-model="form.payment" placeholder="请选择" allow-clear>
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="0">否</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <div id="table-container">
      <a-card :bordered="false">
        <div class="table-title" slot="title">
          <div class="text">清单列表</div>
          <div class="operation">
            <!-- <a class="item" @click="showModal">发送</a>
            <a class="item">打印</a> -->
            <div class="item-line">
              <a-icon type="setting" />
              <span>操作</span>
            </div>
          </div>
        </div>
        <a-table
          :columns="columns"
          :data-source="list"
          :pagination="false"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <template slot="productName" slot-scope="text, record, index">
            <template v-if="record.editable">
              <a-select
                name="payment"
                v-model="record.productId"
                placeholder="请选择"
                style="width:100%"
                allow-clear
                @change="productChange(record,index)"
              >
                <a-select-option
                  v-for="item in product"
                  :key="item.productId"
                  :value="item.productId"
                >{{ item.productName }}</a-select-option>
              </a-select>
            </template>
            <template v-else>{{ text }}</template>
          </template>
          <template slot="productUnit" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.productUnit"
              disabled
              @change="e => handleChange(e.target.value, record.key, 'productUnit')"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="amount" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.amount"
              @change="e => handleChange(e.target.value, record.key, 'amount')"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="unitPrice" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.unitPrice"
              @change="e => handleChange(e.target.value, record.key, 'unitPrice')"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="grossAmount" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.grossAmount"
              @change="e => handleChange(e.target.value, record.key, 'grossAmount')"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="remark" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.remark"
              @change="e => handleChange(e.target.value, record.key ,'remark')"
            />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="remove" slot-scope="text,record,index">
            <template>
              <div class="remove" @click="removeHandle(index)">
                <a-icon type="minus-circle" />
              </div>
            </template>
          </template>
        </a-table>
        <div class="add">
          <div class="addBtn" @click="addHandle">
            <a-icon type="plus-circle" theme="filled" style="fontSize:18px;color#ffffff;" />
            <p>添加</p>
          </div>
        </div>

        <div class="operationBtn">
          <a-button style="color:#ffffff;background-color:#1D18FF;" @click="showModal">发送客户</a-button>
          <a-button style="margin:0 20px;" type="primary">打印</a-button>
          <a-button @click="reset">重置</a-button>
        </div>
      </a-card>
      <a-modal v-model="visible" @ok="handleOk" width="800px">
        <div slot="title" class="modal-title text-center">销货清单</div>
        <ul class="part">
          <li>开票人：{{ form.drawer }}</li>
          <li>开票人联系方式：{{ form.drawerPhone }}</li>
          <li>客户联系方式：{{ form.customer }}</li>
          <li>客户名字：{{ form.customerPhone }}</li>
          <li>是否已付款：{{ form.payment?'是':'否' }}</li>
          <li></li>
        </ul>
        <div class="table" style="max-height:400px;overflow-y: auto;">
          <a-table :data-source="list" bordered :pagination="pagination">
            <a-table-column key="index" title="序号">
              <template slot-scope="text, record,index">{{ index + 1 }}</template>
            </a-table-column>
            <a-table-column key="productName" title="品名" data-index="productName">
              <template slot-scope="text">
                <a>{{ text }}</a>
              </template>
            </a-table-column>
            <a-table-column key="productUnit" title="单位" data-index="productUnit" />
            <a-table-column key="amount" title="数量" data-index="amount" />
            <a-table-column key="unitPrice" title="单价" data-index="unitPrice" />
            <a-table-column key="grossAmount" title="金额" data-index="grossAmount" />
          </a-table>
        </div>
        <template slot="footer">
          <div
            class="tip"
            style="margin:20px 0;color:#F2637B;"
          >提示：可全部填也可只填一个(手机号则以彩信形式发送至客户手机，微信号则在双方是微信好友的前提下发送到客户微信）</div>
          <div class="input">
            <div class="item">
              <label>手机号：</label>
              <a-input v-model="form.telephone" placeholder="请输入手机号" />
            </div>
            <div class="item">
              <label>微信号：</label>
              <a-input v-model="form.wechatNo" placeholder="请输入微信号" />
            </div>
          </div>
          <div class="bottom">
            <a-button type="primary" @click="confirmHandle" :loading="btnLoading">确定</a-button>
            <a-button type="danger" @click="printHandle">打印</a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getProductsInfo } from '@/api/product'
import { addChecklists } from '@/api/bill'
export default {
  name: 'GoodManage',
  components: {},

  data () {
    return {
      btnLoading: false,
      pagination: false,
      visible: false,
      columns: [
        {
          title: '货名',
          dataIndex: 'productName',
          scopedSlots: { customRender: 'productName' }
        },
        {
          title: '单位',
          dataIndex: 'productUnit',
          scopedSlots: { customRender: 'productUnit' }
        },
        {
          title: '数量',
          dataIndex: 'amount',
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: '单价',
          dataIndex: 'unitPrice',
          scopedSlots: { customRender: 'unitPrice' }
        },
        {
          title: '金额',
          dataIndex: 'grossAmount',
          scopedSlots: { customRender: 'grossAmount' }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          ellipsis: true,
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '操作',
          dataIndex: '移除',
          ellipsis: true,
          scopedSlots: { customRender: 'remove' }
        }
      ],
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
      form: {
        customer: '',
        customerPhone: '',
        drawer: '',
        drawerPhone: '',
        groupName: '',
        payment: undefined,
        telephone: '',
        wechatNo: ''
      },
      noteList: [],
      count: 0,
      product: []
    }
  },
  computed: {},
  created () {
    getProductsInfo().then((res) => {
      this.product = res.result
    })
  },
  methods: {
    reset () {
      this.form = {
        customer: '',
        customerPhone: '',
        drawer: '',
        drawerPhone: '',
        groupName: '',
        payment: undefined,
        telephone: '',
        wechatNo: ''
      }
      this.list = []
    },
    confirmHandle () {
      // if (!(this.form.telephone || this.form.wechatNo)) {
      //   this.$message.error('请输入手机号或微信号')
      //   return
      // }
      let arr = []
      this.list.forEach((element) => {
        let obj = {
          amount: element.amount,
          grossAmount: element.grossAmount,
          productId: element.productId,
          unitPrice: element.unitPrice
        }
        arr.push(obj)
      })
      let parmas = { ...this.form, productChecklists: arr }
      //  console.log(arr)
      this.btnLoading = true
      addChecklists(parmas)
        .then((res) => {
          this.btnLoading = false
          this.$message.error('添加清单成功')
          this.$confirm({
            title: '温馨提示',
            content: '添加清单成功',
            okText: '继续添加',
            okType: 'primary',
            cancelText: '查看清单列表',
            onOk () {
              this.form = {
                customer: '',
                customerPhone: '',
                drawer: '',
                drawerPhone: '',
                groupName: '',
                payment: undefined,
                telephone: '',
                wechatNo: ''
              }
              this.list = []
              this.visible = false
            },
            onCancel () {
              this.$router.push({ path: '/bill/soldList' })
            }
          })
        })
        .catch((error) => {
          this.btnLoading = false
          this.$message.error(error.message || '添加清单失败')
        })
    },
    printHandle () {},
    handleChange (value, key, column) {
      const newData = [...this.list]
      const target = newData.filter((item) => key === item.key)[0]
      if (target) {
        target[column] = value
        this.list = newData
      }
    },
    productChange (value, tableIndex) {
      if (value) {
        let productId = value.productId
        let currentData = ''
        this.product.forEach((element, index) => {
          if (element.productId === productId) {
            currentData = element
          }
        })
        let list = this.list
        list.forEach((element, index) => {
          if (element.productId === productId) {
            element.productUnit = currentData.unitName
            element.productName = currentData.productName
          }
        })
        this.list = list
      } else {
        this.list.forEach((element, index) => {
          if (tableIndex === index) {
            element = {
              key: element.key,
              productId: null,
              productName: '',
              productUnit: '',
              amount: '',
              unitPrice: '',
              grossAmount: '',
              remark: '',
              editable: true
            }
          }
        })
      }
    },
    addHandle () {
      if (this.product.length === 0) {
        this.$message.error('您尚未输入货物')
        return
      }
      if (this.product.length > 100) {
        this.$message.error('最多添加100条')
        return
      }
      const { count, list } = this
      const newData = {
        key: this.count,
        productId: null,
        productName: this.count,
        productUnit: '',
        amount: '',
        unitPrice: '',
        grossAmount: '',
        remark: '',
        editable: true
      }
      this.list = [...list, newData]
      this.count = count + 1
    },
    removeHandle (index) {
      this.list.splice(index, 1)
    },
    showModal () {
      // form: {
      //   customer: '',
      //   customerPhone: '',
      //   drawer: '',
      //   drawerPhone: '',
      //   groupName: '',
      //   payment: undefined,
      //   telephone: '',
      //   wechatNo: ''
      // },

      if (!this.form.groupName) {
        this.$message.error('请输入单位')
        return
      }
      if (!this.form.customer) {
        this.$message.error('请输入客户名')
        return
      }
      if (!this.form.customerPhone) {
        this.$message.error('请输入客户联系方式')
        return
      }
      if (!this.form.drawer) {
        this.$message.error('请输入开票人')
        return
      }
      if (!this.form.drawerPhone) {
        this.$message.error('请输入开票人联系方式')
        return
      }
      if (!this.form.payment && this.form.payment !== 0) {
        this.$message.error('请选择是否已付款')
        return
      }

      if (this.list.length === 0) {
        this.$message.error('您尚未添加货物')
        return
      }
      let bool = true
      for (let index = 0; index < this.list.length; index++) {
        const element = this.list[index]
        if (
          element.productId &&
          element.productName &&
          element.productUnit &&
          element.amount &&
          element.unitPrice &&
          element.grossAmount
        ) {
          //  console.log()
        } else {
          this.$message.error('第' + (index + 1) + '行数据请补充完整')
          bool = false
          break
        }
      }
      if (!bool) {
        return
      }
      this.visible = true
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
      //  console.log(this.form)
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
      //  console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange (pageNumber) {
      //  console.log('Page: ', pageNumber)
    }
  }
}
</script>

<style lang="less" scoped>
.bottom {
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
.input {
  display: flex;
  align-items: center;
  .item {
    margin-right: 20px;
    width: 40%;
    display: flex;
    align-items: center;
    label {
      width: 80px;
    }
  }
}
.part {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  li {
    width: 33.3%;
    margin-bottom: 10px;
  }
}
.add {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  .addBtn {
    padding: 0 50px;
    cursor: pointer;
  }
  p {
    margin-bottom: 0;
  }
}
.operationBtn {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.remove {
  cursor: pointer;
}
</style>
