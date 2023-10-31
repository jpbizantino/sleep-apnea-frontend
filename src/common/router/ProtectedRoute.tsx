import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../auth/hooks'
import { AuthRoutes } from '../../auth/routes/AuthRoutes'

interface Props {
  children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const { checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <Routes>
      <Route
        path="/backoffice/*"
        element={<Navigate to="/backoffice/auth/login" />}
      />
      <Route path="/backoffice/auth/*" element={<AuthRoutes />} />
    </Routes>
  )

  return children ? <> children</> : <Outlet />
}
