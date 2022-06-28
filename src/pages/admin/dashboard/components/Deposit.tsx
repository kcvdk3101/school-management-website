import * as React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

type DepositsProps = {
  title: string
  total: number
}

const Deposits: React.FC<DepositsProps> = ({ title, total }) => {
  return (
    <React.Fragment>
      <Typography variant='body1'>{title}</Typography>
      <Typography component='p' variant='h4'>
        {total}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View more
        </Link>
      </div>
    </React.Fragment>
  )
}

export default Deposits
