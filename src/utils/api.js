import axios from "axios";
import {Message} from "element-ui";
import router from "../router";



axios.interceptors.request.use(config=>{
    //如果存在token则请求将会携带token
    if (window.sessionStorage.getItem('tokenStr')) {
        config.headers['Authorization']=window.sessionStorage.getItem('tokenStr');
    }
    return config;
},error => {
    console.log(error);
})

/**
 * 响应拦截器
 */
axios.interceptors.response.use(success=> {
    //业务逻辑错误
    if (success.status && success.status==200){
        if (success.data.code==500 || success.data.code==401 ||success.data.code==403){
            Message.error({message:success.data.message});
            return;
        }
        if (success.data.message){
            Message.success({message:success.data.message});
        }
    }
    return success.data;
},error => {
    if (error.response.code==504 || error.response.code==404){
        Message.error({message:'服务人数过多,请稍后重试'});
    }else if(error.response.code==403){
        Message.error({message:'权限不足,请联系管理员'});
    }else if(error.response.code==401){
        Message.error({message:'未登录,请登陆'});
        router.replace('/');
    }else {
        if (error.response.data.message){
            Message.error({message: error.response.data.message});
        }else{
            Message.error({message: '未知错误!'});
        }
    }
    return;
});
let base = '';
export const postRequest=(url,params)=>{
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    })
};
export const putRequest=(url,params)=>{
    return axios({
        method: `put`,
        url: `${base}${url}`,
        data: params
    })
}
export const getRequest=(url,params)=>{
    return axios({
        method: `get`,
        url: `${base}${url}`,
        data: params
    })
}
export const deleteRequest=(url,params)=>{
    return axios({
        method: `delete`,
        url: `${base}${url}`,
        data: params
    })
}