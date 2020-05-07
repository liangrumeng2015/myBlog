<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <span>是西柚呀！的博客</span>
      </el-header>
      <el-container class="container">
        <!-- <el-aside width="300px" class="aside">
          <v-ArticleCard :cardData = leftData />
        </el-aside> -->
        <el-main class="main">
          <!-- 文章 -->
          <v-ArticleCard :cardData = cardData />
          <!-- 分页 -->
          <v-Pagination :total = total />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
// @ is an alias to /src
export default {
  data(){
    return{
      msg:'123',
      total:100,   // 动态文章总个数
      cardData:[   // 文章列表
        {
        title:'文章1标题',
        time:'2020年05月07日14:32:19',
        content:'文章内容内容内容1'
      },{
        title:'文章2标题',
        time:'2020年05月07日14:32:19',
        content:'文章内容内容内容2'
      }
      ],
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

