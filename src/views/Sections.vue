<template>
  <div>
    <el-button type="primary" @click="joinContent(0)">
      添加小节
    </el-button>
    <el-table :data="sectionList" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 节名 -->
      <el-table-column prop="title" label="节名"> </el-table-column>
      <!-- 章的权重 -->
      <el-table-column prop="orderby" label="权重" width="80">
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            circle
            @click="joinContent(scope.row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteSection(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      chapter_id:0,
      sectionList:[],

    }
  },
  created(){
    this.chapter_id = this.$route.params.id
    this.getSectionList()
  },
  methods:{
    async getSectionList () {
      const { data: res } = await this.$api.selectSection(this.chapter_id)
      this.sectionList = res.message
    },
    async deleteSection (id) {
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
      const { data: res } = await this.$api.deleteSection(id);
      console.log(res);
      if (res.code != 20000) {
        return this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getSectionList();
    },
    // 跳转到操作节的内容页面
    joinContent (id) {
      this.$router.push({name:'sectionContent',params:{id:id,chapter_id:this.chapter_id}})
    }
  }
}
</script>

<style>

</style>