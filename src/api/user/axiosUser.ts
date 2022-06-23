import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_USER_URL } from '../../constants'

const axiosUser = axios.create({
  baseURL: API_USER_URL,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

// Add a request interceptor
axiosUser.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosUser.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosUser
