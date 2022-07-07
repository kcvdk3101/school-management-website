import { LinearProgress, Paper, Typography } from '@mui/material'
import * as React from 'react'
import { Pie } from 'react-chartjs-2'

type PieChartProps = {
  title: string
  fetching: boolean
  statusStudentReport: any
}

const PieChart: React.FC<PieChartProps> = ({ title, fetching, statusStudentReport }) => {
  return (
    <Paper style={{ padding: 12, height: '100%' }}>
      <Typography>{title}</Typography>
      {fetching ? (
        <LinearProgress color='secondary' />
      ) : (
        <>{Object.keys(statusStudentReport).length && <Pie data={statusStudentReport} />}</>
      )}
    </Paper>
  )
}

export default PieChart
