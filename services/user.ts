import { LoginData, RegisterData } from '../interfaces/user'
import axiosClient from './axiosClient'

const url = '/member'

const userService = {
  login: async (data: LoginData) => {
    return axiosClient.post(`${url}/login.php`, data)
  },
  register: async (data: RegisterData) => {
    return axiosClient.post(`${url}/register.php`, data)
  },
  getUserById: async (userId: number | null) => {
    return axiosClient.get(`${url}/member.php?userid=${userId}`)
  },
}

export default userService
