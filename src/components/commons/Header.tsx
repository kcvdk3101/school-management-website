import AccountCircle from '@mui/icons-material/AccountCircle'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { grey } from '@mui/material/colors'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import logo from '../../assets/images/logo.png'
import { signout } from '../../features/authenticate/authSlice'
import LanguageButton from './LanguageButton'

type HeaderProps = {
  title: string
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  })
)

const getIconByTitle = (title: string) => {
  switch (title) {
    case 'Dashboard':
      return <DashboardIcon fontSize='large' />
    case 'Student':
      return <GroupsIcon fontSize='large' />
    case 'Lecturer':
      return <LocalLibraryIcon fontSize='large' />
    case 'Corporation':
      return <CorporateFareIcon fontSize='large' />
    case 'Notice':
      return <ArticleIcon fontSize='large' />
    default:
      return
  }
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  let navigate = useNavigate()
  const { t } = useTranslation()

  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)

  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const d = new Date()
  let year = d.getFullYear()

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () => {
    try {
      await dispatch(signout())
      navigate('/')
    } catch (error) {
      toast.error('Cannot logout this account! Please try again')
    }
  }

  return (
    <>
      <CssBaseline />
      <AppBar position='absolute' open={open} color='secondary'>
        <Toolbar
          sx={{
            pr: '24px',
          }}
        >
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon style={{ visibility: 'hidden' }} />
          </IconButton>
          <Box style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {getIconByTitle(title)}
            <Typography variant='h5' color='inherit' sx={{ ml: 2 }}>
              {t(`${title}`)}
            </Typography>
          </Box>
          <Typography variant='h4' color='inherit' sx={{ flexGrow: 1 }}>
            {t('Internship Management System')}
          </Typography>
          <LanguageButton />

          {isAuthenticated && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Box
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  sx={{ px: 2, py: 1 }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ bgcolor: grey[500], width: 32, height: 32 }}>
                      {user.firstName?.split('')[0]}
                    </Avatar>
                    <Typography variant='body1'>{user.firstName}</Typography>
                  </Box>
                  <Button onClick={handleLogout}>{t('Signout')}</Button>
                </Box>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open} style={{ minHeight: '100vh' }}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt='JOBHUB Logo' width={60} />
            <Typography>HUFLIT JOBHUB</Typography>
          </Box>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component='nav'>
          <Tooltip title={t('Dashboard') as React.ReactChild} placement='right' arrow>
            <ListItemButton onClick={() => navigate('/admin/dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('Dashboard')} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={t('Student') as React.ReactChild} placement='right' arrow>
            <ListItemButton
              onClick={() =>
                navigate(
                  `/admin/students?limit=8&offset=0&identityNumber=&status=&fullName=&term=&academicYear=${year}&nameTeacher=&specialization=`
                )
              }
            >
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary={t('Student')} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={t('Lecturer') as React.ReactChild} placement='right' arrow>
            <ListItemButton
              onClick={() =>
                navigate(
                  `/admin/teachers?limit=8&position=&fullName=&academicYear=${year}&department=`
                )
              }
            >
              <ListItemIcon>
                <LocalLibraryIcon />
              </ListItemIcon>
              <ListItemText primary={t('Lecturer')} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={t('Corporation') as React.ReactChild} placement='right' arrow>
            <ListItemButton onClick={() => navigate('/admin/corporation?limit=8&offset=0')}>
              <ListItemIcon>
                <CorporateFareIcon />
              </ListItemIcon>
              <ListItemText primary={t('Corporation')} />
            </ListItemButton>
          </Tooltip>

          <Tooltip title={t('Notice') as React.ReactChild} placement='right' arrow>
            <ListItemButton onClick={() => navigate('/admin/notice?limit=8&offset=0')}>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary={t('Notice')} />
            </ListItemButton>
          </Tooltip>
        </List>
      </Drawer>
    </>
  )
}

export default Header
