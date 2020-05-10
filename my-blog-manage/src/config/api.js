
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

/**
 * 编辑文章
 */
export const editorArticle = (data) => Axios('http://localhost:5000/api/myblog/editorArticle.do',data,'post')

/**
 * 根据id获取文章
 */
export const getArticleById = (data) => Axios('http://localhost:5000/api/myblog/getArticleById.do',data,'get')