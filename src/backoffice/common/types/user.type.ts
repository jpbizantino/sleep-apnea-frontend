import { CommonResponse } from '../../../common/types'

export interface User {
  userId: string
  email: string
  name: string
  roleId: string
  active: boolean
  creaAt: Date
  updateAt: Date
}

export interface UserLoginResponse extends CommonResponse {
  user: User | null
  token: string | null
  role: string | null
}

export interface UserLoginData {
  username: string
  password: string
}
