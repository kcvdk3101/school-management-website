import { Box, Button, Dialog, DialogContent, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSelector } from '../../../app/hooks'
import EditTeacherFormManagement from '../../../components/form/teacher/edit/EditTeacherFormManagement'

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

  return (
    <>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12}>
          <Box component='div' className={classes.heading}>
            <Typography variant='h5'>Thông tin Giảng viên hướng dẫn</Typography>
            <Box component='div' style={{ justifyContent: 'flex-end' }}>
              <Button
                sx={{ mr: 2 }}
                variant='contained'
                type='button'
                color='primary'
                // disabled={isLoading}
                onClick={handleOpenEditTeacher}
              >
                {t('Edit')}
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                type='button'
                // onClick={handleOpenNewStudent}
                // disabled={isLoading}
              >
                {t('Signout')}
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item container>
          <Grid item container xs={12} spacing={3}>
            <Grid item xs={4}>
              <Typography>Fullname:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{`${lastName} ${firstName}`}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Email:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{email}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>Phone number:</Typography>
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
