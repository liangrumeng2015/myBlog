<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-input v-model="form.name" placeholder="请输入文章标题"></el-input>
        
        <v-VueEditor @editorContent="editorContent" />
        <br/>
        <el-button type="primary" @click="releaseArticle">发布文章</el-button>
    </el-form>
  </div>
</template>

<script>
import VueEditor from '@/components/VueEditor'
export default {
  data() {
    return {
      msg: "124",
      form:{
          name:'',
          content:''
      }
    };
  },
  components:{
      'v-VueEditor':VueEditor
  },
  mounted(){

  },
  methods:{
      // 富文本编辑器的值
      editorContent(data){
          this.form.content = data;
      },
      // 发布文章
      releaseArticle(){
          console.log('发布文章信息',this.form)
      }
  }
};
</script>

<style>
.el-input__inner{
    background: #efefef!important;
}
</style>