import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { ReactNode } from 'react'
import { CorporationModel } from '../../../../models/corporation.model'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FlagIcon from '@mui/icons-material/Flag'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import SourceIcon from '@mui/icons-material/Source'

type CorporationCardProps = {
  corporation: CorporationModel
}

type CorporationDetailProps = {
  icon: ReactNode
  content: string
}

const useStyles = makeStyles({
  detailContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const CorporationDetail: React.FC<CorporationDetailProps> = ({ icon, content }) => {
  const classes = useStyles()
  return (
    <Box className={classes.detailContainer}>
      {icon}
      <Typography sx={{ ml: 1 }}>{content}</Typography>
    </Box>
  )
}

const CorporationCard: React.FC<CorporationCardProps> = ({ corporation }) => {
  const classes = useStyles()

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }}>{corporation.name[0]}</Avatar>}
        title={corporation.name}
        subheader={corporation.email}
      />
      <CardContent>
        <CorporationDetail
          icon={<LocationOnIcon color='disabled' fontSize='small' />}
          content={`${corporation.location[0].district}, ${corporation.location[0].street}, ${corporation.location[0].country}`}
        />
        <Box className={classes.flexRow}>
          <CorporationDetail
            icon={<AccessTimeIcon color='disabled' fontSize='small' />}
            content={corporation.overtimeRequire}
          />
          <CorporationDetail
            icon={<FlagIcon color='disabled' fontSize='small' />}
            content={corporation.origin}
          />
        </Box>
        <Box className={classes.flexRow}>
          <CorporationDetail
            icon={<HeadphonesIcon color='disabled' fontSize='small' />}
            content={corporation.hotline}
          />
          <CorporationDetail
            icon={<SourceIcon color='disabled' fontSize='small' />}
            content={corporation.special}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CorporationCard
