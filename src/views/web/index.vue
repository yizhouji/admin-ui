<template>
  <div class="page">
    <navBar></navBar>
    <div class="part_1">
      <div class="title">高效系统的商家货物后台管理系统</div>
      <p>货物管理，清单票据，销量分析，记事便签，货物状态</p>
      <p>简单明了，高效快捷的一体化货物管理系统</p>
      <button @click="linkHandle">立即使用</button>
      <div class="img">
        <img src="./static/img/web_5.png" alt />
      </div>
    </div>
    <div class="part_2">
      <div class="title">后台操作系统</div>
      <p>专为企业货物管理与分析服务</p>
      <div class="content">
        <div class="text">
          <div class="title">货物轻松管理</div>
          <p>多种查询条件</p>
          <p>货物具体统计（总库存，卖出数量，卖出金额等）</p>
          <p>对于商品的任意备注</p>
        </div>
        <div class="img">
          <img src="./static/img/web_1.png" alt />
        </div>
      </div>
    </div>
    <div class="part_3">
      <div class="content">
        <div class="img">
          <img src="./static/img/web_3.png" alt />
        </div>
        <div class="text">
          <div class="title">销货清单/一键发送</div>
          <p>抛弃传统书写清单，节约成本</p>
          <p>解决传统清单存放问题，过去记录一键掌握</p>
          <p>通过微信号，手机号一键传输清单</p>
        </div>
      </div>
    </div>
    <div class="part_4">
      <div class="content">
        <div class="text">
          <div class="title">交易明细</div>
          <p>货物交易一键查询</p>
          <p>往期记录一键掌握</p>
          <p>两类明细更加系统展示，让您清清楚楚</p>
        </div>
        <div class="img">
          <img src="./static/img/web_1.png" alt />
        </div>
      </div>
    </div>
    <div class="part_5">
      <div class="content">
        <div class="img">
          <img src="./static/img/web_3.png" alt />
        </div>
        <div class="text">
          <div class="title">货物积压</div>
          <p>货物交易一键查询</p>
          <p>往期记录一键掌握</p>
          <p>两类明细更加系统展示，让您清清楚楚</p>
        </div>
      </div>
    </div>
    <div class="part_6">
      <div class="content">
        <div class="title">我们的客户</div>
        <p>我们的目标只有一个，就是为您作出更好的产品和更优的服务</p>
        <div class="imgBox">
          <img src="./static/img/20000000+.png" alt />
        </div>
        <button @click="linkHandle">立即使用</button>
      </div>
    </div>
    <baseFooter></baseFooter>
  </div>
</template>

<script>
import navBar from './components/navbar'
import baseFooter from './components/baseFooter'

export default {
  components: {
    navBar,
    baseFooter
  },
  data () {
    return {}
  },
  methods: {
    linkHandle () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
div,
p {
  line-height: 1;
}
.page {
  color: #0d0a0a;
  min-width: 1200px;
  .part_1 {
    padding-top: 156px;
    box-sizing: border-box;
    height: 1137px;
    text-align: center;
    background: #ffffff;
    .title {
      font-size: 48px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(13, 10, 10, 1);
      line-height: 48px;
      padding: 20px 0;
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
      background: rgba(24, 144, 255, 1);
      border-radius: 2px;
    }

    p {
      font-size: 20px;
      margin-bottom: 17px;
    }
    button {
      width: 174px;
      height: 54px;
      background: rgba(24, 144, 255, 1);
      border-radius: 10px;
      margin-top: 53px;
      color: #ffffff;
      font-size: 20px;
      border: none;
      outline: none;
      cursor: pointer;
    }
    .img {
      background: #eeeeee;
      width: 1024px;
      height: 688px;
      border-radius: 20px;
      position: relative;
      margin: 60px auto 0;
      z-index: 2;
      box-shadow: 0px 11px 52px 18px rgba(147, 203, 255, 0.22);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .part_2 {
    height: 676px;
    background: rgba(24, 144, 255, 1);
    color: #ffffff;
    text-align: center;
    padding-top: 164px;
    box-sizing: border-box;

    .title {
      font-size: 48px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 48px;

      margin-bottom: 27px;
    }

    p {
      font-size: 20px;
    }
    .content {
      width: 1200px;
      margin: 58px auto 0;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      position: relative;
      .text {
        padding-top: 80px;
        text-align: left;
        .title {
          font-size: 36px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 48px;
          padding: 0 0 14px;
          margin-bottom: 50px;
          position: relative;
        }
        .title:after {
          content: '';
          position: absolute;
          left: 0%;
          bottom: 0;
          width: 33px;
          height: 4px;
          background: #ffffff;
          border-radius: 2px;
        }
        p {
          font-size: 20px;
          margin-bottom: 24px;
        }
      }
      .img {
        width: 734px;
        height: 491px;
        background: #eeeeee;
        box-shadow: 0px 11px 52px 18px rgba(147, 203, 255, 0.22);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .part_3,
  .part_4,
  .part_5 {
    height: 901px;
    background: #ffffff;
    .content {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        text-align: left;
        .title {
          font-size: 36px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          line-height: 48px;
          padding: 0 0 25px;
          margin-bottom: 50px;
          position: relative;
        }
        .title:after {
          content: '';
          position: absolute;
          left: 0%;
          bottom: 0;
          width: 33px;
          height: 4px;
          background: #1890ff;
          border-radius: 2px;
        }
        p {
          font-size: 20px;
          margin-bottom: 24px;
        }
      }
      .img {
        width: 734px;
        height: 491px;
        background: #eeeeee;
        box-shadow: 0px 11px 52px 18px rgba(147, 203, 255, 0.22);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .part_3 {
    .content {
      position: relative;
      padding-top: 300px;
    }
  }
  .part_4 {
    height: 548px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    .content {
      margin: 0 auto;
      .img {
        width: 660px;
        height: 441px;
        background: #eeeeee;
        box-shadow: 0px 11px 52px 18px rgba(147, 203, 255, 0.22);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .part_5 {
    height: 528px;
    display: flex;
    align-items: center;
    .content {
      margin: 0 auto;
      .img {
        width: 605px;
        height: 406px;
        background: #eeeeee;
        box-shadow: 0px 11px 52px 18px rgba(147, 203, 255, 0.22);
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .part_6 {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 570px;
    text-align: center;
    background-image: url('./static/img/index_bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    // background: rgba(6, 47, 84, 0.6);
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
    .imgBox {
      margin: 74px auto 63px;
      z-index: 2;
      img {
        width: 683px;
        height: 110px;
      }
    }
  }
}
</style>
