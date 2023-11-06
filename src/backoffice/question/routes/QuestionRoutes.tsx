import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const QuestionRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, to }) => (
        <Route key={to} path={path} element={<Component />} />
      ))}

      {/* <Route
        key={routes[0].to}
        path="/*"
        element={<Navigate to={routes[0].to} replace />}
      /> */}
    </Routes>
  )
}

export default QuestionRoutes
