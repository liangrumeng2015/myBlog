<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <span>是西柚呀！的博客</span>
      </el-header>
      <el-container class="container">
        <el-aside width="300px" class="aside">
          <v-ArticleCard :cardData = leftData />
          <div v-if="total">文章总数{{total}}</div>
        </el-aside>
        <el-main class="main">
          <!-- 文章 -->
          <v-ArticleCard :articleList = articleList />
          <!-- 分页 -->
          <v-Pagination :total = total @currentPage="currentPageFn" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import {reqArticleList} from '@/config/api.js'
// @ is an alias to /src
export default {
  data(){
    return{
      activeKey:0,
      msg:'123',
      total:0,   // 动态文章总个数
      articleList:[],  // 文章列表
      currentPage:1,   // 初始化显示第一页
      leftData:[
        {
          title:'归档',
          time:'',
          content:''
        }
      ]
    }
  },
  components:{
    'v-ArticleCard':ArticleCard,
    'v-Pagination':Pagination
  },
  mounted(){
    this.getArticleList(this.currentPage);
  },
  methods:{
    // 获取文章列表
    async getArticleList(page){
      const result = await reqArticleList({page})
      if(result.success){
        const {articleList,total} = result
        this.articleList =  articleList
        this.total = total
      }
    },
    // 分页触发事件
    currentPageFn(val){
      this.currentPage = val;
      this.getArticleList(val);
    }
  }
};
</script>
<style>
.header{
  width: 100%;
  background: #ffffff;
  line-height: 60px;
  box-shadow: 5px 5px 5px #cccccc;
  position: fixed;
  padding:0 30px!important;
  box-sizing: border-box;
}
.container{
  margin-top: 70px;
}
.aside{
  padding: 30px;
  box-sizing: border-box;
}
.main{
  height: 100%;
}
</style>

