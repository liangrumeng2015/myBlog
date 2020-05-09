
import Axios from './axios'
const httpURL = '/wypapi'
export const reqLogin = (data) => Axios(httpURL + '/teachtool/login/loginstate',data,'post');

 /**
  * 获取文章列表
  */
export const reqArticleList = (data) =>Axios('http://localhost:5000/api/myblog/articleList.do',data,'post')

/**
 * 发布文章
 */
export const releaseArticle = (data) => Axios('http://localhost:5000/api/myblog/releaseArticle.do',data,'post')