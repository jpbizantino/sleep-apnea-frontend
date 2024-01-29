import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const BackofficeRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Navigate to="/backoffice/questions" />} />

      {routes.map(({ path, Component }) => (
        <>
          {/* <Route path={path} element={<Navigate to={to} />} /> */}
          <Route key={path} path={path} element={<Component />} />
        </>
      ))}
    </Routes>
  )
}

export default BackofficeRoutes
