<template>
  <div class="pay">
    <a-modal
      centered
      v-model="visible"
      width="500px"
      okText=""
      title="支付提示"
      @ok="handleOk">
      <a-tabs default-active-key="1" @change="callback" class="code">
        <a-tab-pane key="1" tab="微信支付">
          <div class="codeImg">
            <img :src="codeImg" alt="">
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="支付宝支付" force-render>
          <div class="codeImg">
            <img src="" alt="">
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script>
import { price, wechatPay } from '@/api/price'
export default {
  name: 'Price',
  components: {},
  data () {
    return {
      list: [],
      visible: false,
      commodityId: '',
      codeImg: '',
      orderNo: ''
    }
  },
  mounted () {},
  methods: {
      buy (commodityId) {
        wechatPay({
          commodityId
        }).then(res => {
          this.codeImg = res.result.codeUrl
          this.orderNo = res.result.orderNo
          this.visible = true
        }).catch(error => {
          if (error.status === 401) {
              this.visible = false
          }
        })
      },
      show (commodityId) {
        this.commodityId = commodityId
        this.buy(commodityId)
      },
    handleOk () {},
    callback (key) {
      console.log(key)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .code{
    display: block;
}
    /deep/ .codeImg{
        img{
            width: 200px;
            height: 200px;
            display: block;
            margin: 0 auto;
        }
    }

</style>
