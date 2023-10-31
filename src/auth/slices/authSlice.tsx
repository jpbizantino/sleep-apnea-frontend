import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../common/types/user.type'

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// function withPayloadType<T>() {
//   return (t: T) => ({ payload: t })
// }

export interface initalState {
  error: string
  user: User | null
  role: string | null
  errorMessage: string | undefined
  // registrationStep: number
  // userRegistration: UserRegistration | null
}

const initialState: initalState = {
  error: 'not-authenticated',
  user: null,
  role: null,
  errorMessage: undefined,
  // registrationStep: 0,
  // userRegistration: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.error = 'checking'
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }) => {
      state.error = 'authenticated'
      state.user = payload.user
      state.role = payload.role
      state.errorMessage = undefined
    },
    onLogout: (state, { payload }) => {
      state.error = 'not-authenticated'
      state.user = null
      state.role = null
      state.errorMessage = payload
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined
    },

    // onSetRegistrationStep: (state, { payload }) => {
    //   state.registrationStep = payload
    // },

    // onSetUserRegistration: (state, { payload }) => {
    //   state.userRegistration = payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  onClearErrorMessage,
  // onSetRegistrationStep,
  // onSetUserRegistration,
} = authSlice.actions

export default authSlice.reducer
