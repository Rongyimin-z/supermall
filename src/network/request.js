import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instace = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/hy',
    // baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instace.interceptors.request.use(config => {
    return config;
  }, error => {

  })

  // 2.2.响应拦截
  instace.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error);
  })

  // 3.发送真正的网络请求
  return instace(config)
}
