<template>
    <div>
        <div v-if="articleInfo.article_title">文章标题:{{articleInfo.article_title}}</div>
        <div v-if="articleInfo.article_first_time">发布时间：changeTimeStamp({{articleInfo.article_first_time}})</div>
        <div v-if="articleInfo.article_content" v-html="articleInfo.article_content"></div>
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
        }
    }
}
</script>
<style>
    
</style>