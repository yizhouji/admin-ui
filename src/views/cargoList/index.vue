<!--
 * @Author: zhaojingyu
 * @Date: 2020-11-10 16:15:24
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-10 18:15:39
-->
<template>
  <div class="cargoList" :style="{ minHeight: height + 'px' }">
    <div class="canvas" ref="canvas">
      <div class="title" :style="style">
        <p>销货清单</p>
      </div>
      <div class="mainBox">
        <div class="mainInfo">
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kaipiaoren.png" alt="" />
              </div>
              <span>开票人</span>
            </div>
            <div class="right">张三</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kmobile.png" alt="" />
              </div>
              <span>开票人联系方式</span>
            </div>
            <div class="right">17666267171</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kname.png" alt="" />
              </div>
              <span>客户名字</span>
            </div>
            <div class="right">张三</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/khmobile.png" alt="" />
              </div>
              <span>客户联系方式</span>
            </div>
            <div class="right">17666267171</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/pay.png" alt="" />
              </div>
              <span>是否已付款</span>
            </div>
            <div class="right">是</div>
          </div>
          <div class="item">
            <div class="left">
              <div class="img">
                <img src="../../assets/kdate.png" alt="" />
              </div>
              <span>创建日期</span>
            </div>
            <div class="right">2020.01.10 19:00:00</div>
          </div>
        </div>
        <div class="detailTitle">
          <div class="left">
            <div class="img">
              <img src="../../assets/detail.png" alt="" />
            </div>
            <span>清单详情</span>
          </div>
          <div class="right">总计：￥1111000</div>
        </div>
        <div class="goodList">
          <div class="item">
            <div class="itemTitle">
              <div class="name">商品名字</div>
              <div class="price">￥100000</div>
            </div>
            <div class="txt">
              <div class="part">单价：￥100</div>
              <div class="part">数量：100</div>
              <div class="part">单位：个</div>
            </div>
          </div>
          <div class="item">
            <div class="itemTitle">
              <div class="name">商品名字</div>
              <div class="price">￥100000</div>
            </div>
            <div class="txt">
              <div class="part">单价：￥100</div>
              <div class="part">数量：100</div>
              <div class="part">单位：个</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="save">
      <button @click="save">长按保存图片到本地</button>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
export default {
  name: 'CargoList',
  data () {
    return {
      style: {
        background: 'url(' + require('../../assets/bg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      height: document.documentElement.clientHeight || 800,
      imgUrl: ''
    }
  },
  methods: {
    save () {
      html2canvas(this.$refs.canvas).then(canvas => {
        // 转成图片，生成图片地址
        console.log('canvas：', canvas)
        let imgUrl = canvas.toDataURL('image/png')

        var eleLink = document.createElement('a')
        eleLink.href = imgUrl // 转换后的图片地址
        eleLink.download = 'pictureName'
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cargoList {
  background: #f5f5f5;
  .title {
    text-align: center;
    font-size: 0.6rem;
    height: 5rem;
    line-height: 4rem;
    display: flex;
    justify-content: center;
    background: #28b9fc;
    font-weight: bold;
    color: #ffffff;
  }
  .mainBox {
    padding: 0 0.4rem;
    margin-top: -1.5rem;
    padding-bottom: 1.8rem;
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
          font-weight: 600;
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
      left: 0.6rem;
      right: 0.6rem;
      z-index: 2;
      position: absolute;
      bottom: 0;
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
