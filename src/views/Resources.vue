<template>
    <div>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="showDialog(0)">添加资源</el-button>
        <!-- 对话框 -->

        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        @close='dialogClosed'
        >
        <el-form ref="form" :model="resourseForm" label-width="80px">
            <el-form-item label="资源名称" prop="title">
                <el-input v-model="resourseForm.title"></el-input>
            </el-form-item>
            <el-form-item label="资源密码" prop="code">
                <el-input v-model="resourseForm.code"></el-input>
            </el-form-item>
            <el-form-item label="资源链接" prop="url">
                <el-input v-model="resourseForm.url"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveContent">确 定</el-button>
        </span>
        </el-dialog>

        <!-- 渲染数据的表单 -->
        <el-table
        :data="resourseList"
        style="width: 100%">
        <el-table-column
            prop="title"
            label="资源名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="url"
            label="链接"
            width="180">
        </el-table-column>
        <el-table-column
            prop="code"
            label="提取密码"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            width="180">
            <template slot-scope="scope">
                <!-- 修改按钮 -->
                <el-button
                    type="warning"
                    icon="el-icon-edit"
                    circle
                    @click="showDialog(scope.row.id)"
                ></el-button>
                <!-- 删除按钮 -->
                <el-button
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="deleteResourse(scope.row.id)"
                ></el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data () {
        return {
            resourseList: [],
            dialogVisible: false,
            isUpdate:0,
            resourseForm: {
                title: '',
                code: '',
                url: ''
            },
      isAdmin: false

        }
    },
    created () {
        this.getResourse()
    },
      computed: {
    ...mapState(['userInfo'])
  },
    methods: {
        // 获取资源列表方法
        async getResourse() {
            const { data: res } = await this.$api.getResourse()
            this.resourseList = res.message;
        },
        // 删除资源方法
        async deleteResourse ( id ) {
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
            const { data: res } = await this.$api.deleteResourse(id);
            console.log(res);
            if (res.code != 20000) {
                return this.$message.error("删除失败");
            }
            this.$message.success("删除成功");
            this.getResourse();
        },
        // 显示对话框
        async showDialog ( id ) {
            this.isUpdate = Number(id)
            if ( this.isUpdate ) {
                const { data: res } = await this.$api.selectResourseById(this.isUpdate)
                this.resourseForm = res.message
                this.dialogVisible = true
            } else {
                this.dialogVisible = true
            }
        },
        // 确定按钮
        async saveContent () {
            if ( this.isUpdate ) {
                const { data: res } = await this.$api.updateResourse(this.isUpdate,this.resourseForm)
                if ( res.code!==20000 ) {
                    return this.$message.error('修改失败')
                }
                this.dialogVisible = false
                this.$message.success('修改成功')
                this.getResourse()
            } else {
                const { data: res } = await this.$api.createResourse(this.resourseForm)
                if ( res.code!==20000 ) {
                    return this.$message.error('添加失败')
                }
                this.dialogVisible = false
                this.$message.success('添加成功')
                this.getResourse()
            }
        },
        // 对话框关闭事件
        dialogClosed () {
            this.$refs.form.resetFields()
        }
    }
}
</script>