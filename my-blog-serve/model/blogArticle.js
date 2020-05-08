/**
 * blogArticle文章列表
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 // 创建Schema对象
var blogArticleSchema = new Schema({
    article_title:{  // 文章标题
        type:String,
        unique:true
    },
    article_content:{    // 文章内容
        type:String,
    },
    article_first_time:{  // 文章首次发布时间
        type:String,
    },
    article_end_time:{  // 文章最后一次修改时间
        type:String,
    }
})
var blogArticleModel = mongoose.model('blogArticle',blogArticleSchema);
module.exports = blogArticleModel;