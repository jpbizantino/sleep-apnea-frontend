import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../backoffice/auth/hooks'
import BackofficeRoutes from '../../backoffice/common/routes/BackofficeRoutes'
import { PublicSurveyRoutes } from '../../publicSurvey/routes/PublicSurveyRoutes'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
  const { checkAuthToken } = useAuth()

  useEffect(() => {
    checkAuthToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/backoffice/*" element={<BackofficeRoutes />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={<PublicSurveyRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
