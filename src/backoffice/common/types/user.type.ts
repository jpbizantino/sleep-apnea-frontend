import { CommonResponse } from '../../../common/types'
import { Role } from './role.type'

export interface User {
  userId: string
  email: string
  name: string
  password: string | undefined
  roleId: string
  active: boolean
  creaAt?: Date | undefined
  updateAt?: Date | undefined
  role: Role | undefined
}

export interface UserLocalFilter extends User {}

export interface UserLoginResponse extends CommonResponse {
  user: User | null
  token: string | null
  role: string | null
}

export interface UserLoginData {
  username: string
  password: string
}
