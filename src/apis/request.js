import axios from 'axios'
import router from '../router'

// create an axios instance
const service = axios.create({
  /* eslint-disable */
  baseURL: '',
  /* eslint-enable */
  timeout: 12000
})

// http request 拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

service.interceptors.response.use(
  response => {
    // 自己加逻辑
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.setItem('token', '')
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    try {
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    } catch (error) {
      return error
    }
  }
)

export default service
