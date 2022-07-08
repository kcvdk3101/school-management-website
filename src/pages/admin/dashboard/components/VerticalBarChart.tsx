import { Paper, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

type Props = {}

const VerticalBarChart = (props: Props) => {
  const { t } = useTranslation()

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: t('Corporation'),
        data: [166, 398, 931, 193, 624, 792, 166, 398, 931, 193, 624, 792],
        backgroundColor: red[400],
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
