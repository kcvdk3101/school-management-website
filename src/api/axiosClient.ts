import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_BASE_URL } from '../constants'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json;charset=utf-8',
  },
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
