import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../backoffice/auth/hooks'
import { AuthRoutes } from '../../backoffice/auth/routes/AuthRoutes'

interface Props {
  children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const { error, checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (error !== 'authenticated') {
    return (
      <Routes>
        <Route
          path="/*"
          element={<Navigate to="/backoffice/auth/login" replace />}
        />
        <Route path="/backoffice/auth/*" element={<AuthRoutes />} />
      </Routes>
    )
  }

  return children ? <> children</> : <Outlet />
}
