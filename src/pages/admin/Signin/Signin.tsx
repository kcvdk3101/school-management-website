import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { signin } from '../../../features/authentication/authSlice'

const useStyles = makeStyles({
  innerContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type SigninProps = {}

const Signin: React.FC<SigninProps> = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  let navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)
    try {
      if (data.get('email') === 'admin@gmail.com') {
        dispatch(signin(true))
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={classes.innerContainer}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            color='secondary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Signin
