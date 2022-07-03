import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { signin } from '../../../features/authenticate/authSlice'

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

type FormInput = {
  email: string
  password: string
}

const signinSchema = yup.object({
  email: yup.string().required('This field is required'),
  // .test('checkEmail', 'Please use Admin mail', (value) => {
  //   if (value === 'admin@gmail.com') {
  //     return true
  //   }
  //   return false
  // }),
  password: yup.string().required('This field is required'),
  // .test('checkPassword', 'Wrong password', (value) => {
  //   if (value === 'admin123') {
  //     return true
  //   }
  //   return false
  // }),
})

const Signin: React.FC<SigninProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  let navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { error } = useAppSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(signinSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleClick = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data
    const response: any = await dispatch(signin({ email, password }))
    if (response.meta.requestStatus === 'fulfilled') {
      if (response.payload.user.role === 'teacher') {
        navigate('/lecturer')
        toast.success('Login successfully')
      }
      if (response.payload.user.role === 'admin') {
        navigate('/admin/dashboard')
        toast.success('Login successfully')
      }
    } else {
      toast.error(error)
    }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <Helmet>
        <title>{t('Signin')}</title>
      </Helmet>
      <CssBaseline />
      <Box className={classes.innerContainer}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('Signin')}
        </Typography>
        <form onSubmit={onSubmit} style={{ marginTop: '8px' }}>
          <TextField
            label={t('Email')}
            required
            fullWidth
            margin='normal'
            autoFocus
            disabled={isSubmitting}
            placeholder={t('Email')}
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={t(`${errors.email?.message ? errors.email?.message : ''}`)}
          />
          <TextField
            label={t('Password')}
            required
            fullWidth
            margin='normal'
            autoFocus
            disabled={isSubmitting}
            type={showPassword ? 'text' : 'password'}
            placeholder={t('Password')}
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={t(`${errors.password?.message ? errors.password?.message : ''}`)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleClick}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Button
            fullWidth
            color='secondary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : `${t('Signin')}`}
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Signin
