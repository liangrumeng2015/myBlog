// 博客项目的相关接口
var express = require('express');
var router = express.Router();
const blogArticleModel = require('../model/blogArticle')


router.get('/', function(req, res, next) {
    res.send({
        msg: 'blog接口可以正常访问'
    })
});

// 获取博客列表  (带有分页，10条分页)
router.get('/articleList.do',async(req,res,next)=>{
    const articleList = await blogArticleModel.find({});
   res.send({
        success:true,
        articleList,
        total:articleList.length
   });
})





module.exports = router;
