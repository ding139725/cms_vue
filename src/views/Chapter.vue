<template>
  <div>
    <el-button type="primary" :disabled='isAdmin' @click="addChapterDialogVisible = true">添加章节</el-button>
        <!-- 渲染数据列表的table -->
    <el-table :data="chapterList" stripe style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <!-- 章名 -->
      <el-table-column prop="title" label="章名"> </el-table-column>
      <!-- 章的权重 -->
      <el-table-column prop="orderby" label="权重" width="80">
      </el-table-column>
      <el-table-column label="详情" width="80">
        <template slot-scope="scope">
          <span @click="joinSections(scope.row.id)">
            详情
          </span>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="warning"
            icon="el-icon-edit"
            circle
            @click="showUpdateDialog(scope.row.id)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteChapter(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加章节的对话框 -->
    <el-dialog
    title="添加章节"
    :visible.sync="addChapterDialogVisible"
    width="30%">
      <el-form ref="chapterFormRef" :model="chapterObj" label-width="80px">
        <el-form-item label="章节名">
          <el-input v-model="chapterObj.title"></el-input>
        </el-form-item>
        <el-form-item label="章节权重">
          <el-input v-model="chapterObj.orderby" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addChapterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createChapter">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改章节的对话框 -->
    <el-dialog
    title="添加章节"
    :visible.sync="updateChapterDialogVisible"
    width="30%">
      <el-form ref="chapterFormRef" :model="chapterObj" label-width="80px">
        <el-form-item label="章节名">
          <el-input v-model="chapterObj.title"></el-input>
        </el-form-item>
        <el-form-item label="章节权重">
          <el-input v-model="chapterObj.orderby" type="number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateChapterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateChapter">确 定</el-button>
      </span>
    </el-dialog>
  </div>  
</template>
<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      id:0,
      book_id:0,
      chapterList:[],
      // 控制添加章节的显示与隐藏
      addChapterDialogVisible:false,
      updateChapterDialogVisible:false,
      chapterObj:{
        title:'',
        orderby:0,
        book_id:0,
      }
    }
  },
  created(){
    // 获取book_id
    this.book_id = this.$route.params.id
    this.chapterObj.book_id = this.book_id
    console.log(this.book_id)
    this.getChapterList()

  },
    computed: {
    ...mapState(['userInfo'])
  },
  methods:{
    // 获取章节列表方法
    async getChapterList() {
      const {data:res} = await this.$api.getChapterByBookId(this.book_id);
      this.chapterList = res.message
    },
    // 添加章节方法
    async createChapter() {
      console.log(this.chapterObj)
      const { data: res } = await this.$api.createChapter(this.chapterObj);
      if( res.code !==20000 ){
        return this.$message.error('添加失败')
      }
      this.getChapterList()
      this.addChapterDialogVisible = false;
      this.$message.success('成功添加章节')
    },
    // 根据id删除章节
    async deleteChapter (id) {
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
      const { data: res } = await this.$api.deleteChapter(id)
      if ( res.code !== 20000 ) {
        return this.$message.error('删除失败')
      }
      this.$message.success('成功删除')
      this.getChapterList()
    },
    // 显示修改章节对话框
    async showUpdateDialog(id){
      const { data: res } = await this.$api.selectChapterById(id);
      this.id = id
      this.chapterObj = res.message
      this.updateChapterDialogVisible = true
    },
    // 点击确定修改章节
    async updateChapter () {
      const { data: res } = await this.$api.updateChapter(this.id,this.chapterObj);
      if ( res.code!==20000 ){
        return this.$message.error('修改失败')
      }
      this.getChapterList()
      this.$message.success('修改成功')
      this.updateChapterDialogVisible = false
    },
    // 跳转到小节页面
    joinSections (chapter_id) {
      this.$router.push({name:'sections',params:{id:chapter_id}})
    }
  }
}
</script>
<style scoped>

</style>