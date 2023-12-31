import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'

import { Logout, VpnKey } from '@mui/icons-material'
import { useBackoffice } from '../hooks/userBackoffice'
import { useAuth } from '../../auth/hooks'

export const NavBar = () => {
  const { toggleMainMenu } = useBackoffice()
  const { startLogout, user } = useAuth()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Perfil</MenuItem> */}
      {/* <MenuItem onClick={handleMenuClose}>Mi Cuenta</MenuItem> */}

      {/* <MenuItem
        disableRipple
        onClick={() => {
          setAnchorEl(null)
          // toggleChangePasswordModaOpen()
        }}
      >
        <VpnKey sx={{ mr: 1 }} />
        Cambiar Contraseña
      </MenuItem> */}

      <MenuItem
        onClick={() => {
          startLogout()
        }}
      >
        <Logout sx={{ mr: 1 }} />
        Salir
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          // toggleChangePasswordModaOpen()
        }}
      >
        <VpnKey sx={{ mr: 1 }} />
        Cambiar Contraseña
      </MenuItem>

      <MenuItem
        onClick={() => {
          startLogout()
        }}
      >
        <Logout sx={{ mr: 1 }} />
        Salir
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => toggleMainMenu()}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'block', sm: 'block' } }}
            >
              Total Sleep
              {/* {COMPANY_NAME} */}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {user?.name}
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {renderMenu}
      </Box>
      {/* <ChangePasswordModal /> */}
    </>
  )
}
