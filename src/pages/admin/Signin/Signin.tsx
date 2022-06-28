import { yupResolver } from '@hookform/resolvers/yup'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import { useAppDispatch } from '../../../app/hooks'
import CustomButon from '../../../components/commons/CustomButon'
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
  email: yup
    .string()
    .required('This field is required')
    .test('checkEmail', 'Please use Admin mail', (value) => {
      if (value === 'admin@gmail.com') {
        return true
      }
      return false
    }),
  password: yup
    .string()
    .required('This field is required')
    .test('checkPassword', 'Wrong password', (value) => {
      if (value === 'admin123') {
        return true
      }
      return false
    }),
})

const Signin: React.FC<SigninProps> = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  let navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(signinSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data
    try {
      const repsonse = await dispatch(signin({ email, password }))
      if (repsonse.meta.requestStatus === 'fulfilled') {
        navigate('/admin/dashboard')
        toast.success('Login successfully')
      }
    } catch (error) {
      console.log(error)
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
            required
            fullWidth
            margin='normal'
            autoFocus
            placeholder={t('Email')}
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={t(`${errors.email?.message ? errors.email?.message : ''}`)}
          />
          <TextField
            required
            fullWidth
            margin='normal'
            autoFocus
            type='password'
            autoComplete='current-password'
            placeholder={t('Password')}
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={t(`${errors.password?.message ? errors.password?.message : ''}`)}
          />
          <CustomButon
            type='submit'
            label={t('Signin')}
            color='secondary'
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          />
        </form>
      </Box>
    </Container>
  )
}

export default Signin
