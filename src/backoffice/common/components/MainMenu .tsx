import { Poll, QuestionAnswer } from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
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
          <QuestionAnswer />
        </ListItemIcon>
        <ListItemText primary="Preguntas" />
      </ListItemButton>

      <ListItemButton
        selected={location.pathname === '/backoffice/surveys'}
        onClick={() => {
          navigate('/backoffice/surveys')
        }}
      >
        <ListItemIcon>
          <Poll />
        </ListItemIcon>
        <ListItemText primary="Encuestas" />
      </ListItemButton>
    </>
  )
}
