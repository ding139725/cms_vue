<template>
    <div>
        <!-- 添加视频类的按钮 -->
        <el-button type="primary" @click="showDialog(0)">添加视频类</el-button>
        <!-- 显示视频类列表的表单 -->
        <el-table
        :data="videoList"
        style="width: 100%">
        <el-table-column
            label="封面"
            width="180">
            <template slot-scope="scope">
                <img :src="scope.row.img" alt="类别封面" class="video-img">
            </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="类别名称"
            width="180">
        </el-table-column>
        <el-table-column
            label="详情"
            width="180">
            <template slot-scope="scope">
                <span @click="goVideoList(scope.row.id)">
                    详情
                </span>
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle
                @click="deleteVideo(scope.row.id)"
                >
                </el-button>
                <el-button
                type="warning"
                icon="el-icon-edit"
                circle
                @click="showDialog(scope.row.id)"
            ></el-button>
            </template>
        </el-table-column>
        </el-table>
        <!-- 视频类的对话框 -->
        <el-dialog
        title="提示"
        :visible.sync="videoDialogVisible"
        width="30%">
            <el-upload
          action="http://127.0.0.1:7001/api/upload"
          :headers="header"
          :multiple="false"
          :on-success="handleAddSuccess"
          :on-remove="handleRemove"
          :on-progress="handleProgress"
          list-type="picture-card"
          :limit="1"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-form ref="form" :model="videoForm" label-width="80px">
            <el-form-item label="视频类名称">
                <el-input v-model="videoForm.title"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="videoDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveVideo">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template> 
<style scoped>
.video-img{
    width: 80px;
}
</style>
<script>
export default {
    data () {
        return {
            // 视频类列表
            videoList:[],
            // 控制视频类对话框的显示与隐藏
            videoDialogVisible: false,
            // 判断对话框是添加还是修改 添加为0 修改为其他数字
            isUpdate:0,
            videoForm: {
                title:'',
                img:''
            },
            //上传图片携带的请求头
            header: {
                token: sessionStorage.getItem("token"),
            },

        }
    },
    created () {
        this.getVideoList()
    },
    methods: {
        // 获取所有视频类的列表
        async getVideoList () {
            const { data: res } = await this.$api.getVideo()
            this.videoList = res.message
        },
        // 删除视频类的方法
        async deleteVideo (id) {
           const confirmRes = await this.$messagebox.confirm('确定删除视频类吗？',"提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
           }).catch((err)=>err)
           if( confirmRes !== 'confirm' ) {
               return this.$message.info('取消删除')
           }
           const { data: res } = await this.$api.deleteVideo(id)
           if( res.code!==20000 ) {
               return this.$message.error('删除失败')
           }
           this.getVideoList()
           this.$message.success('成功删除')
        },
        // 显示视频类对话框的方法
        async showDialog (id) {
            this.isUpdate = Number(id);
            if(this.isUpdate){
                const { data: res } = await this.$api.selectVideoById(this.isUpdate)
                this.videoForm = res.message
                this.videoDialogVisible = true
            }else{
                this.videoDialogVisible = true
            }
        },
        // 对话框的确定按钮保存视频类数据
        async saveVideo () {
            if (this.isUpdate){
                const { data: res } = await this.$api.updateVideo(this.isUpdate,this.videoForm)
                if (res.code!==20000) {
                    return this.$message.error('添加失败')
                }
                this.getVideoList()
                this.$message.success('添加成功')
                this.videoDialogVisible = false
            }else{
                const { data: res } = await this.$api.createVideo(this.videoForm)
                if (res.code!==20000) {
                    return this.$message.error('添加失败')
                }
                this.getVideoList()
                this.$message.success('添加成功')
                this.videoDialogVisible = false
            }
        },
        // 删除图片触发事件
        handleRemove(file, fileList) {
        console.log(file);
        console.log(fileList);
        },
        // 上传图片成功触发事件
        handleAddSuccess(response, file, fileList) {
        console.log(fileList);
        console.log(response.code);
        console.log(response);
        this.videoForm.img = response.data.file;
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
        // 跳转到视频列表页
        goVideoList (id) {
            this.$router.push({name:'videoList',params:{id}})
        }

    }
}
</script>