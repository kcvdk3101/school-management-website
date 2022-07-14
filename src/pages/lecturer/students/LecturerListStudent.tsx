import { Box, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import StundentNotAcceptedTable from '../../../components/tables/StudentNotAcceptedTable'
import StundentAcceptedTable from '../../../components/tables/StudentAcceptedTable'
import { StudentModel } from '../../../models/student.model'

type LecturerListStudentProps = {
  listStudentAccepted: StudentModel[]
  listStudentWaitingAccepted: StudentModel[]
}

const LecturerListStudent: React.FC<LecturerListStudentProps> = ({
  listStudentAccepted,
  listStudentWaitingAccepted,
}) => {
  const { t } = useTranslation()
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Grid item container xs={12}>
      <Grid item>
        <Typography variant='h5'>{t('List students')}</Typography>
        <Box sx={{ my: 1 }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab
              label={`${t('Accepted')} (${
                listStudentAccepted && listStudentAccepted.length > 0
                  ? listStudentAccepted.length
                  : 0
              })`}
            />
            <Tab
              label={`${t('Not accepted yet')} (${
                listStudentWaitingAccepted && listStudentWaitingAccepted.length > 0
                  ? listStudentWaitingAccepted.length
                  : 0
              })`}
            />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {value === 0 ? (
          <>
            {listStudentAccepted && (
              <StundentAcceptedTable listStudentAccepted={listStudentAccepted} />
            )}
          </>
        ) : (
          <>
            {listStudentWaitingAccepted && (
              <StundentNotAcceptedTable listStudentWaitingAccepted={listStudentWaitingAccepted} />
            )}
          </>
        )}
      </Grid>
    </Grid>
  )
}

export default LecturerListStudent
