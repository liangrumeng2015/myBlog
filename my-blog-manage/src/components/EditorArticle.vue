<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>

      <v-VueEditor @editorContent="editorContent"  :htmlcontent="form.content" />
      <!-- <v-VueEditor @editorContent="editorContent" v-if="!currentArticleId" /> -->
      
      <br />
      <el-button type="primary" @click="releaseArticleFn(1)" :loading=releaseLoading>发布文章</el-button>
      <el-button type="primary" @click="releaseArticleFn(2)">保存草稿</el-button>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "@/components/VueEditor";
import { releaseArticle,editorArticle,getArticleById } from "@/config/api";
export default {
  data() {
    return {
      msg: "124",
      form: {
        title: "",
        content: ""
      },
      releaseLoading:false,
      currentArticleId:''
    };
  },
  components: {
    "v-VueEditor": VueEditor
  },
   beforeCreate(){
    console.log('parent  beforeCreate')
  },
  created(){
    console.log('parent created')
  },
  beforeUpdate(){
    console.log('parent beforeUpdate')
  },
  updated() {
    console.log('parent updated')
  },
  mounted() {
    if(this.$route.query.id){  // 编辑
      this.currentArticleId = this.$route.query.id
      this.getArticleByIdFn(this.$route.query.id)
    }
    console.log(this.currentArticleId)
  },
  methods: {
    // 富文本编辑器的值
    editorContent(data) {
      this.form.content = data;
    },
    // 发布/草稿 文章
    async releaseArticleFn(type) {
      this.releaseLoading = true
      const { title, content } = this.form;
      let data = {
        articleTitle: title,
        articleContent: content,
        articleFirstTime: new Date().getTime(),
        articleEndTime: new Date().getTime(),
        articleType: type  // 1发布  2 草稿
      };
      let result;
      if(this.currentArticleId){   // 编辑+发布   编辑+草稿
        data.id = this.currentArticleId
         result = await editorArticle(data);
      }else{
        result = await releaseArticle(data);
      }
      if(result.success){
        this.releaseLoading = false
        this.$message({
          message: result.msg,
          type: 'success'
        });
        setTimeout(()=>{
          this.$router.push('/articlelist')
        },1000)
      }else{
        this.releaseLoading = false
        this.$message({
          message: result.msg,
          type: 'error'
        });
      }
    },
    // 根据id获取当前文章
    async getArticleByIdFn(id){
      console.log('id',id)
      const result = await getArticleById({id});
      if(result.success){
        console.log(result.module[0].article_title)
        let {article_content,article_first_time,article_end_time,article_title,article_type} = result.module[0];
        this.form.title = article_title
        this.form.content = article_content
        console.log('赋值',this.form.content)
      }
    }
  }
};
</script>

<style>
.el-input__inner {
  background: #efefef !important;
}
</style>