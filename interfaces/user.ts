export interface LoginData {
  email: {
    value: string
    error: string
  }
  password: {
    value: string
    error: string
  }
}

export interface RegisterData {
  fullname: {
    value: string
    error: string
  }
  email: {
    value: string
    error: string
  }
  password: {
    value: string
    error: string
  }
  repassword: {
    value: string
    error: string
  }
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
