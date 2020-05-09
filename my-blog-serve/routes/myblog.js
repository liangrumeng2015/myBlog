// 博客项目的相关接口
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId ;
const blogArticleModel = require('../model/blogArticle')


router.get('/', function (req, res, next) {
    res.send({
        msg: 'blog接口可以正常访问'
    })
});

// 获取文章列表  (带有分页，10条分页)
router.post('/articleList.do', async (req, res, next) => {
    let currentPage = req.body.page; // 显示第几页的数据
    let articleList, allList;
    allList = await blogArticleModel.find({});
    if (!currentPage) { // 查询所有
        articleList = allList;
    } else { // 分页查询,默认10条分页
        articleList = await blogArticleModel.find({}).skip((currentPage - 1) * 10).limit(10);
    }
    res.send({
        success: true,
        articleList,
        total: allList.length
    });
})

// 发布/草稿文章
router.post('/releaseArticle.do', async (req, res, next) => {
    // articleType  1发布  2草稿
    const {
        articleTitle,
        articleContent,
        articleFirstTime,
        articleEndTime,
        articleType
    } = req.body;
    let msg;
    if (!articleTitle) {
        res.send({
            msg: '文章标题不能为空',
            success: false
        })
        return;
    }
    if (!articleContent) {
        res.send({
            msg: '文章内容不能为空',
            success: false
        })
        return;
    }
    if (!articleFirstTime) {
        res.send({
            msg: '发布时间不能为空',
            success: false
        })
        return;
    }

    await blogArticleModel.create({ // mongoose中使用create代替insert
        article_title: articleTitle,
        article_content: articleContent,
        article_first_time: articleFirstTime,
        article_end_time:articleEndTime,
        article_type: articleType,
    }, (err) => {
        console.log(err)
        if (!err) {
            if (articleType == 1) {
                msg = '文章发布成功'
            } else if (articleType == 2) {
                msg = '文章保存成功'
            }
            res.send({
                msg,
                success: true
            })
        } else {
            res.send({
                msg: err.errmsg,
                success: true
            })
        }
    })

})

// 编辑发布/草稿文章
router.post('/editorArticle.do',async(req,res,next)=>{
    const _id = req.body.id;
    const {
        articleTitle,
        articleContent,
        articleFirstTime,
        articleEndTime,
        articleType  
    } = req.body
    const whereStr = {_id:ObjectId(_id)};   // 查询条件
    const updateStr = {$set:{     // 更新条件
        article_title: articleTitle,
        article_content: articleContent,
        article_first_time: articleFirstTime,
        article_end_time:articleEndTime,
        article_type: articleType,  // 1 发布   2草稿
    }}
    await blogArticleModel.updateMany(whereStr,updateStr,(err,data)=>{
        if(!err){
            console.log(data);
            const {nModified} = data;
            if(nModified == 1){
                res.send({
                    msg:'修改成功',
                    success:true
                })
            }else if(nModified == 0){
                res.send({
                    msg:'未修改',
                    success:true
                })
            }
        }
    })
})

// 根据id查询文章
router.get('/getArticleById.do',async(req,res,next)=>{
    const _id = req.query.id;
    await blogArticleModel.find({_id:ObjectId(_id)},(err,data)=>{
        if(!err){
            res.send({
                module:data,
                msg:'查询成功',
                success:true
            })
        }else{
            res.send({
                msg:'查询失败',
                success:false
            })
        }
    })
    
})





module.exports = router;