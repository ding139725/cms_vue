<template>
    <div>
        <el-upload
          action="http://127.0.0.1:7001/api/upload"
          :headers="header"
          :multiple="false"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-progress="handleProgress"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form ref="form" :model="addBlogForm" label-width="80px">
            <el-form-item label="博客标题">
            <el-input v-model="addBlogForm.title"></el-input>
            <mavon-editor 
            v-model="addBlogForm.md_text"
            @change="changeDate"
            />
            <el-button
            type="success"
            @click="addBlog"
            >
                保存
            </el-button>
         </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      addBlogForm: {
        title: "",
        img: "",
        md_text: "",
        html_text: "",
      },
     header: {
        token: sessionStorage.getItem("token"),
     },
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    // 上传图片成功触发事件
    handleSuccess(response, file, fileList) {
      this.addBlogForm.img = response.data.file;
      if (response.code != 20000) {
        return this.$message.error("上传图片失败");
      }
    },
    handleProgress(file) {
      console.log(file);
    },
    handleExceed() {
      return this.$message.error("只能上传一个图片");
    },
    changeDate(md_text,html_text){
        this.addBlogForm.md_text = md_text;
        this.addBlogForm.html_text = html_text;
    },
    // 保存按钮
    async addBlog(){
        const {data:res} = await this.$api.addBlogs(this.addBlogForm);
        if(res.code!==20000){
            return this.$message.error('添加博客失败')
        }
        this.$message.success('添加博客成功');
        this.$router.push('/home/blog')
        this.addBlogForm = {};
    }
  },
};
</script>
<style scoped>
</style>