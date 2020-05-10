<template>
    <div>
        <el-card class="box-card item">
            <div slot="header" class="clearfix" >
                <span class="title" v-if="articleInfo.article_title">{{articleInfo.article_title}}</span>
                <span style="float:right" class="time" v-if="articleInfo.article_first_time">{{changeTime(articleInfo.article_first_time)}}</span>
            </div>
            <div class="text" v-if="articleInfo.article_content" @click="toArticleDetail(item)" v-html="articleInfo.article_content"></div>
        </el-card>
    </div>
</template>
<script>
import { reqArticleById } from '@/config/api'
import { changeTimeStamp } from '@/tools/tools'
export default {
    data(){
        return{
            msg:'123',
            currendArticleId:'',
            articleInfo:{}
        }
    },
    mounted(){
        this.currendArticleId = this.$route.query.id
        this.getArticleById(this.$route.query.id)
        console.log(changeTimeStamp(1589010823605))
    },
    methods:{
        async getArticleById(id){
            const result = await reqArticleById({id})
            if(result.success){
                this.articleInfo = result.module[0]
            }
        },
        changeTime(val){
            return changeTimeStamp(val)
        }
    }
}
</script>
<style>
.item{
    width:80%;
    margin:20px auto;
}
.title{
    font-weight: bold;
    font-size: 24px;
}
</style>