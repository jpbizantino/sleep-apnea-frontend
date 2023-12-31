import { Navigate, Route, Routes } from 'react-router-dom'
import { SurveyView } from '../views/SurveyView'

export const PublicSurveyRoutes = () => {
  return (
    <Routes>
      <Route key="/" path="/*" element={<SurveyView />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
