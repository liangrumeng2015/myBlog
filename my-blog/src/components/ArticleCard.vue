<template>
<!--
    组件使用：
  -->
  <div>
    <el-card class="box-card item" v-for="(item,idx) in articleList" :key="idx">
      <div slot="header" class="clearfix" >
        <span class="title" v-if="item.article_title">{{item.article_title}}</span>
        <span style="float:right" class="time" v-if="item.article_first_time">{{changeTime(item.article_first_time)}}</span>
      </div>
      <div class="text" v-if="item.article_content" @click="toArticleDetail(item)" v-html="item.article_content"></div>
    </el-card>
  </div>
</template>
<script>
import {changeTimeStamp} from '@/tools/tools'
export default {
  data() {
    return {
      msg: "123"
    };
  },
  props:{
      articleList:Array
  },
    methods:{
    toArticleDetail(item){
      const id = item._id
      this.$router.push({path:'/articledetail',query:{id}})
    },
    changeTime(val){
       return changeTimeStamp(val)
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 100%;
}
.text {
  font-size: 14px;
  color: #999aaa;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item {
  margin-bottom: 18px;
}
.time{
    color: #5f6471;
    font-size: 13px;
}
.title {
  font-weight: bold;
  font-size: 20px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>