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
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import SearchFormManagement from './components/SearchFormManagement'
import { useTranslation } from 'react-i18next'
import { withTranslation } from 'react-i18next'
import JobCard from '../../components/card/JobCard'
import LanguageButton from '../../components/commons/LanguageButton'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import * as Constants from '../../constants/index'

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
  headingContainer: {
    marginTop: 28,
    marginBottom: 28,
  },
  heading: {
    display: 'flex',
    justifyContent: 'center',
  },
})

type HomeProps = {}

function BannerHeading() {
  const { t } = useTranslation()

  return (
    <Grid item xs={12} container>
      <Typography variant='h4' marginBottom={3} color='white' fontWeight='700'>
        {t('Search for internship and work place')}
      </Typography>
    </Grid>
  )
}

const Home: React.FC<HomeProps> = () => {
  const classes = useStyles()
  let navigate = useNavigate()

  const { t } = useTranslation()

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
        <title>{t('Home - JOBHUB')}</title>
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
                {Constants.pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                ))}
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
              {Constants.pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: 'block', color: 'black' }}
                >
                  {page}
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
                {t('Admin')}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth='xl' className={classes.background}>
        <Container maxWidth='lg'>
          <Box component='div' paddingY={10}>
            <Grid container>
              <BannerHeading />
              {/* Search Form */}
              <SearchFormManagement />
            </Grid>
          </Box>
        </Container>
      </Container>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box className={classes.heading}>
          <Typography variant='h5' color='#f05742'>
            {t('Recruitment News March 2022')}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {([1, 2, 3, 4, 5, 6] as const).map((_, index) => (
            <Grid key={index} item xs={6}>
              <JobCard />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' className={classes.headingContainer}>
        <Box className={classes.heading}>
          <Typography variant='h5' color='#f05742'>
            {t('Our partners')}
          </Typography>
        </Box>

        <ImageList variant='quilted' cols={4} rowHeight={150}>
          {Constants.itemData.map((item) => (
            <ImageListItem key={item.img} cols={1} rows={1}>
              <img
                src={`${item.img}?w=${150}&h=${150}&fit=crop&auto=format`}
                alt={item.title}
                loading='lazy'
                style={{ objectFit: 'scale-down' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Container>
    </div>
  )
}

export default withTranslation()(Home)
