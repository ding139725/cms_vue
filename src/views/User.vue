<template>
  <div>
    <!-- 添加用户的按钮 -->
    <el-button @click="showDialog(0)" type="primary">添加用户</el-button>
    <!-- 渲染数据表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.isAdmin ? "管理员" : "观察者" }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="deleteUser(scope.row.id)"
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
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form
        ref="form"
        :model="userForm"
        :rules="formRules"
        label-width="80px"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
        <el-form-item label="分配角色">
          <el-select
            v-model="userForm.isAdmin"
            placeholder="请选择"
            @change="changeRole"
          >
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveContent()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      formRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
      },
      userList: [],
      dialogVisible: false,
      isUpdate: 0,
      userForm: {
        username: "",
        password: "",
        isAdmin: 0,
      },
      roleList: [
        {
          value: 0,
          label: "观察者",
        },
        {
          value: 1,
          label: "管理员",
        },
      ],
      value: "观察者"
    }
  },
  created() {
    this.getUserList()
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$api.getUserList()
      console.log(res)
      this.userList = res.message
    },
    // 删除用户的方法
    async deleteUser(id) {
      const confirmRes = await this.$messagebox
        .confirm("确定删除视频类吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .catch((err) => err)
      if (confirmRes !== "confirm") {
        return this.$message.info("取消删除")
      }
      const { data: res } = await this.$api.deleteUser(id)
      console.log(res)
      if (res.code !== 20000) {
        return this.$message.error("删除失败")
      }
      this.getUserList()
      return this.$message.success("成功删除")
    },
    // 显示对话款的方法
    async showDialog(id) {
      this.isUpdate = Number(id)
      if (!this.isUpdate) {
        return (this.dialogVisible = true)
      }
      this.dialogVisible = true
      const { data: res } = await this.$api.selectUserById(this.isUpdate)
      this.userForm = res.message
    },
    // 改变用户角色的时候触发的事件
    changeRole(value) {
      console.log(value)
      this.userForm.isAdmin = value
    },
    async saveContent() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return this.$message.error("请按规则输入数据")
        }
        if (!this.isUpdate) {
          const { data: res } = await this.$api.createUser(this.userForm)
          if (res.code !== 20000) {
            return this.$message.error("添加失败")
          }
          this.dialogVisible = false
          this.getUserList()
          return this.$message.success("添加成功")
        } else {
          const { data: res } = await this.$api.updateUser(
            this.isUpdate,
            this.userForm
          )
          if (res.code !== 20000) {
            return this.$message.error("修改失败")
          }
          this.getUserList()
          this.dialogVisible = false
          return this.$message.success("修改成功")
        }
      })
    }
  },
}
</script>
