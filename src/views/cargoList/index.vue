<!--
 * @Author: zhaojingyu
 * @Date: 2020-11-10 16:15:24
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-10 18:15:39
-->
<template>
  <div class="cargoList" :style="{ minHeight: height + 'px' }">
    <div class="img" v-show="isWeixin">
      <img :src="imgUrl" alt="" srcset="">
    </div>
    <div class="canvas" :class="isWeixin?'leftCanvas':''" ref="canvas">
      <div class="title" :style="style">
        <p>销货清单</p>
      </div>
      <div class="mainBox">
        <div class="topImg">
          <img src="../../assets/topImg.png" alt="" />

        </div>
        <div class="mainInfo">
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kaipiaoren.png" alt="" />
              </div>
              <span>开票人</span>
            </div>
            <div class="right">{{ info.drawer }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kmobile.png" alt="" />
              </div>
              <span>开票人联系方式</span>
            </div>
            <div class="right">{{ info.drawerPhone }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kname.png" alt="" />
              </div>
              <span>客户名字</span>
            </div>
            <div class="right">{{ info.customer }}</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/khmobile.png" alt="" />
              </div>
              <span>客户联系方式</span>
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
              <span>创建日期</span>
            </div>
            <div class="right">{{ info.createTime }}</div>
          </div>
        </div>
        <div class="detailTitle">
          <div class="left">
            <div class="img">
              <img src="../../assets/detail.png" alt="" />
            </div>
            <span>清单详情</span>
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
    <div class="save">
      <button v-if="isWeixin">长按图片可保存到本地</button>
      <button @click="save" v-else>点击保存图片到本地</button>

    </div>

  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import {
    sceneStr
  } from '@/api/cargoList'
  export default {
    name: 'CargoList',
    data () {
      return {
        isWeixin: true,
        info: '',
        total: 0,
        style: {
          background: 'url(' + require('../../assets/bg.png') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%'
        },
        height: document.documentElement.clientHeight || 800,
        imgUrl: ''
      }
    },
    mounted () {
      let params = this.$route.query.sceneStr
      let ua = window.navigator.userAgent.toLowerCase()
      // eslint-disable-next-line eqeqeq
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        this.isWeixin = true
      } else {
        this.isWeixin = true
      }
      sceneStr({
        'sceneStr': params
      }).then(res => {
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
          // if (this.isWeixin) {
            this.saveImg()
          // }
        })
      }).catch(error => {
        this.$message.error(error.data.message || '获取清单信息失败')
      })
    },
    methods: {

      saveImg () {
        document.body.scrollTop = document.documentElement.scrollTop = 0
        html2canvas(this.$refs.canvas).then(canvas => {
          let imgUrl = canvas.toDataURL('image/jpeg')
          this.imgUrl = imgUrl

          // var eleLink = document.createElement('a')
          // eleLink.href = imgUrl // 转换后的图片地址
          // eleLink.download = '壹周记-' + this.getNowFormatDate() + '.jpg'
          // // 触发点击
          // document.body.appendChild(eleLink)

          // document.body.removeChild(eleLink)
        })
      },
       getNowFormatDate () {
        var date = new Date()
        var seperator1 = '-'
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
            month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate
        return currentdate
    }
    }
  }
</script>

<style lang="less" scoped>
  .cargoList {
    .img {
      img {
        width: 100%;
      }
    }

    .canvas {
      background: #f5f5f5;

    }
    .leftCanvas{
      position: absolute;
      width: 100%;
      left: -100%;
    }
    .title {
      text-align: center;
      font-size: 0.6rem;
      height: 5rem;
      line-height: 4rem;
      display: flex;
      justify-content: center;
      font-weight: bold;
      color: #ffffff;
    }

    .mainBox {
      padding: 0 0.4rem;
      margin-top: -1.5rem;
      padding-bottom: 1.8rem;

      .topImg {
        img {
          width: 90%;
          height: auto;
          display: block;
          margin: 0 auto
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
        padding: 0 0.4rem;
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
            margin-right: 0.2rem;

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
      line-height: 1.5rem;
      //   padding: 0 0.6rem;
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
        padding: 0 0.4rem;

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
            font-weight: bold;
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
      position: fixed;
      z-index: 2;
      bottom: 0;
      left: 0;
      right: 0;

      button {
        font-size: 0.45rem;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        background: #28b9fc;
        color: #ffffff;
      }
    }
  }
</style>
