import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component, to }) => (
          <Route key={to} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
