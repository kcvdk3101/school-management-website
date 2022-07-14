import React from 'react'
import { Grid, Button, Checkbox, Typography, Paper } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { StudentModel } from '../../../../models/student.model'

type StudentNoteFormProps = {
  form: {
    internshipCertification: string
    internshipReport: string
    internshipFeedback: string
    internshipSurvey: string
  }
  student: StudentModel
  handleClose: () => void
  hanldeChangeStatusForm: (
    name:
      | 'internshipCertification'
      | 'internshipReport'
      | 'internshipFeedback'
      | 'internshipSurvey',
    value: string
  ) => void
  handleUpdateStudentInternshipForm: () => void
}

const useStyles = makeStyles({
  profile: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
  },
})

const StudentNoteForm: React.FC<StudentNoteFormProps> = ({
  form,
  student,
  handleClose,
  hanldeChangeStatusForm,
  handleUpdateStudentInternshipForm,
}) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.profile}>
          <Typography variant='body1'>{t('Receipt form')}</Typography>
          <Checkbox
            size='medium'
            // defaultChecked={student.internshipCertification}
            checked={form.internshipCertification === 'yes' ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              hanldeChangeStatusForm(
                'internshipCertification',
                event.target.checked === true ? 'yes' : 'no'
              )
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.profile}>
          <Typography>{t('Report form')}</Typography>
          <Checkbox
            size='medium'
            // defaultChecked={student.internshipReport}
            checked={form.internshipReport === 'yes' ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              hanldeChangeStatusForm(
                'internshipReport',
                event.target.checked === true ? 'yes' : 'no'
              )
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.profile}>
          <Typography>{t('Feedback form')}</Typography>
          <Checkbox
            size='medium'
            checked={form.internshipFeedback === 'yes' ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              hanldeChangeStatusForm(
                'internshipFeedback',
                event.target.checked === true ? 'yes' : 'no'
              )
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.profile}>
          <Typography>{t('Survey form')}</Typography>
          <Checkbox
            size='medium'
            checked={form.internshipSurvey === 'yes' ? true : false}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              hanldeChangeStatusForm(
                'internshipSurvey',
                event.target.checked === true ? 'yes' : 'no'
              )
            }
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Button type='button' variant='outlined' color='secondary' onClick={handleClose}>
          {t('Cancel')}
        </Button>
        <Button
          type='button'
          variant='contained'
          sx={{ ml: 1 }}
          onClick={handleUpdateStudentInternshipForm}
        >
          {t('Update')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default StudentNoteForm
