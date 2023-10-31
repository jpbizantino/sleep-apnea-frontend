import { Box } from '@mui/material'
import { ReactNode } from 'react'
import { NavBar, SideBar } from '../../backoffice/common/components'

interface Props {
  children?: ReactNode
}

export const AppLayout = ({ children }: Props) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <NavBar />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            height: '90vh',
          }}
        >
          <SideBar />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              overflow: 'auto',
              flexGrow: 1,
              //height: { xs: '100%', sm: '90%', md: '90%', lg: '70%' },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
