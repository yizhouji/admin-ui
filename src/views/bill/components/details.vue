<template>
  <a-modal v-model="visible" width="800px">
    <div slot="title" class="modal-title text-center">销货清单</div>
    <div id="printMe" ref="printContent">
      <ul class="part">
        <li>开票人：{{ Details.drawer }}</li>
        <li>开票人联系方式：{{ Details.drawerPhone }}</li>
        <li>客户联系方式：{{ Details.customer }}</li>
        <li>客户名字：{{ Details.customerPhone }}</li>
        <li>是否已付款：{{ Details.payment?'是':'否' }}</li>
        <li>创建时间：{{ createTime }}</li>
      </ul>
      <div class="table" style="max-height:400px;overflow-y: auto;">
        <a-table :data-source="Details.productChecklists" bordered :pagination="pagination">
          <a-table-column key="index" title="序号">
            <template slot-scope="text, record,index">{{ index + 1 }}</template>
          </a-table-column>
          <a-table-column key="productName" title="品名" data-index="productName">
            <template slot-scope="text">
              <a>{{ text }}</a>
            </template>
          </a-table-column>
          <a-table-column key="productUnit" title="单位" data-index="unitName" />
          <a-table-column key="amount" title="数量" data-index="amount" />
          <a-table-column key="unitPrice" title="单价" data-index="unitPrice" />
          <a-table-column key="grossAmount" title="金额" data-index="grossAmount" />
        </a-table>

      </div>
      <div class="amount">总计：{{ amount }} 元</div>
    </div>
    <template slot="footer">
      <div class="tip" style="margin:20px 0;color:#F2637B;">提示：可全部填也可只填一个(手机号则以彩信形式发送至客户手机，微信号则在双方是微信好友的前提下发送到客户微信）
      </div>
      <div class="input">
        <div class="item">
          <label>手机号：</label>
          <a-input v-model="Details.telephone" disabled placeholder="请输入手机号" />
        </div>
        <div class="item">
          <label>微信号：</label>
          <a-input v-model="Details.wechatNo" disabled placeholder="请输入微信号" />
        </div>
      </div>

      <div class="bottom">
        <a-button type="primary" @click="confirmHandle" :loading="btnLoading">确定</a-button>
        <!-- <a-button type="danger" @click="printHandle" :loading="btnLoading">打印</a-button> -->
        <a-button type="danger" @click="toImg">打印</el-button>
          <!-- <a-button type="danger" v-print="printObj">直接打印</el-button> -->
        </a-button></a-button></div>
    </template>
  </a-modal>
</template>

<script>
  import html2canvas from 'html2canvas'
  import printJS from 'print-js'
  export default {
    name: 'GoodManage',
    components: {},
    data () {
      return {
        visible: false,
        Details: '',
        createTime: '',
        btnLoading: false,
        pagination: false,
        printObj: {
          id: 'printMe',
          popTitle: '销货清单',
          // extraCss: 'https://www.google.com,https://www.google.com', // 用逗号分隔的附加链接连接
          extraHead: '<meta http-equiv="Content-Language" content="zh-cn"/>'
        }
      }
    },
    computed: {
      amount () {
        let productChecklists = this.Details.productChecklists
        let amount = 0
        productChecklists.forEach(element => {
          if (element.grossAmount && typeof element.grossAmount === 'number') {
            amount = amount + element.grossAmount
          }
        })
        return amount
      }
    },
    methods: {
      toImg () {
        html2canvas(this.$refs.printContent, {
          backgroundColor: null,
          useCORS: true,
          windowHeight: document.body.scrollHeight
        }).then((canvas) => {
          // let url = canvas.toDataURL('image/jpeg', 1.0)
          let url = canvas.toDataURL()
          this.img = url
          printJS(
            {
              printable: url,
              type: 'image',
              documentTitle: '销货清单'
            }
          )
        })
      },
      show (data, createTime) {
        this.visible = true
        this.createTime = createTime
        this.Details = data
      },
      confirmHandle () {
        this.btnLoading = true
        this.visible = false
        this.btnLoading = false
      },
      printHandle () {
        this.btnLoading = true
        this.visible = false
        this.btnLoading = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .amount{
    margin-top:10px;
    text-align:right;
    color:#F2637B
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
</style>
