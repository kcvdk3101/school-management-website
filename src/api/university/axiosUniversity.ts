import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_UNIVERSITY_URL } from '../../constants'

const axiosUniveristy = axios.create({
  baseURL: API_UNIVERSITY_URL,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

// Add a request interceptor
axiosUniveristy.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosUniveristy.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosUniveristy
