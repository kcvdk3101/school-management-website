import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import Helmet from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import SearchFormManagement from './components/SearchFormManagement'

const pages = ['Jobs', 'Blog', 'About']

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    border: '1px solid red',
  },
  background: {
    maxHeight: 320,
    background: 'linear-gradient(180deg, #f05742 0%, #f05742 50%, #e53935 80%)',
  },
})

type HomeProps = {}

function Heading() {
  return (
    <Grid item xs={12} container>
      <Typography variant='h4' marginBottom={3} color='white' fontWeight='700'>
        Đến sân bay không còn mệt mỏi
      </Typography>
    </Grid>
  )
}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles()
  let navigate = useNavigate()

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

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
    <div className={classes.container}>
      <Helmet>
        <title>Home - JOBHUB</title>
      </Helmet>
      <AppBar position='static' color='transparent'>
        <Container maxWidth='lg' sx={{ paddingY: 1 }}>
          <Toolbar disableGutters>
            <Box component='div' sx={{ display: { xs: 'none', md: 'flex' } }}>
              <img src={logo} alt='JOBHUB Logo' width={120} />
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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
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
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block', color: 'black' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Button
              color='secondary'
              variant='contained'
              onClick={handleNavigateToAdmin}
            >
              Admin
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth='xl' className={classes.background}>
        <Container maxWidth='lg'>
          <Box component='div' paddingY={10}>
            <Grid container>
              <Heading />
              {/* Search Form */}
              <SearchFormManagement />
            </Grid>
          </Box>
        </Container>
      </Container>

      <Typography>Tin tức tuyển dụng Tháng 3/2022</Typography>
      <Typography>Đối tác của chúng tôi</Typography>
    </div>
  )
}

export default Home
