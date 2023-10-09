import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Dashboard } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

export const MainMenu = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <ListItemButton
        selected={location.pathname === '/backoffice/questions'}
        onClick={() => {
          navigate('/backoffice/questions')
        }}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Questions" />
      </ListItemButton>
    </>
  )
}
