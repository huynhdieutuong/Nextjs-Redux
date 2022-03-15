import { LoginData } from '../interfaces/user'
import axiosClient from './axiosClient'

const url = '/member'

const userService = {
  login: async (data: LoginData) => {
    return axiosClient.post(`${url}/login.php`, data)
  },
  getUserById: async (userId: number) => {
    return axiosClient.get(`${url}/member.php?userid=${userId}`)
  },
}

export default userService
