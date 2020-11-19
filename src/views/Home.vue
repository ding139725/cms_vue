<template>
  <el-container>
    <el-header>
      <!-- 头部logo和标题 -->
      <div class="header-left">
        <img src="../assets/logo.png" alt="logo" class="logo" />
        <h2>CMS管理系统</h2>
      </div>
      <!-- 右侧注销按钮 -->
      <el-button type="info" class="logout" @click="logout">注销</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu
          default-active="statistics"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <!-- 侧边栏菜单的每一项 -->
          <el-menu-item index="statistics">
            <i class="iconfont iconTaskStatistics"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item index="book">
            <i class="iconfont iconbook"></i>
            <span slot="title">书籍管理</span>
          </el-menu-item>
          <el-menu-item index="blog">
            <i class="iconfont iconblog"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="video">
            <i class="iconfont iconvideo"></i>
            <span slot="title">视频管理</span>
          </el-menu-item>
          <el-menu-item index="resources">
            <i class="iconfont iconresources"></i>
            <span slot="title">资源管理</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="iconfont iconiconuser"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧主内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {},
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #545c64;
}
.header-left {
  display: flex;
  align-items: center;
  color: #fff;
}
.logo {
  width: 50px;
  height: 50px;
}
.logout {
  width: 100px;
  font-size: 18px;
}
</style>