import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { patientQuerySlice } from '../../patient/slices'
import {
  backofficeSlice,
  backofficeQuerySlice,
} from '../../backoffice/common/slices'
import { authSlice } from '../../backoffice/auth/slices'
import { baseQuerySlice } from '../../publicSurvey/slices/baseQuerySlice'
import { userQuerySlice, userSlice } from '../../backoffice/user/slices'
import { combinedAnswerQuerySlice } from '../../backoffice/combinedAnswer/slices'
// import { baseQuerySlice } from '../../survey/slices/baseQuerySlice'

//Redux-Persist config
//Must place RTK Query reducer in the blacklist
export const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [''],
  blacklist: [
    baseQuerySlice.reducerPath,
    patientQuerySlice.reducerPath,
    backofficeQuerySlice.reducerPath,
    userQuerySlice.reducerPath,
    combinedAnswerQuerySlice.reducerPath,
  ],
}

export const rootReducer = combineReducers({
  backoffice: backofficeSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,

  /** RTK Query Reducers*/
  [baseQuerySlice.reducerPath]: baseQuerySlice.reducer,
  [patientQuerySlice.reducerPath]: patientQuerySlice.reducer,
  [backofficeQuerySlice.reducerPath]: backofficeQuerySlice.reducer,
  [userQuerySlice.reducerPath]: userQuerySlice.reducer,
  [combinedAnswerQuerySlice.reducerPath]: combinedAnswerQuerySlice.reducer,
})
