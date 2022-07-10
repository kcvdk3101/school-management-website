import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import LanguageButton from '../components/commons/LanguageButton'
import * as Constants from '../constants/index'

const Layout: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  let navigate = useNavigate()
  const { t, i18n } = useTranslation()

  useEffect(() => {
    let lang = localStorage.getItem('cft-language')
    if (!lang) return
    i18n.changeLanguage(lang)
  }, [i18n])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleNavigateToAdmin = () => {
    navigate('/login')
  }

  return (
    <>
      <AppBar position='static' color='transparent'>
        <Container maxWidth='lg' sx={{ paddingY: 1 }}>
          <Toolbar disableGutters>
            <Box component='div' sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavLink to='/'>
                <img src={logo} alt='JOBHUB Logo' width={120} />
              </NavLink>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem>
                  <NavLink to={'/job?limit=5&offset=0'}>
                    <Typography textAlign='center'>{t('Job')}</Typography>
                  </NavLink>
                </MenuItem>
              </Menu>
            </Box>

            <Box component='div' sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <img src={logo} alt='JOBHUB Logo' width={120} />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                paddingRight: 4,
              }}
            >
              {Constants.pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    handleCloseNavMenu()
                    navigate(`${page.path}`)
                  }}
                  sx={{ my: 2, display: 'block', color: 'black', mr: 2 }}
                >
                  {t(`${page.title}`)}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <LanguageButton />
              <Button color='secondary' variant='contained' onClick={handleNavigateToAdmin}>
                {t('School')}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  )
}

export default Layout
