<template>
  <page-header-wrapper>
    <a-card id="search-form" :bordered="false">
      <a-form-model
        class="ant-advanced-search-form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :model="form"
        @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-model-item label="公司名字">
              <a-input placeholder="请输入公司名字" v-model="form.groupName" allow-clear name="groupName" :maxLength="20" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人/单位">
              <a-input name="drawer" v-model="form.drawer" placeholder="请输入开票人/单位" allow-clear :maxLength="10" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="开票人/单位联系方式">
              <a-input
                name="drawerPhone"
                placeholder="请输入开票人/单位联系方式"
                v-model="form.drawerPhone"
                allow-clear
                :maxLength="11" />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户名字">
              <a-input name="customer" placeholder="请输入客户名字" v-model="form.customer" :maxLength="10" allow-clear />
            </a-form-model-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-model-item label="客户联系方式">
              <a-input
                name="customerPhone"
                placeholder="请输入客户联系方式"
                v-model="form.customerPhone"
                allow-clear
                :maxLength="11" />
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
          :row-selection="null">
          <template slot="productName" slot-scope="text, record, index">
            <template v-if="record.editable">
              <a-select
                name="payment"
                v-model="record.productId"
                placeholder="请选择"
                style="width:100%"
                allow-clear
                @change="productChange(record, index)">
                <a-select-option v-for="item in product" :key="item.productId" :value="item.productId">{{
                  item.productName
                }}</a-select-option>
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
              @change="e => handleChange(e.target.value, record.key, 'productUnit')" />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="amount" slot-scope="text, record">
            <a-input
              type="number"
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.amount"
              @change="e => handleChange(e.target.value, record.key, 'amount')" />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="unitPrice" slot-scope="text, record">
            <a-input
              type="number"
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.unitPrice"
              @change="e => handleChange(e.target.value, record.key, 'unitPrice')" />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="grossAmount" slot-scope="text, record">
            <a-input
              type="number"
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.grossAmount"
              @change="e => handleChange(e.target.value, record.key, 'grossAmount')" />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="remark" slot-scope="text, record">
            <a-input
              v-if="record.editable"
              style="margin: -5px 0"
              v-model="record.remark"
              @change="e => handleChange(e.target.value, record.key, 'remark')" />
            <template v-else>{{ text }}</template>
          </template>
          <template slot="remove" slot-scope="text, record, index">
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
          <!-- <a-button style="margin:0 20px;" type="primary">打印</a-button> -->
          <a-button @click="reset" style="margin-left:20px;">重置</a-button>
        </div>
      </a-card>
      <a-modal v-model="visible" @ok="handleOk" width="800px" :footer="null">
        <div slot="title" class="modal-title text-center">销货清单</div>
        <div id="printMe" ref="printContent">

          <ul class="part">
            <li>开票人：{{ form.drawer }}</li>
            <li>开票人联系方式：{{ form.drawerPhone }}</li>
            <li>客户联系方式：{{ form.customer }}</li>
            <li>客户名字：{{ form.customerPhone }}</li>
            <li>是否已付款：{{ form.payment ? '是' : '否' }}</li>
            <li></li>
          </ul>
          <div class="table" style="max-height:400px;overflow-y: auto;">
            <a-table :data-source="modelList" bordered :pagination="pagination">
              <a-table-column key="index" title="序号">
                <template slot-scope="text, record, index">{{ index + 1 }}</template>
              </a-table-column>
              <a-table-column key="productName" title="品名" data-index="productName">
                <template slot-scope="text">
                  <a>{{ text }}</a>
                </template>
              </a-table-column>
              <a-table-column key="productUnit" title="公司名字" data-index="productUnit" />
              <a-table-column key="amount" title="数量" data-index="amount" />
              <a-table-column key="unitPrice" title="单价" data-index="unitPrice" />
              <a-table-column key="grossAmount" title="金额" data-index="grossAmount" />
            </a-table>
          </div>
          <div class="amount">总计：{{ amount }} 元</div>
        </div>
        <div class="submit" v-if="showSubmit">
          <a-button type="primary" @click="confirmHandle">确定</a-button>
        </div>
        <div class="footer" v-if="showFooter">
          <div class="left circle"></div>
          <div class="left circle"></div>
          <div class="tip" style="margin:20px 0;color:#F2637B;text-align:left;">
            提示：请选择以下任意一种方式把清单发送给客户。（如果不发送客户或者需要打印出来也可以不填信息）
          </div>
          <div class="input">
            <div class="item ">
              <p>方案一:</p>
              <div class="content">
                <label>手机号：</label>
                <a-input v-model="telephone" placeholder="请输入手机号" />
              </div>
            </div>
            <div class="item sanCode">
              <p>方案二:</p>
              <div class="content ">
                <div class="img">
                  <img :src="codeImgUrl" alt="" />
                  <p>客户扫描二维码</p>
                </div>
                <div class="operation">
                  <div class="box" @click="zoom">
                    <img src="../../assets/zoom.png" alt="" />
                    <p>放大二维码</p>
                  </div>
                  <div class="box" @click="download">
                    <img src="../../assets/download.png" alt="" />
                    <p>下载二维码</p>
                    <p>到电脑</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <a-button type="primary" @click="confirmInfoHandle" :loading="btnLoading">确定</a-button>
            <!-- <a-button type="danger" @click="printHandle" :loading="btnLoading">打印</a-button> -->
            <a-button type="danger" class="print" @click="toImg">打印 </a-button>
          </div>
        </div>
        <a-modal centered v-model="imgPreview" title="二维码预览" :footer="null">
          <img :src="codeImgUrl" alt="" class="imgPreview" />
        </a-modal>
      </a-modal>
    </div>
  </page-header-wrapper>
</template>

<script>
  import html2canvas from 'html2canvas'
  import printJS from 'print-js'
  import {
    getProductsInfo
  } from '@/api/product'
  import {
    downloadIamge
  } from '@/utils/util'

  import {
    addChecklists,
    getCode
  } from '@/api/bill'
  import {
    setTimeout
  } from 'timers'
  export default {
    name: 'GoodManage',
    components: {},

    data () {
      return {
        showSubmit: true,
        imgPreview: false,
        btnLoading: false,
        pagination: false,
        visible: false,
        showFooter: false,
        columns: [{
            title: '货名',
            dataIndex: 'productName',
            scopedSlots: {
              customRender: 'productName'
            }
          },
          {
            title: '单位',
            dataIndex: 'productUnit',
            scopedSlots: {
              customRender: 'productUnit'
            }
          },
          {
            title: '数量',
            dataIndex: 'amount',
            scopedSlots: {
              customRender: 'amount'
            }
          },
          {
            title: '单价',
            dataIndex: 'unitPrice',
            scopedSlots: {
              customRender: 'unitPrice'
            }
          },
          {
            title: '金额',
            dataIndex: 'grossAmount',
            scopedSlots: {
              customRender: 'grossAmount'
            }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            scopedSlots: {
              customRender: 'remark'
            }
          },
          {
            title: '操作',
            dataIndex: '移除',
            ellipsis: true,
            scopedSlots: {
              customRender: 'remove'
            }
          }
        ],
        list: [{
            key: 0,
            productId: null,
            productName: '',
            productUnit: '',
            amount: '',
            unitPrice: '',
            grossAmount: '',
            remark: '',
            editable: true
          },
          {
            key: 1,
            productId: null,
            productName: '',
            productUnit: '',
            amount: '',
            unitPrice: '',
            grossAmount: '',
            remark: '',
            editable: true
          },
          {
            key: 2,
            productId: null,
            productName: '',
            productUnit: '',
            amount: '',
            unitPrice: '',
            grossAmount: '',
            remark: '',
            editable: true
          }
        ],
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
          payment: undefined
        },
        noteList: [],
        count: 3,
        product: [],
        modelList: [],
        telephone: '',
        codeImgUrl: ''
      }
    },
    computed: {
      amount () {
        let amount = 0
        if (this.modelList.length > 0) {
          this.modelList.forEach(element => {
            if (element.grossAmount) {
              amount = amount + Number(element.grossAmount)
            }
          })
        }
        return amount
      }
    },
    created () {
      getProductsInfo().then(res => {
        this.product = res.result
      })
    },
    methods: {
      confirmInfoHandle () {

      },
      // 放大二维码
      zoom () {
        this.imgPreview = true
      },
      // 下载二维码
      download () {
        downloadIamge(this.codeImgUrl, '销货清单')
      },
      submitInfo () {

      },
      toImg () {
        html2canvas(this.$refs.printContent, {
          backgroundColor: null,
          useCORS: true,
          windowHeight: document.body.scrollHeight
        }).then(canvas => {
          // let url = canvas.toDataURL('image/jpeg', 1.0)
          let url = canvas.toDataURL()
          this.img = url
          printJS({
            printable: url,
            type: 'image',
            documentTitle: '销货清单'
          })
        })
      },
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
        this.modelList.forEach(element => {
          let obj = {
            amount: element.amount,
            grossAmount: element.grossAmount,
            productId: element.productId,
            unitPrice: element.unitPrice
          }
          arr.push(obj)
        })
        let parmas = {
          ...this.form,
          productChecklists: arr
        }
        //  console.log(arr)
        this.btnLoading = true
        let self = this
        addChecklists(parmas)
          .then(res => {
            this.btnLoading = false
            this.$message.success('添加清单成功')

            self.form = {
              customer: '',
              customerPhone: '',
              drawer: '',
              drawerPhone: '',
              groupName: '',
              payment: undefined

            }
            self.telephone = ''
            self.list = []
            this.getQrcode(res.result)
          })
          .catch(error => {
            this.btnLoading = false
            this.$message.error(error.data.message || '添加清单失败')
          })
      },
      getQrcode (id) {
          getCode(id).then(res => {
            this.codeImgUrl = res.result
            this.showSubmit = false
            this.showFooter = true
          }).catch(error => {
            this.$message.error(error.data.message || '获取二维码失败')
          })
      },
      printHandle () {},
      handleChange (value, key, column) {
        const newData = [...this.list]

        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          if (column === 'amount' || column === 'unitPrice') {
              target['grossAmount'] = Number(target['amount']) * Number(target['unitPrice'])
          }
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
        const {
          count,
          list
        } = this
        const newData = {
          key: this.count,
          productId: null,
          productName: '',
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
        if (!this.form.groupName) {
          this.$message.error('请输入公司名称')
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
        let arr = []
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
            arr.push(element)
            bool = true
          } else if (
            element.productId ||
            element.productName ||
            element.productUnit ||
            element.amount ||
            element.unitPrice ||
            element.grossAmount
          ) {
            this.$message.error('第' + (index + 1) + '行数据请补充完整')
            bool = false
            break
          } else {
            console.log(index)
          }
        }
        if (!bool) {
          return
        }
        console.log(arr)
        if (arr.length === 0) {
          this.$message.error('请添加货物数据')
          return
        }
        this.modelList = arr
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
  .print {
    background: #1D18FF;
    border-color: #1D18FF;
    margin-left: 24px;
  }

  .input {
    display: flex;
    // align-items: center;
    text-align: left;

    .item {
      margin-right: 20px;
      width: 40%;

      p {
        color: #f2637b;
      }

      .content {
        margin-top: 18px;
        display: flex;
        align-items: center;

        label {
          width: 80px;
        }

        .img {
          img {
            display: block;
            width: 136px;
            height: 136px;
            border-radius: 5px;
            margin: 0 auto;
            background: #d8d8d8;
          }

          p {
            text-align: center;
            font-size: 12px;
            color: #666666;
            margin-top: 10px;
          }
        }
      }
    }

    .sanCode {
      display: flex;
      justify-content: space-between;
      flex: 1;

      .content {
        margin-top: 0;
        flex: 1;
        justify-content: space-around;

        .operation {
          .box {
            margin-bottom: 10px;
            cursor: pointer;

            img {
              width: 28px;
              height: 28px;
              display: block;
              margin: 0 auto;
            }

            p {
              font-size: 14px;
              color: #666666;
              text-align: center;
            }
          }

          .box:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }

  .imgPreview {
    width: 300px;
    height: 300px;
    display: block;
    margin: 0 auto;
  }

  .footer {
    position: relative;
    border-top: 1px solid #e9e9e9;

    .circle {
      height: 20px;
      width: 20px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      left: -10px;
      top: -10px;
    }
  }

  .submit {
    text-align: center;
    margin: 24px 0;

    button {
      width: 134px;

    }
  }

  .amount {
    text-align: right;
    color: #f2637b;
    margin: 24px 0;
  }

  .bottom {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
  }

  // .input {
  //   display: flex;
  //   align-items: center;

  //   .item {
  //     margin-right: 20px;
  //     width: 40%;
  //     display: flex;
  //     align-items: center;

  //     label {
  //       width: 80px;
  //     }
  //   }
  // }

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
