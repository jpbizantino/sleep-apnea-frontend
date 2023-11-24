import { Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const CombinedAnswerRoutes = () => {
  return (
    <Routes>
      {routes.map(({ path, Component, to }) => (
        <Route key={to} path={path} element={<Component />} />
      ))}
    </Routes>
  )
}

export default CombinedAnswerRoutes
