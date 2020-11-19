<template>
  <div>
    <!-- 添加书籍按钮 -->
    <el-button type="primary" @click="addBookDialogVisible = true"
      >添加书籍</el-button
    >

    <el-dialog
      title="添加书籍"
      :visible.sync="addBookDialogVisible"
      width="50%"
    >
      <div>
        <!-- <el-upload
            action="https://127.0.0.1:7001/api/upload",
            :headers="header",
            :multiple="false"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            >
            </el-upload> -->
        <!-- <el-upload
          action="http://127.0.0.1:7001/api/upload"
          :headers="header"
          :multiple="false"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
        ></el-upload> -->
        <el-upload
          action="http://127.0.0.1:7001/api/upload"
          :headers="header"
          :multiple="false"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :on-progress="handleProgress"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <!-- 添加书籍的表单 标题和权重 -->
      <el-form
        :model="addBookForm"
        :rules="addBookRules"
        ref="addBookFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="书籍名称" prop="title">
          <el-input
            v-model="addBookForm.title"
            placeholder="请输入书籍名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="书籍权重" prop="orderby">
          <el-input
            v-model="addBookForm.orderby"
            placeholder="请输入书籍权重"
            type="number"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addBookDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBook">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //   控制添加对话框的展示与隐藏
      addBookDialogVisible: false,
      // 添加书籍的表单
      addBookForm: {
        title: "",
        img: "",
        orderby: "",
      },
      //   添加书籍表单的验证规则
      addBookRules: {
        title: [{ required: true, message: "请输入书籍名称", trigger: "blur" }],
        orderby: [
          { required: true, message: "请输入书籍权重", trigger: "blur" },
        ],
      },
      //   上传图片携带的请求头
      header: {
        token: sessionStorage.getItem("token"),
      },
    };
  },
  methods: {
    //   添加书籍的确定按钮
    async addBook() {
      let { data: res } = await this.$api.createBook(this.addBookForm);
      console.log(res);
      if (res.code !== 20000) {
        this.addBookDialogVisible = false;
        return this.$message.error("添加书籍失败");
      }
      this.$message.success("添加书籍成功");
      this.addBookDialogVisible = true;
    },
    // 删除图片触发事件
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    // 上传图片成功触发事件
    handleSuccess(response, file, fileList) {
      console.log(file);
      console.log(fileList);
      console.log(response);
    },
    handleProgress(file){
        console.log(file);
    }
  },
};
</script>
<style scoped>
</style>