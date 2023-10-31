import { Typography } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'
import { useRef } from 'react'
import { useBackoffice } from '../hooks/userBackoffice'
import { MainMenu } from './MainMenu '

const drawerWidth = 240

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SideBar = () => {
  const drawerRef = useRef<HTMLDivElement>(null)

  const { isMainMenuOpen } = useBackoffice()

  // useEffect(() => {
  //   if (drawerRef.current) {
  //     drawerHeight = drawerRef.current.clientHeight
  //   }

  //   // if (role === ROLES.Patient) openMainMenu()
  // }, [])

  const CustomMenu = () => {
    return (
      <>
        <MainMenu />
      </>
    )
  }

  return (
    <>
      <Drawer
        ref={drawerRef}
        variant="permanent"
        sx={{ height: '90vh' }}
        open={isMainMenuOpen}
      >
        <List component="nav">
          <CustomMenu />

          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              display: !isMainMenuOpen ? 'none' : 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'center',
              pt: 10,
            }}
          >
            <Typography variant="subtitle2" noWrap component="div">
              {/* Versión {VITE_VERSION} */}
            </Typography>

            <Box>
              <img src="/logoMedexware.png" width={100} loading="lazy" />
            </Box>
          </Box>
        </List>
      </Drawer>
    </>
  )
}
