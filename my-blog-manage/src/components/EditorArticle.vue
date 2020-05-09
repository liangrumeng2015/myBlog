<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>

      <v-VueEditor @editorContent="editorContent" />
      <br />
      <el-button type="primary" @click="releaseArticleFn(1)" :loading=releaseLoading>发布文章</el-button>
      <el-button type="primary" @click="releaseArticleFn(2)">保存草稿</el-button>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "@/components/VueEditor";
import { releaseArticle } from "@/config/api";
export default {
  data() {
    return {
      msg: "124",
      form: {
        title: "",
        content: ""
      },
      releaseLoading:false
    };
  },
  components: {
    "v-VueEditor": VueEditor
  },
  mounted() {},
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
      const result = await releaseArticle(data);
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
    }
  }
};
</script>

<style>
.el-input__inner {
  background: #efefef !important;
}
</style>