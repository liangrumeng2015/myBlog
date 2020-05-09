
import Axios from './axios'
const httpURL = '/wypapi'
export const reqLogin = (data) => Axios(httpURL + '/teachtool/login/loginstate',data,'post');

 /**
  * 获取文章列表all
  */
export const reqArticleList = (data) =>Axios('http://localhost:5000/api/myblog/articleList.do',data,'post')

/**
 * 根据id获取文章信息
 */
export const reqArticleById = (data) =>Axios('http://localhost:5000/api/myblog/getArticleById.do',data,'get')