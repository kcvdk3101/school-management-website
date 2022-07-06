import * as React from 'react'
import { Typography, Paper } from '@mui/material'
import { Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

type PieChartProps = {
  report: number[]
}

const PieChart: React.FC<PieChartProps> = ({ report }) => {
  const { t } = useTranslation()

  const data = {
    labels: [t("Haven't practiced"), t('Practicing'), t('Trained')],
    datasets: [
      {
        label: '# of Votes',
        data: report,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography>Student Report</Typography>
      <Pie data={data} />
    </Paper>
  )
}

export default PieChart
