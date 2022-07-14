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
        <Grid item container spacing={3}>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>{t('Last name')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{lastName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{t('First name')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{firstName}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>{t('Email')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{email}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{t('Phone')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{phoneNumber}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={3}>
              <Typography>{t('Position')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{detail?.teacher[0].position}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>{t('Department')}:</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography fontWeight={600}>{detail?.teacher[0].department}</Typography>
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
