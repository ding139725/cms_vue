<template>
  <div>
    <!-- 添加博客按钮 -->
    <el-button type="primary" @click="joinAddBlog">添加博客</el-button>

    <!-- 博客数据 -->
    <el-table :data="blogList" stripe style="width: 100%">
      <el-table-column type="index" label="#"> </el-table-column>
      <el-table-column prop="img" label="封面" width="180"> 
          <template slot-scope="scope">
              <img :src="scope.row.img" alt="博客封面" class="blog_img">
          </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            circle
            @click="putBlog(scope.row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteBlog(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    // 获取博客列表
    async getBlogList() {
        const {data:res} = await this.$api.getBlogs();
        console.log(res);
        if(res.code!==20000){
            return this.$message.error('获取博客列表书籍失败');
        }
        this.blogList = res.message;
    },
    // 修改博客按钮
    putBlog(id){
        // console.log(id);
        this.$router.push(`/putblog/${id}`)
    },
    // 删除博客按钮
    async deleteBlog(id){
        // 弹框询问用户是否删除
      const confirmRes = await this.$messagebox
        .confirm("此操作会永久删除文件，是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .catch((err) => err);
      if (confirmRes !== "confirm") {
        return this.$message.info("已经取消删除");
      }
      // 确认删除后调用删除接口
      const { data: res } = await this.$api.deleteBlogs(id);
      console.log(res);
      if (res.code != 20000) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getBlogList();
    },
    // 跳转到添加博客的页面
    joinAddBlog(){
      this.$router.push('/home/addblog');
    }
  },
};
</script>
<style scoped>
.blog_img {
  width: 60px;
  height: 60px;
}
</style>
