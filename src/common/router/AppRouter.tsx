import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { privateRoutes, publicRoutes } from './routes'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<ProtectedRoute />}> */}
        {privateRoutes.map(({ path, Component, to }) => (
          <Route key={to} path={path} element={<Component />} />
        ))}
        {/* </Route> */}

        {publicRoutes.map(({ path, Component, to }) => (
          <Route key={to} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
