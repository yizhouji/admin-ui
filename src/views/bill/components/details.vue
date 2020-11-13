<template>
  <a-modal v-model="visible" width="800px">
    <div slot="title" class="modal-title text-center">销货清单</div>
    <div id="printMe" ref="printContent">
      <ul class="part">
        <li>开票人：{{ Details.drawer }}</li>
        <li>开票人联系方式：{{ Details.drawerPhone }}</li>
        <li>客户联系方式：{{ Details.customer }}</li>
        <li>客户名字：{{ Details.customerPhone }}</li>
        <li>是否已付款：{{ Details.payment ? '是' : '否' }}</li>
        <li>创建时间：{{ createTime }}</li>
      </ul>
      <div class="table" style="max-height:400px;overflow-y: auto;">
        <a-table :data-source="Details.productChecklists" bordered :pagination="pagination">
          <a-table-column key="index" title="序号">
            <template slot-scope="text, record, index">{{ index + 1 }}</template>
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
      <div class="tip" style="margin:20px 0;color:#F2637B;text-align:left;">
        提示：请选择以下任意一种方式把清单发送给客户。（如果不发送客户或者需要打印出来也可以不填信息）
      </div>
      <div class="input">
        <div class="item ">
          <p>方案一:</p>
          <div class="content">
            <label>手机号：</label>
            <a-input v-model="Details.telephone" disabled placeholder="请输入手机号" />
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
                <img src="../../../assets/zoom.png" alt="" />
                <p>放大二维码</p>
              </div>
              <div class="box" @click="download">
                <img src="../../../assets/download.png" alt="" />
                <p>下载二维码</p>
                <p>到电脑</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      a
      <div class="bottom">
        <a-button type="primary" @click="confirmHandle" :loading="btnLoading">确定</a-button>
        <!-- <a-button type="danger" @click="printHandle" :loading="btnLoading">打印</a-button> -->
        <a-button type="danger" @click="toImg">打印 </a-button>
      </div>
    </template>
    <a-modal centered v-model="imgPreview" title="二维码预览" :footer="null">
      <img :src="codeImgUrl" alt="" class="imgPreview" />
    </a-modal>
  </a-modal>
</template>

<script>
import html2canvas from 'html2canvas'
import printJS from 'print-js'
import { downloadIamge } from '@/utils/util'
export default {
  name: 'GoodManage',
  components: {},
  data () {
    return {
      imgPreview: false,
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
      },
      codeImgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=167741595,2706197548&fm=26&gp=0.jpg'
    }
  },
  computed: {
    amount () {
      let amount = 0
      if (this.Details && this.Details.productChecklists) {
        let productChecklists = this.Details.productChecklists

        productChecklists.forEach(element => {
          if (element.grossAmount && typeof element.grossAmount === 'number') {
            amount = amount + element.grossAmount
          }
        })
      }
      return amount
    }
  },
  methods: {
    // 放大二维码
    zoom () {
      this.imgPreview = true
    },
    // 下载二维码
    download () {
      downloadIamge(this.codeImgUrl, '销货清单')
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
.imgPreview {
  width: 300px;
  height: 300px;
  display: block;
  margin: 0 auto;
}
.amount {
  margin-top: 10px;
  text-align: right;
  color: #f2637b;
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
</style>
