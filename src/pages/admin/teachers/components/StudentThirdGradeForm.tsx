import { Grid, TextField } from '@mui/material'
import React from 'react'

type StudentThirdGradeFormProps = {}

const StudentThirdGradeForm: React.FC<StudentThirdGradeFormProps> = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {/* <TextField
          label={t('Third grade')}
          fullWidth
          type='number'
          disabled={true}
          defaultValue={student.internshipThirdGrade}
          {...register('internshipThirdGrade')}
          error={Boolean(errors.internshipThirdGrade)}
          helperText={t(
            `${errors.internshipThirdGrade?.message ? errors.internshipFirstGrade?.message : ''}`
          )}
        /> */}
      </Grid>
    </Grid>
  )
}

export default StudentThirdGradeForm
