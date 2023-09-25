import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { questionQuerySlice } from '../../survey/slices'

//Redux-Persist config
//Must place RTK Query reducer in the blacklist
export const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: [''],
  blacklist: [questionQuerySlice.reducerPath],
}

export const rootReducer = combineReducers({
  [questionQuerySlice.reducerPath]: questionQuerySlice.reducer,
})
