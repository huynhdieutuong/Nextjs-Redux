export interface LoginData {
  email: string
  password: string
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