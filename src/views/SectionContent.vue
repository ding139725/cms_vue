<template>
  <div>
    <el-form ref="sectionFormRef" :model="sectionForm" label-width="80px">
      <el-form-item label="节的名称">
        <el-input v-model="sectionForm.title"></el-input>
      </el-form-item>
      <el-form-item label="节的权重">
        <el-input v-model="sectionForm.orderby" type="number"></el-input>
      </el-form-item>
      <mavon-editor 
        v-model="sectionForm.md_text"
        @change="changeDate"
      />
      <el-button type="success" @click="saveContent">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data(){
    return{
      id:0,
      chapter_id:0,
      sectionForm:{
        title:'',
        orderby:0,
        md_text:'',
        html_text:'',
        chapter_id:0,
      }
    }
  },
  created(){
    // 接受传入过来的节id来判断是添加还是修改 0位添加 其他数字为修改
    this.id = Number( this.$route.params.id )
    this.sectionForm.chapter_id = this.$route.params.chapter_id
  },
  async mounted(){
    if(this.id){
      console.log('修改修改修改')
      const { data: res } = await this.$api.selectSectionById(this.id);
      console.log(res);
      if(res.code==20000){
        this.sectionForm = res.message  
      }else{
        console.log('错了')
      }
    }else{
      console.log('添加添加添加')
    }
  },
  methods:{
    changeDate (md_text,html_text) {
      this.sectionForm.md_text = md_text,
      this.sectionForm.html_text = html_text
    },
    // 保存内容 
    async saveContent() {
      if(!this.id){
        // 判断为添加小节的操作
        const { data: res } = await this.$api.createSection(this.sectionForm)
        if(res.code!==20000){
          return this.$message.error('添加失败')
        }
        this.$message.success('添加成功')
        console.log('触发跳转函数')
        this.$router.push('/home/book')
        // this.$router.go(-1)
      }else{
        // 判断为修改时的操作
        const { data: res } = await this.$api.updateSection(this.id,this.sectionForm)
        if(res.code!==20000){
          return this.$message.error('修改失败')
        }
        this.$message.success('修改成功')
        this.$router.go(-1)
      }
    },
  }
}
</script>