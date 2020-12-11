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
        <el-form ref="form" :model="putBlogForm" label-width="80px">
            <el-form-item label="博客标题">
            <el-input v-model="putBlogForm.title"></el-input>
            <mavon-editor 
            v-model="putBlogForm.md_text"
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
     id:'',
      putBlogForm: {
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
  created(){
      this.id = this.$route.params.id;
      this.getBlogById(this.id);
      console.log(this.$route.params.id);
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    // 上传图片成功触发事件
    handleSuccess(response, file, fileList) {
      this.putBlogForm.img = response.data.file;
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
        this.putBlogForm.md_text = md_text;
        this.putBlogForm.html_text = html_text;
    },
    // 保存按钮
    async addBlog(){
        const {data:res} = await this.$api.putBlogs(this.id,this.putBlogForm);
        console.log(res);
        if(res.code!==20000){
            return this.$message.error('修改博客失败')
        }
        
        this.$message.success('添加博客成功');
        this.$router.push('/blog')
    },
    // 根据id查询博客信息
    async getBlogById(id){
      const {data:res} = await this.$api.getBlogById(id);
      this.putBlogForm = res.message;
      console.log(res);
    }
  },
};
</script>
<style scoped>
</style>