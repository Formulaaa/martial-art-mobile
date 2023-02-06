import axios from 'axios'
import { message } from 'ant-design-vue'
import process from 'process'
/**
 * axios全局配置
 */
const urls = {
  development: '/api',
  production: 'http://localhost:8080'
}
type nodeEnv = 'development' | 'production'
axios.defaults.baseURL = urls[process.env.NODE_ENV as nodeEnv] ?? '/api'
axios.defaults.timeout = 5000
/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  (config) => {
    // 发出请求前修改配置：添加token等
    return config
  },
  async (error): Promise<any> => {
    // 请求发生错误：突然断网、无效的url等
    // 暂时还没有触发过这个回调，不太清楚有啥用
    console.log('req', error)
    return await Promise.reject(error)
  }
)
/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  (response) => {
    // 响应码为2xx
    // console.log(response);
    return response.data // 数据解包
  },
  async (error): Promise<any> => {
    // 状态码非2xx、断网或者断网等
    // console.log("res", error);
    if (typeof error.response === 'undefined') {
      // 服务器能够响应
      switch (error.response.status) {
        case 401: // 用户没有权限，跳转至401页面
          await message.error(403)
          break
        case 403: // token过期，跳转至首页重新登录
          await message.error(403)
          break
        case 404: // 访问页面不存在，跳转至404页面
          await message.error(404)
          break
        case 500: // 服务器错误，跳转至500页面或者显示错误信息
          await message.error(500)
          break
        default:
          await message.error('网络错误，请稍后重试！')
          return await Promise.reject(error)
      }
    } else {
      switch (error.code) {
        case 'ERR_NETWORK':
          await message.error('当前无网络，请检查网络连接！')
          break
        case 'ECONNABORTED':
          await message.error('网络连接超时，请稍后重试！')
          break
        default:
          await message.error('网络错误，请稍后重试')
      }
      return await Promise.reject(error)
    }
  }
)

/**
 * 封装请求方法
 */
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export async function get(url: string, params: object): Promise<object | null> {
  return await new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export async function post(url: string, params: object): Promise<object | null> {
  return await new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
