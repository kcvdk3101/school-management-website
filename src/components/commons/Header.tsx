import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import logo from '../../assets/images/logo.png'
import BarChartIcon from '@mui/icons-material/BarChart'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import { useNavigate } from 'react-router-dom'
import { signout } from '../../features/authenticate/authSlice'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'

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

const Header: React.FC<HeaderProps> = ({ title }) => {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const [open, setOpen] = React.useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(signout(false))
    navigate('/')
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
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Setting</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={open}>
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
          <ListItemButton onClick={() => navigate('/admin/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/students')}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary='Students' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/lecturers')}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary='Lecturers' />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/admin/reports')}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary='Reports' />
          </ListItemButton>
          {/* <Divider sx={{ my: 1 }} /> */}
          {/* {secondaryListItems} */}
        </List>
      </Drawer>
    </>
  )
}

export default Header
