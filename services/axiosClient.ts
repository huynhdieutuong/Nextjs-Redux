import axios from 'axios'
import queryString from 'query-string'
import cookie from 'cookie'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (typeof window !== 'undefined') {
      const token = cookie.parse(document.cookie).token
      const auth = token ? `Bearer ${token}` : ''
      config.headers!.Authorization = auth
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
