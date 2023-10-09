import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const BackofficeRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, to }) => (
        <Route key={to} path={path} element={<Component />} />
      ))}

      <Route
        key={routes[0].to}
        path="/*"
        element={<Navigate to={routes[0].to} />}
      />
    </Routes>
  )
}

export default BackofficeRoutes
