import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const BackofficeRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/backoffice/questions" />} />

      {routes.map(({ path, Component, to }) => (
        <>
          {/* <Route path={path} element={<Navigate to={to} />} /> */}
          <Route key={to} path={path} element={<Component />} />
        </>
      ))}
    </Routes>
  )
}

export default BackofficeRoutes
