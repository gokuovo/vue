import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 300000
})

//请求拦截器
service.interceptors.request.use(config =>{
    // console.log("文件模块请求：");
    // console.log(config);
    return config;
})

//请求响应拦截器
service.interceptors.response.use(res =>{
    // console.log("文件模块响应：");
    // console.log(res);
    return res;
})

export default service
