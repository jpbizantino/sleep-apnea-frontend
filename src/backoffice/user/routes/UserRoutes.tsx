import { Route, Routes } from 'react-router-dom'
import { UserForm } from '../views/UserForm'
import { UserList } from '../views/UserList'

export const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserList />} />
      <Route path="/new" element={<UserForm />} />
      <Route path="/:userId" element={<UserForm />} />
    </Routes>
  )
}
