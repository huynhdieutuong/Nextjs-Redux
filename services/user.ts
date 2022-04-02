import { isEmptyObject } from '../helpers/utils'
import {
  ChangePasswordType,
  LoginData,
  RegisterData,
  UpdateProfileType,
} from '../interfaces/user'
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
  updateProfile: async (data: UpdateProfileType) => {
    const formData = new FormData()
    formData.append('fullname', data.fullname)
    formData.append('description', data.description)
    formData.append('gender', data.gender)

    if (!isEmptyObject(data.avatar)) formData.append('avatar', data.avatar)

    return axiosClient.post(`${url}/update.php`, formData)
  },
  changePassword: async (data: ChangePasswordType) => {
    return axiosClient.post(`${url}/password.php`, data)
  },
}

export default userService
