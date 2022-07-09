import { LinearProgress, Paper, Typography } from '@mui/material'
import { Bar } from 'react-chartjs-2'

type VerticalBarChartProps = {
  title: string
  corporationChart: any
  fetching: boolean
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
  title,
  corporationChart,
  fetching,
}) => {
  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography>{title}</Typography>
      {fetching ? (
        <LinearProgress color='secondary' />
      ) : (
        <>{Object.keys(corporationChart).length && <Bar data={corporationChart} />}</>
      )}
    </Paper>
  )
}

export default VerticalBarChart
