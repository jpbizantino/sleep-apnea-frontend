import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../backoffice/auth/hooks'
import BackofficeRoutes from '../../backoffice/common/routes/BackofficeRoutes'
import { PublicSurveyRoutes } from '../../publicSurvey/routes/PublicSurveyRoutes'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
  const { checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route key="/" path="/backoffice/*" element={<BackofficeRoutes />} />

          <Route
            path="/backoffice/*"
            element={<Navigate to="/backoffice" replace />}
          />
        </Route>

        <Route key="/" path="/*" element={<PublicSurveyRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
