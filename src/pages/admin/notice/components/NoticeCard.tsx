import { Card, CardContent, Typography, CardActions, Button } from '@mui/material'
import React from 'react'

type NoticeCardProps = {
  title: string
  content: string
}

const NoticeCard: React.FC<NoticeCardProps> = ({ title, content }) => {
  return (
    <Card sx={{ maxWidth: 325, marginRight: 2 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {title}
        </Typography>
        <Typography variant='body2'>{content}</Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>View More</Button>
      </CardActions>
    </Card>
  )
}

export default NoticeCard
