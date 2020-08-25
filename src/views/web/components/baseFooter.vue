<template>
  <div class="footer">
    <div class="content">
      <div class="logo">
        <img src="../static/img/logo_white@2x.png" alt />
        <div class="copyright">
          <p><a href="http://wap.scjgj.sh.gov.cn/businessCheck/verifKey.do?showType=extShow&serial=9031000020200721102904000006114136-SAIC_SHOW_310000-2c9be8bd73d33fb9017410ce043e62c6418&signData=MEQCIAzDUGZUGpFwnE7k0R6NKqlLlT9qMDaZTiBm8+EJ0JBvAiBgZZqqew0pAcd9tLHEZFWWVvdKRU7FIu3SDoqbROl91g=="><img src="../static/img/zhizhao.png"/>沪ICP备20024192号-1</a></p>
          <p class="companyName">上海雨瑞信息科技有限公司</p>
        </div>
      </div>
      <div class="box">
        <div class="code">
          <img src="../static/img/code.png" alt />
          <p>壹周记官方公众号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.footer {
  height: 354px;
  background: #010101;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items:center;
    justify-content: space-between;
    .logo {
      img {
        width: 240px;
        height: 70px;
      }
       .copyright {
         margin-top: 50px;
        p {
          font-size: 18px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          a{
             display: flex;
            align-items: center;
            color: #ffffff;
            img{
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
          }
        }
        .companyName {
          font-size: 24px;
           margin-bottom: 0;
        }
      }
    }
    .box {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .code {
        text-align: center;
        img {
          width: 220px;
          height: 220px;
          margin-bottom: 20px;
        }
        p {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: bold;
        }
      }

    }
  }
}
</style>
