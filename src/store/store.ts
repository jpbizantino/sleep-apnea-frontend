import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { rootReducer, persistConfig } from './reducers'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { patientQuerySlice } from '../patient/slices'
import { backofficeQuerySlice } from '../backoffice/common/slices'
import { questionQuerySlice } from '../publicSurvey/slices'
import { userQuerySlice } from '../backoffice/user/slices'

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof rootReducer>

//Middlewares
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      questionQuerySlice.middleware,
      patientQuerySlice.middleware,
      backofficeQuerySlice.middleware,
      userQuerySlice.middleware,
    ]),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store)
// export default store
