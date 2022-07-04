import LocationOnIcon from '@mui/icons-material/LocationOn'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import { red } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'
import React, { ReactNode, useState } from 'react'
import { CorporationModel } from '../../../../models/corporation.model'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import FlagIcon from '@mui/icons-material/Flag'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import SourceIcon from '@mui/icons-material/Source'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import corporationApi from '../../../../api/corporation/corporationApi'

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
  },
})

const CorporationDetail: React.FC<CorporationDetailProps> = ({ icon, content }) => {
  const classes = useStyles()
  return (
    <Box className={classes.detailContainer}>
      {icon}
      <Typography variant='body1' sx={{ ml: 1 }}>
        {content}
      </Typography>
    </Box>
  )
}

const CorporationCard: React.FC<CorporationCardProps> = ({ corporation }) => {
  const { t } = useTranslation()
  let { search } = useLocation()

  let paginationQuery = queryString.parse(search)
  const limit = paginationQuery.limit ? +paginationQuery.limit : 0
  const offset = paginationQuery.offset ? +paginationQuery.offset : 0

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const activateAccount = async () => {
    try {
      await corporationApi.activateCorporation(corporation.id)
    } catch (error) {
      toast.error('Cannot accept this corporation')
    } finally {
      handleClose()
    }
  }

  return (
    <>
      <Card style={{ minHeight: 200, maxHeight: 280, minWidth: 300 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>{corporation.name[0]}</Avatar>}
          title={corporation.name}
          subheader={corporation.email}
        />
        <CardContent>
          <Grid container rowSpacing={1}>
            <Grid item xs={12}>
              <CorporationDetail
                icon={<LocationOnIcon color='disabled' fontSize='small' />}
                content={`${corporation.location[0].district}, ${corporation.location[0].street}, ${corporation.location[0].country}`}
              />
            </Grid>
            <Grid item xs={6}>
              <CorporationDetail
                icon={<AccessTimeIcon color='disabled' fontSize='small' />}
                content={corporation.overtimeRequire}
              />
            </Grid>
            <Grid item xs={6}>
              <CorporationDetail
                icon={<FlagIcon color='disabled' fontSize='small' />}
                content={corporation.origin}
              />
            </Grid>
            <Grid item xs={6}>
              <CorporationDetail
                icon={<HeadphonesIcon color='disabled' fontSize='small' />}
                content={corporation.hotline}
              />
            </Grid>
            <Grid item xs={6}>
              <CorporationDetail
                icon={<SourceIcon color='disabled' fontSize='small' />}
                content={corporation.special}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            disabled={corporation.isActive}
            onClick={handleClickOpen}
            style={{ marginLeft: 8 }}
          >
            <Typography variant='body2'>
              {corporation.isActive ? `${t('Deactivate')}` : `${t('Accept')}`}
            </Typography>
          </Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('Accept corporation')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('Accept corporation content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' onClick={handleClose}>
            {t('Close')}
          </Button>
          <Button variant='contained' color='primary' onClick={activateAccount} autoFocus>
            {t('Accept')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CorporationCard
