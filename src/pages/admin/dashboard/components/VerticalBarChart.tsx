import React from 'react'
import { Typography, Paper } from '@mui/material'

import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

type Props = {}

const VerticalBarChart = (props: Props) => {
  const { t } = useTranslation()

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

  const data = {
    labels,
    datasets: [
      {
        label: t('Corporation'),
        data: [166, 398, 931, 193, 624, 792, 726],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography>Corporation Report</Typography>
      <Bar data={data} />
    </Paper>
  )
}

export default VerticalBarChart
