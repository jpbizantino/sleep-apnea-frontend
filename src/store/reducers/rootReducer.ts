import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { questionQuerySlice } from '../../survey/slices'
import { patientQuerySlice } from '../../patient/slices'
import { backofficeSlice, backofficeQuerySlice } from '../../backoffice/slices'

//Redux-Persist config
//Must place RTK Query reducer in the blacklist
export const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [''],
  blacklist: [
    questionQuerySlice.reducerPath,
    patientQuerySlice.reducerPath,
    backofficeQuerySlice.reducerPath,
  ],
}

export const rootReducer = combineReducers({
  backoffice: backofficeSlice.reducer,

  /** RTK Query Reducers*/
  [questionQuerySlice.reducerPath]: questionQuerySlice.reducer,
  [patientQuerySlice.reducerPath]: patientQuerySlice.reducer,
  [backofficeQuerySlice.reducerPath]: backofficeQuerySlice.reducer,
})
