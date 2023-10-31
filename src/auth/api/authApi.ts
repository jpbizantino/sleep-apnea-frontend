import { UserLoginData, UserLoginResponse } from '../../common/types/user.type'
import { axiosAuthClient } from './axiosAuthClient'

export const signIn = async (
  data: UserLoginData
): Promise<UserLoginResponse> => {
  let userLoginSucess: UserLoginResponse = {
    user: null,
    token: '',
    role: null,
    message: '',
    error: false,
  }

  await axiosAuthClient
    .post('/login', data)
    .then(async (response) => {
      userLoginSucess = response.data
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .catch((reason: any) => {
      userLoginSucess = reason.response.data
    })

  return userLoginSucess
}
