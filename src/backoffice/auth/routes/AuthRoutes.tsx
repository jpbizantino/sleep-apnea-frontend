import { Route, Routes } from 'react-router-dom'
import { SignInSide } from '../pages'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<SignInSide />} />
    </Routes>
  )
}
