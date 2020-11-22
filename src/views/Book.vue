<template>
  <div>
    <!-- 添加书籍按钮 -->
    <el-button type="primary" @click="addBookDialogVisible = true"
      >添加书籍</el-button
    >
    <!-- 添加书籍的对话框 -->
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
          :limit="1"
          :on-exceed="handleExceed"
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

    <!-- 渲染数据列表的table -->
    <el-table :data="bookList" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="img" label="封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="书籍封面" class="book_img" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名"> </el-table-column>
      <el-table-column prop="orderby" label="权重" width="80">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <el-button type="warning" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
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
      // 书籍列表
      bookList: [],
    };
  },
  created() {
    this.getBookList();
  },
  methods: {
    //  获取书籍列表
    async getBookList() {
      const { data: res } = await this.$api.getBook();
      this.bookList = res.message;
    },
    //   添加书籍的确定按钮
    async addBook() {
      let { data: res } = await this.$api.createBook(this.addBookForm);
      console.log(res);
      if (res.code !== 20000) {
        this.addBookDialogVisible = false;
        return this.$message.error("添加书籍失败");
      }
      this.$message.success("添加书籍成功");
      this.addBookDialogVisible = false;
    },
    // 删除图片触发事件
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    // 上传图片成功触发事件
    handleSuccess(response, file, fileList) {
      console.log(fileList);
      console.log(response.code);
      console.log(response);
      this.addBookForm.img = response.data.file;
      if (response.code != 20000) {
        return this.$message.error("上传图片失败");
      }
    },
    handleProgress(file) {
      console.log(file);
    },
    // 文件超出限制的触发事件
    handleExceed() {
      return this.$message.error("只能上传一个图片");
    },
  },
};
</script>
<style scoped>
.book_img {
  width: 60px;
  height: 60px;
}
</style>