import client from './configApi';
import { token } from './authApi';

const limit = 10;

export default {

  createPost(params){
    const url = `/social/post/create`;
    return client.post(url,params,{
      apiName: arguments.callee.name,
      headers:{
        Authorization:token
      }
    }).then(respone=>respone)
  },
  // Get list post
  getListPost(account_id,page,per_page){
    page = page == undefined? 1: page;
    per_page = (per_page == undefined)? limit: per_page ;
    const url = `/social/posts/list?account_id=${account_id}&page=${page}&per_page=${per_page}`;
    return client.get(url,{
        apiName: arguments.callee.name,
        headers:{
            Authorization: token
        }
    }).then(respone => respone);
  },
  likePost(params){
    const url = `/social/like/create`
    return client.post(url,params,{
      apiName: arguments.callee.name,
      headers:{
        Authorization:token
      }
    }).then(respone=>respone)
  },
  
  unLikePost(params){
    const url = `/social/like/unlike`
    return client.post(url,params,{
      apiName: arguments.callee.name,
      headers:{
        Authorization:token
      }
    }).then(respone=>respone)
  },

  createComment(params){
    const url = `/social/comment/create`;
    return client.post(url,params,{
      apiName: arguments.callee.name,
      headers:{
        Authorization:token
      }
    }).then(respone=>respone)
  },

  getListComments(post_id,page,per_page){
    page = page == undefined? 1: page;
    per_page = (per_page == undefined)? limit: per_page ;
    const url = `/social/comments/${post_id}?page=${page}&per_page=${per_page}`;
    return client.get(url,{
      apiName: arguments.callee.name,
      headers:{
        Authorization:token
      }
    }).then(respone=>respone)
  }
}