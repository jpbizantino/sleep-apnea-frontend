import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '../../store/store'
import { signIn as logIn } from '../api/authApi'
import { onChecking, onClearErrorMessage, onLogin, onLogout } from '../slices'
import { UserLoginData } from '../../common/types/user.type'

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const useAuth = () => {
  const { error, user, role, errorMessage } = useSelector(
    (state: RootState) => state.auth
  )

  const dispatch = useAppDispatch()

  const startLogin = async (data: UserLoginData) => {
    dispatch(onChecking())
    try {
      await logIn(data)
        .then((response) => {
          if (response.error) {
            errorProcess(response.message)
          } else {
            dispatch(onLogin(response))
            localStorage.setItem('token', response.token ?? '')
          }
        })
        .catch(() => {
          errorProcess(' Credenciales incorrectas')
        })

      //   localStorage.setItem('token-init-date', new Date().getTime())
    } catch (error) {
      errorProcess('Credenciales incorrectas')
    }
  }

  const errorProcess = (message: string) => {
    localStorage.clear()

    dispatch(onLogout(message))
    setTimeout(() => {
      dispatch(onClearErrorMessage())
    }, 10 * 1000)
  }

  //Hay que mejorar esto
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return dispatch(onLogout(undefined))

    //Logout if token expired
    const decodedJwt = parseJwt(token)
    if (decodedJwt.exp * 1000 < Date.now()) return dispatch(onLogout(undefined))

    try {
      dispatch(onLogin({ user, role }))
    } catch (error) {
      localStorage.clear()
      dispatch(onLogout(undefined))
    }
  }

  const startLogout = () => {
    localStorage.clear()
    dispatch(onLogout(undefined))
  }

  return {
    error,
    user,
    role,
    errorMessage,
    checkAuthToken,
    startLogin,
    startLogout,
    // setRegistrationStep,
    // nextRegistrationStep,
    // setUserRegistration,
  }
}
