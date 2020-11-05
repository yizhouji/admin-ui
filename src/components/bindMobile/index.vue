<!--
 * @Author: zhaojingyu
 * @Date: 2020-11-05 14:19:48
 * @LastEditors: zhaojingyu
 * @LastEditTime: 2020-11-05 15:04:58
-->
<template>
  <a-modal :footer="null" :closable="false" centered v-model="visible" :width="360">
    <div class="bindMobile">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="input">
        <a-input ref="userNameInput" class="inputItem" v-model="phone" placeholder="请输入手机号">
          <a-icon slot="prefix" type="mobile" :style="{ color: '#d9d9d9' }" />
        </a-input>
      </div>
      <div class="input">
        <a-input ref="userNameInput" class="inputItem" v-model="code" placeholder="请输入验证码">
          <a-icon slot="prefix" type="lock" :style="{ color: '#d9d9d9' }" />
        </a-input>
        <a-button type="primary" ghost>发送验证码</a-button>
      </div>
      <div class="submit">
        <a-button type="primary" block>绑定</a-button>
      </div>
      <div class="tip">
        <span>温馨提示</span>：根据相关法律规定，用户需绑定真实手机号进行实名认证，壹周记将对用户隐私信息给予严格保密
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'BindMobile',
  data () {
    return {
      visible: false,
      phone: '',
      code: ''
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
.bindMobile{
    padding-bottom:20px ;
}
.logo {
  margin-bottom: 40px;
  img {
    width: 130px;
    height: auto;
    display: block;
    margin: 0 auto;
  }
}
.input {
  display: flex;
  .inputItem {
    height: 40px;
    margin-bottom: 24px;
    /deep/ input {
      border-radius: 5px;
    }

  }
  /deep/ button {
      height: 40px;
      margin-left: 24px;
      border-radius: 5px;
    }
}
.submit{
    margin-bottom: 20px;
   /deep/ button {
      height: 40px;
      border-radius: 5px;
    }
}
.tip{
    color: #666666;
    font-size: 16px;
    span{
        color: #FFB200;
    }
}
</style>
