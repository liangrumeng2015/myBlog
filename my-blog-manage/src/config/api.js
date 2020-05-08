
import Axios from './axios'
const httpURL = '/wypapi'
export const reqLogin = (data) => Axios(httpURL + '/teachtool/login/loginstate',data,'post');

/**
 * 发布文章
 */

 /**
  * 编辑文章
  */

 /**
  * 获取文章列表
  */
export const reqArticleList = () =>Axios('http://localhost:5000/api/myblog/articleList.do','','get')