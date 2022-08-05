import axios from 'axios'
import { getToken } from '@/lin/util/token'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_URL,
  // 超时
  timeout: 300000,
})

const refresh_token = getToken('access_token')

// 请求拦截器
service.interceptors.request.use(config => {
  config.headers.Authorization = refresh_token
  return config
})

// 请求响应拦截器
service.interceptors.response.use(
  res =>
    // console.log("文件模块响应：");
    // console.log(res);
    res,
)

export default service
