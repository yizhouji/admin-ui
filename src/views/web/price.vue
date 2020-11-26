<template>
  <div class="price">
    <navBar></navBar>
    <div class="banner">
      <div class="part">
        <div class="content">
          <div class="title">选择您需要的</div>
          <p>我们的目标</p>
          <p>为了给您更好的体验更多的功能服务</p>
        </div>
      </div>
      <div class="list">
        <div class="item" :class="'item_'+ index" v-for="(item,index) in list" :key="item.originalCost">
          <div class="title">{{ item.commodityName }}</div>
          <div class="content">
            <div class="txt">
              <p v-html="item.commodityDetail"></p>
            </div>
            <div class="btm">
              <div class="priceBox">
                <span class="old">¥{{ item.originalCost }}</span>
                <span>¥{{ item.actualCost }}</span>
              </div>
              <button @click="buy(item.commodityId)">立即使用</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="dsc">
      <div class="part">
        <div class="content">
          <div class="title">一键获取-4大功能</div>
          <p>针对商家对于货物管理开发的</p>
          <p>4 种 主 要 的 具 有 针 对 性 的 功 能</p>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="img">
            <img src="./static/img/price_1.png" alt />
          </div>
          <div class="title">出库入库</div>
          <p>货物出库入库灵活掌握</p>
        </div>
        <div class="item">
          <div class="img">
            <img src="./static/img/price_2.png" alt />
          </div>
          <div class="title">一键发送/打印清单</div>
          <p>抛弃传统手写清单，直接传送手机或微信</p>
        </div>
        <div class="item">
          <div class="img">
            <img src="./static/img/price_3.png" alt />
          </div>
          <div class="title">货物管理</div>
          <p>仓库积压货物一键掌握</p>
        </div>
        <div class="item">
          <div class="img">
            <img src="./static/img/price_4.png" alt />
          </div>
          <div class="title">记事本/图片</div>
          <p>标注重要等级让您轻松掌控</p>
        </div>
      </div>
    </div>
    <div class="question">
      <div class="title">常见问题</div>
      <div class="list">
        <div class="part">
          <div class="item">
            <div class="q">01.试用版可以购买几次？</div>
            <p>因为是试用版，每个用户只能申请一次哦。</p>
          </div>
          <div class="item">
            <div class="q">03.付费之后是否可以退费？</div>
            <p>一经购买即认定成交，是不能退费的哦。</p>
          </div>
          <div class="item">
            <div class="q">05.操作中如果遇到什么问题怎么办？</div>
            <p>遇到任何问题不清楚的请联系客户，我们将会竭尽全力为您解决。</p>
          </div>
        </div>
        <div class="part">
          <div class="item">
            <div class="q">02.一个手机号能申请几个账户？</div>
            <p>一个手机号只能申请一个账户。</p>
          </div>

          <div class="item">
            <div class="q">04.在哪里看到VIP所剩使用时间？</div>
            <p>点击头像，即可在个人中心里看到会员所剩余时间。</p>
          </div>

          <div class="item">
            <div class="q">06.成为VIP之后是否可以享受哪些功能？</div>
            <p>成为VIP之后可以享受系统所有功能，以及后续的更新功能。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="code">
      <div class="content">
        <div class="title">联系我们</div>
        <p>想了解更多情况或者有什么其他问题请联系我们</p>
        <div class="img">
          <img src="./static/img/code.png" alt />
        </div>
      </div>
    </div>
    <a-modal
      centered
      v-model="visible"
      width="300px"
      okText="立即登录"
      title="提示"
      @ok="handleOk">
      <div class="body" style="text-align:center">您尚未登录或登录已超时</div>
    </a-modal>
    <baseFooter></baseFooter>
  </div>
</template>

<script>
  import navBar from './components/navbar'
  import baseFooter from './components/baseFooter'
  import {
    price,
    wechatPay
  } from '@/api/price'
  export default {
    name: 'Price',
    components: {
      navBar,
      baseFooter
    },
    data () {
      return {
        list: [],
        visible: false
      }
    },
    mounted () {
      price().then(res => {
        if (res.result) {
          this.list = res.result
        }
      })
    },
    methods: {
      buy (commodityId) {
        wechatPay({
          commodityId
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log('buy:', error)
          if (error.status === 401) {
              this.visible = true
          }
        })
      },
      handleOk () {
        this.$router.push('/user/login')
        localStorage.setItem('link', '/price')
      }
    }
  }
</script>
<style lang="less" scoped>
  .price {
    padding-top: 80px;
    min-width: 1200px;

    .banner {
      height: 556px;
      background-image: url('./static/img/price_bg.jpg');
      background-repeat: no-repeat;
      background-position: center;

      .part {
        padding-top: 103px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .title {
          font-size: 48px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #ffffff;
          line-height: 48px;
          padding: 0 0 26px;
          position: relative;
          margin-bottom: 35px;
        }

        .title:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 33px;
          height: 4px;
          background: #ffffff;
          border-radius: 2px;
        }

        p {
          font-size: 20px;
          color: #ffffff;
          margin-bottom: 0;
        }

        button {
          width: 174px;
          height: 54px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          color: #1890ff;
          font-weight: bold;
          font-size: 20px;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }

      .list {
        margin: 85px auto 0;
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          width: 282px;
          height: 420px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(221, 221, 221, 1);
          border-radius: 30px;
          overflow: hidden;
          text-align: center;

          .title {
            background: #e1e1e1;
            color: #6f6f6f;
            height: 86px;
            line-height: 86px;
            font-size: 24px;
            font-weight: bold;
          }

          .content {
            padding: 0 20px;

            .txt {
              margin: 0 auto;
              padding: 36px 0 87px;

              p {
                color: #333333;
                font-size: 18px;
                line-height: 24px;
                margin-bottom: 13px;
              }

              p:last-child {
                margin-bottom: 0;
              }
            }

            .btm {
              border-top: 1px dashed #eeeeee;
              padding-top: 26px;

              .priceBox {
                color: #f88204;
                font-size: 30px;
                line-height: 30px;
                margin-bottom: 20px;

                .old {
                  color: #666666;
                  font-size: 24px;
                  display: inline-block;
                  margin-right: 13px;
                  text-decoration: line-through;
                }

                .unit {
                  font-size: 18px;
                }
              }

              button {
                width: 116px;
                height: 36px;
                line-height: 36px;
                border: none;
                color: #ffffff;
                background: rgba(24, 144, 255, 1);
                border-radius: 4px;
                cursor: pointer;
              }
            }
          }
        }

        .item_1 {
          .title {
            background: #ffce8e;
            color: #da800a;
          }
        }

        .item_2 {
          .title {
            background: #a9d6ff;
            color: #096ec9;
          }
        }

        .item_3 {
          .title {
            color: #2f0eda;
            background: linear-gradient(55deg, rgba(181, 169, 255, 1), rgba(174, 158, 255, 1));
          }
        }
      }
    }

    .dsc {
      height: 800px;
      background: #ffffff;

      .part {
        padding-top: 320px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .title {
          font-size: 48px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #121212;
          line-height: 48px;
          padding: 0 0 26px;
          position: relative;
          margin-bottom: 35px;
        }

        .title:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 33px;
          height: 4px;
          background: #1890ff;
          border-radius: 2px;
        }

        p {
          font-size: 20px;
          color: #666666;
          margin-bottom: 0;
        }

        button {
          width: 174px;
          height: 54px;
          background: rgba(255, 255, 255, 1);
          border-radius: 10px;
          color: #1890ff;
          font-weight: bold;
          font-size: 20px;
          border: none;
          outline: none;
          cursor: pointer;
        }
      }

      .list {
        margin: 84px auto 0;
        width: 1200px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          text-align: center;

          .img {
            margin-bottom: 30px;
            height: 80px;

            img {
              width: auto;
              height: 80px;
            }
          }

          .title {
            color: #121212;
            font-size: 24px;
            line-height: 24px;
            margin-bottom: 11px;
          }

          p {
            font-size: 18px;
            color: #666666;
            line-height: 18px;
          }
        }
      }
    }

    .question {
      height: 470px;
      background: rgba(246, 246, 246, 1);
      padding-top: 60px;
      box-sizing: border-box;

      .title {
        text-align: center;
        font-size: 48px;
        font-weight: bold;
        color: #121212;
        margin-bottom: 38px;
      }

      .list {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .item {
          // width: 50%;
          margin-bottom: 36px;

          .q {
            color: #121212;
            font-size: 18px;
            line-height: 1;
            margin-bottom: 20px;
          }

          p {
            color: #666666;
            line-height: 1;
            margin-bottom: 0;
            font-size: 16px;
          }
        }
      }
    }

    .code {
      height: 529px;
      background: #ffffff;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      .content {
        flex: 1;
      }

      .title {
        font-size: 48px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #121212;
        line-height: 48px;
        padding: 0 0 26px;
        position: relative;
        margin-bottom: 35px;
      }

      .title:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 33px;
        height: 4px;
        background: #1890ff;
        border-radius: 2px;
      }

      p {
        font-size: 20px;
        color: #666666;
        margin-bottom: 0;
      }

      .img {
        margin-top: 34px;

        img {
          width: 260px;
          height: 260px;
        }
      }
    }
  }
</style>
