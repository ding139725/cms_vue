<template>
  <!-- 登录表单开始 -->
  <el-form
    :model="loginForm"
    ref="loginFormRef"
    :rules="loginRules"
    label-width="200px"
    class="loginForm"
  >
    <h2>cms后台管理系统</h2>
    <!-- 用户名 -->
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        placeholder="请输入用户名"
        prefix-icon="el-icon-user-solid"
      ></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        placeholder="请输入密码"
        type="password"
        prefix-icon="el-icon-s-goods"
      ></el-input>
    </el-form-item>
    <!-- 登录按钮 -->
    <el-button type="primary" @click="login">登录</el-button>
  </el-form>
  <!-- 登录表单结束 -->
</template>
<script>
import request from "../axios/request";
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      // 登录验证的表单
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 登录表单的验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    //登录事件
    login() {
      this.$refs.loginFormRef.validate( async (valid) => {
        console.log(valid);
        if (!valid) {
          return;
        }
        let { data: res } = await this.$api.login(this.loginForm)
            if( res.code == 20000){
            sessionStorage.setItem('token',res.token);
            this.$router.push('/home')
            this.setUserInfo(res.data)
            console.log(this.userInfo);
            return this.$message.success('登录成功')
            }
            this.$message.error('用户名或密码错误')
      });
    }
  },
};
</script>
<style>
.loginForm {
  width: 500px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.el-form-item__content {
  margin-left: 0px !important;
  box-sizing: border-box;
}
</style>