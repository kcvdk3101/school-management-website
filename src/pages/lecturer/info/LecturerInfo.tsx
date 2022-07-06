import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import EditTeacherFormManagement from '../../../components/form/teacher/edit/EditTeacherFormManagement'
import { signout } from '../../../features/authenticate/authSlice'

type LecturerInfoProps = {}

const useStyles = makeStyles({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const LecturerInfo: React.FC<LecturerInfoProps> = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { detail, lastName, firstName, email, phoneNumber } = useAppSelector(
    (state) => state.auth.user
  )

  const [openEditTeacher, setOpenEditTeacher] = useState(false)

  const handleOpenEditTeacher = () => {
    setOpenEditTeacher(true)
  }

  const handleCloseEditTeacher = () => {
    setOpenEditTeacher(false)
  }

  const handleLogout = async () => {
    await dispatch(signout())
    navigate('/')
  }

  return (
    <>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12}>
          <Box component='div' className={classes.heading}>
            <Typography variant='h5'>{t('Lecturer information')}</Typography>
            <Box component='div' style={{ justifyContent: 'flex-end' }}>
              <Button
                sx={{ mr: 2 }}
                variant='contained'
                type='button'
                color='primary'
                onClick={handleOpenEditTeacher}
              >
                {t('Edit')}
              </Button>
              <Button variant='outlined' color='secondary' type='button' onClick={handleLogout}>
                {t('Signout')}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item container>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={4}>
              <Typography>{t('Full name')}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{`${lastName} ${firstName}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{t('Email')}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{t('Phone')}:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{phoneNumber}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Edit lecturer form */}
      <Dialog open={openEditTeacher} onClose={handleCloseEditTeacher} maxWidth='md' fullWidth>
        {detail && detail.teacher[0] && (
          <DialogContent>
            <EditTeacherFormManagement
              lecturer={detail.teacher[0]}
              handleClose={handleCloseEditTeacher}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}

export default LecturerInfo
