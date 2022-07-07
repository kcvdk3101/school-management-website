import { Box, Grid, Chip, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ReportModel } from '../../../../models/report.model'

type ListChipReportProps = {
  fetching: boolean
  report: ReportModel
}

const useStyles = makeStyles({
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
})

const ListChipReport: React.FC<ListChipReportProps> = ({ fetching, report }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Box component='div' className={classes.innerContainer}>
      <Grid container spacing={1}>
        <Grid item>
          <Chip
            color='error'
            variant='filled'
            label={
              fetching
                ? t('Loading')
                : `${t("Haven't practiced")} (${
                    report.numberOfNotInternship === undefined ? 0 : report.numberOfNotInternship
                  })`
            }
          />
        </Grid>
        <Grid item>
          <Chip
            color='info'
            variant='filled'
            label={
              fetching
                ? t('Loading')
                : `${t('Practicing')} (${
                    report.numberOfInternship === undefined ? 0 : report.numberOfInternship
                  })`
            }
          />
        </Grid>
        <Grid item>
          <Chip
            color='success'
            variant='filled'
            label={
              fetching
                ? t('Loading')
                : `${t('Trained')} (${
                    report.numberOfCompletedInternship === undefined
                      ? 0
                      : report.numberOfCompletedInternship
                  })`
            }
          />
        </Grid>
        <Grid item>
          <Divider orientation='vertical' flexItem light={false} style={{ height: '100%' }} />
        </Grid>
        <Grid item>
          <Chip
            color='error'
            variant='filled'
            label={
              fetching
                ? t('Loading')
                : `${t('No lecturer')} (${
                    report.numberOfStudentHaveNotInstructor === undefined
                      ? 0
                      : report.numberOfStudentHaveNotInstructor
                  })`
            }
          />
        </Grid>
        <Grid item>
          <Chip
            color='success'
            variant='filled'
            label={
              fetching
                ? t('Loading')
                : `${t('Have lecturer')} (${
                    report.numberOfStudentHaveInstructor === undefined
                      ? 0
                      : report.numberOfStudentHaveInstructor
                  })`
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListChipReport
