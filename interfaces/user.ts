export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  fullname: string
  email: string
  password: string
  repassword: string
}

export interface UserJWTObj {
  id: number
  email: string
}

export interface CurrentUserType {
  USERID: string
  email: string
  gender: string
  description: string
  fullname: string
  status: string
  profilepicture: string
  permission: string
}

export interface UpdateProfileType {
  avatar: File
  fullname: string
  description: string
  gender: string
}

export interface ChangePasswordType {
  oldPassword: string
  newPassword: string
  reNewPassword: string
}
