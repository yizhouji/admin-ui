<!--
 * @Author: zhaojingyu
 * @Date: 2020-11-10 16:15:24
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-10 18:15:39
-->
<template>
  <div class="cargoList" >

    <div class="canvas" :class="isWeixin ? 'leftCanvas' : ''" ref="canvas">

      <div class="mainBox" >

        <div class="mainInfo" :style="style">
          <div class="title">
            <p>销货清单</p>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kaipiaoren.png" alt="" />
              </div>
              <span>开票人/单位</span>
            </div>
            <div class="right">{{ info.drawer }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kmobile.png" alt="" />
              </div>
              <span>开票人/单位联系方式</span>
            </div>
            <div class="right">{{ info.drawerPhone }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kname.png" alt="" />
              </div>
              <span>客户/单位</span>
            </div>
            <div class="right">{{ info.customer }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/khmobile.png" alt="" />
              </div>
              <span>客户/单位联系方式</span>
            </div>
            <div class="right">{{ info.customerPhone }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/pay.png" alt="" />
              </div>
              <span>是否已付款</span>
            </div>
            <div class="right">{{ info.paymentName }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kdate.png" alt="" />
              </div>
              <span>销货日期</span>
            </div>
            <div class="right">{{ info.createTime }}</div>
          </div>
        </div>
        <div class="detailTitle">
          <div class="left">
            <div class="img">
              <img src="../../assets/detail.png" alt="" />
            </div>
            <span>销货详情</span>
          </div>
          <div class="right">总计：￥{{ total }}</div>
        </div>
        <div class="goodList">
          <div class="item" v-for="item in info.productChecklists" :key="item.unitId">
            <div class="itemTitle">
              <div class="name">{{ item.productName }}</div>
              <div class="price">￥{{ item.grossAmount }}</div>
            </div>
            <div class="txt">
              <div class="part">单价：￥{{ item.unitPrice }}</div>
              <div class="part">数量：{{ item.amount }}</div>
              <div class="part">单位：{{ item.unitName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="canvasImg" v-show="isWeixin" :style="{ minHeight: height + 'px' }">
      <img :src="imgUrl" alt="" srcset="">
      <p v-if="load">长按保存图片到手机</p>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { sceneStr } from '@/api/cargoList'
require('@/utils/log')
export default {
  name: 'CargoList',
  data () {
    return {
      load: false,
      isWeixin: true,
      info: '',
      total: 0,
      style: {
        backgroundImage: 'url(' + require('../../assets/cargoList.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '15px 0',
        backgroundSize: '30% '
      },
      height: document.documentElement.clientHeight || 800,
      imgUrl: ''
    }
  },
  mounted () {
    let params = this.$route.query.sceneStr

    sceneStr({
      sceneStr: params
    })
      .then(res => {
        this.info = res.result
        let list = res.result.productChecklists
        let amount = 0
        if (list) {
          list.forEach(element => {
            if (element.grossAmount && typeof element.grossAmount === 'number') {
              amount = amount + element.grossAmount
            }
          })
          this.total = amount
        }
        this.$nextTick(() => {
          setTimeout(() => {
              this.saveImg()
          }, 100)
        })
      })
      .catch(error => {
        this.$message.error(error.data.message || '获取清单信息失败')
      })
  },
  methods: {
    saveImg () {
      document.body.scrollTop = document.documentElement.scrollTop = 0
      html2canvas(this.$refs.canvas).then(canvas => {
        let imgUrl = canvas.toDataURL('image/jpeg')
        this.imgUrl = imgUrl
        this.load = true
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cargoList {
  background-color: #ffffff;
  background: no-repeat;
  .canvasImg {
    padding-bottom: 1rem;
    background: #f4f5f9;
    img {
      width: 100%;
    }
    p{
      text-align: center;
          margin-top: -1px;
    position: relative;
    z-index: 2;
    background: #f4f5f9;
    }
  }

  .canvas {
    background-color: #f4f5f9;
  }
  .leftCanvas {
    // position: absolute;
    width: 100%;
    left: -100%;
  }
  .title {
    text-align: center;
    font-size: 0.6rem;
    // height: 5rem;
    // line-height: 4rem;
    // display: flex;
    // justify-content: center;
    font-weight: bold;
    text-align: center;
    color: #333333;
    // background: #ffffff;
    padding-top: 1.2rem;
    padding-bottom: 0.3rem;
    p {
      margin-bottom: 20px;
    }
    .line {
      width: 138px;
      height: 1px;
      background: #051e3c;
      margin: 0 auto 0.05rem;
    }
    .line:last-child {
      margin-bottom: 0;
    }
  }

  .mainBox {
    // padding: 0 0.4rem;
    // margin-top: -1.5rem;
    padding-bottom: 1rem;
    // background: #ffffff;

    .topImg {
      img {
        width: 90%;
        height: auto;
        display: block;
        margin: 0 auto;
      }
    }
  }

  .mainInfo {
    background: #ffffff;
    border-radius: 0.3rem;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 1.5rem;
      line-height: 1.5rem;
      padding: 0 15px;
      //   border-bottom: 1px solid #eeeeee;
      position: relative;

      .left {
        display: flex;
        align-items: center;

        .img {
          width: 0.45rem;
          height: 0.45rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.4rem;

          img {
            width: auto;
            height: 0.45rem;
            display: block;
          }
        }

        span {
          font-size: 0.45rem;
          color: #222222;
          // font-weight: bold;
        }
      }

      .right {
        font-size: 0.4rem;
        color: #666666;
      }
    }

    .item::after {
      content: '';
      height: 1px;
      background: #eeeeee;
      left: 0.4rem;
      right: 0.4rem;
      z-index: 2;
      position: absolute;
      bottom: 0;
    }

    .item:last-child::after {
      height: 0px;
    }
  }

  .detailTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.5rem;
    background: #f4f5f9;
    line-height: 1.5rem;
    padding: 0 15px;
    //   border-bottom: 1px solid #eeeeee;
    position: relative;

    .left {
      display: flex;
      align-items: center;

      .img {
        width: 0.56rem;
        height: 0.56rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;

        img {
          height: 0.56rem;

          display: block;
        }
      }

      span {
        font-size: 0.45rem;
        color: #222222;
        font-weight: bold;
      }
    }

    .right {
      font-size: 0.4rem;
      color: #f81717;
    }
  }

  .goodList {
    .item {
      background: #ffffff;
      margin-bottom: 0.4rem;
      padding: 0 15px;

      .itemTitle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 1.5rem;
        height: 1.5rem;
        border-bottom: 1px solid #eeeeee;

        .name {
          font-size: 0.45rem;
          color: #222222;
          // font-weight: bold;
        }

        .price {
          font-size: 0.5rem;
          color: #f81717;
        }
      }

      .txt {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 0.4rem;

        .part {
          width: 50%;
          color: #666666;
          font-size: 0.4rem;
          margin-bottom: 0.4rem;
        }

        .part:nth-child(even) {
          text-align: right;
        }
      }
    }
  }

  .save {
    // position: fixed;
    // z-index: 2;
    // bottom: 0;
    // left: 0;
    // right: 0;

    button {
      font-size: 0.45rem;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      // background: #28b9fc;
      color: #666666;
    }
  }
}
</style>
