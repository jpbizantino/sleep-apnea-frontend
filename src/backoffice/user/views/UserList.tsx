import { Box } from '@mui/material'
import { UserPage } from '../pages/UserPage'
import { UserGrid } from '../components/UserGrid'

export const UserList = () => {
  return (
    <>
      <UserPage>
        <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
          <UserGrid />
        </Box>
      </UserPage>
    </>
  )
}
