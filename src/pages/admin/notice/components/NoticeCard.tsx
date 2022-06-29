import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

type NoticeCardProps = {
  title: string
  content: string
}

const NoticeCard: React.FC<NoticeCardProps> = ({ title, content }) => {
  return (
    <Card sx={{ marginRight: 2, height: '100%' }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {title}
        </Typography>
        <Typography variant='body2'>{content}</Typography>
      </CardContent>
    </Card>
  )
}

export default NoticeCard
