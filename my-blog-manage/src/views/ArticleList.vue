<template>
  <el-table :data="articleListData" style="width: 100%">
    <el-table-column prop="article_first_time" label="时间" width="180"></el-table-column>
    <el-table-column prop="article_title" label="文章标题" width="180"></el-table-column>
    <el-table-column prop="address" label="文章类型"></el-table-column>
    <el-table-column prop="operate" label="操作">
        <template slot-scope="scope">
        <el-button
          @click.native.prevent="editorRow(scope.$index, articleListData)"
          type="primary"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, articleListData)"
          type="danger"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

  <script>
import {reqArticleList} from '@/config/api.js'
export default {
  data() {
    return {
      articleListData: []
    };
  },
  mounted(){
      this.getArticleList()
  },
  methods:{
      // 获取文章列表信息
      async getArticleList(){
          const result = await reqArticleList();
          if(result.success){
            const {articleList,total} = result
            this.articleListData = articleList
          }else{
              console.log('文章列表获取失败')
          }
      },
      // 编辑文章
      editorRow(idx,arr){
        const id = arr[idx]._id;
        this.$router.push({path:'/',query:{id}})
      }
  }
};
</script>
<style>

</style>