<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="showDialog(0)">
      添加视频
    </el-button>
    <!-- 渲染列表表单 -->
    <el-table
    :data="videoList"
    style="width: 100%"
    class="videoListBox"
    >
      <el-table-column
        prop="title"
        label="视频名称"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="iframe_url"
        label="视频链接"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button 
          type="danger" 
          icon="el-icon-delete" 
          circle
          @click="deleteVideoList(scope.row.id)"
          >
          </el-button>
          <el-button
          type="warning"
          icon="el-icon-edit"
          circle
          @click="showDialog(scope.row.id)"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单对话框 -->
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    @close='dialogClosed'
    >
    <el-form ref="formRef" :model="videoForm" label-width="80px">
      <el-form-item label="视频名称" prop="title">
        <el-input v-model="videoForm.title"></el-input>
      </el-form-item>
      <el-form-item label="视频链接" prop="iframe_url">
        <el-input v-model="videoForm.iframe_url"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="saveContent">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      video_id:0,
      videoList:[],
      videoForm:{
        title:'',
        iframe_url:'',
        video_id:0
      },
      dialogVisible: false,
      isUpdate:0
    }
  },
  methods: {
    // 根据视频类的id获取对应的列表
    async getVideoList ( video_id ) {
      const { data: res } = await this.$api.getVideoList(video_id)
      this.videoList = res.message
    },
    // 根据id删除
    async deleteVideoList ( id ) {
      const confirmRes = await this.$messagebox.confirm('确定删除视频类吗？',"提示",{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        }).catch((err)=>err)
      if( confirmRes !== 'confirm' ) {
          return this.$message.info('取消删除')
      }
      const { data: res } = await this.$api.deleteVideoList(id)
      if ( res.code !== 20000 ) {
        return this.$message.error('删除失败')
      }
      this.$message.success('删除成功')
      this.getVideoList( this.video_id )
    },
    // 显示对话框 
    async showDialog( id ) {
      this.isUpdate = Number(id)
      if ( this.isUpdate ) {
        const { data: res } = await this.$api.selectVideoListById(this.isUpdate)
        if ( res.code !== 20000) {
          return this.$message.error('获取视频信息失败')
        }
        this.videoForm = res.message
        this.dialogVisible = true
      } else {
        this.dialogVisible = true
      }
    },
    async saveContent () {
      if ( this.isUpdate ) {
        const { data: res } = await this.$api.updateVideoList(this.isUpdate,this.videoForm)
        if( res.code !== 20000 ) {
          return this.$message.error('修改失败')
        }
        this.getVideoList(this.video_id)
        this.$message.success('修改成功')
        this.dialogVisible = false
      } else {
        const { data: res } = await this.$api.createVideoList(this.videoForm)
        if( res.code !== 20000 ) {
          return this.$message.error('添加失败')
        }
        this.getVideoList(this.video_id)
        this.$message.success('添加成功')
        this.dialogVisible = false
      }
    },
    // 对话框关闭触发事件
    dialogClosed () {
      this.$refs.formRef.resetFields()
    }
  },
  created () {
    this.video_id = this.$route.params.id
    this.videoForm.video_id = this.$route.params.id
    this.getVideoList( this.video_id )
  }
}
</script>

<style lang="less">
.videoListBox {
  th {
    height: 100px;
  }
  td {
    height: 100px;
  }
}
</style>