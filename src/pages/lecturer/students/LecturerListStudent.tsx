import React, { useState } from 'react'
import { Grid, Typography, Box, Tabs, Tab } from '@mui/material'
import StundentAcceptedTable from '../../../components/tables/StundentAcceptedTable'
import StundentNotAcceptedTable from '../../../components/tables/StudentNotAcceptedTable'
import { useTranslation } from 'react-i18next'

const LecturerListStudent = () => {
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
            <Tab label={`${t('Accepted')} (3)`} />
            <Tab label={`${t('Not accepted yet')} (150)`} />
          </Tabs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {value === 0 ? <StundentAcceptedTable /> : <StundentNotAcceptedTable />}
      </Grid>
    </Grid>
  )
}

export default LecturerListStudent
