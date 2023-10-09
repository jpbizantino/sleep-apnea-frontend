import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const SurveyRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="/*" element={<Navigate to={routes[0].to} replace />} />
    </Routes>
  )
}
