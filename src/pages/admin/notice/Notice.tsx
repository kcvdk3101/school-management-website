import { Box, Button, Dialog, Grid, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import Header from '../../../components/commons/Header'
import NewNoticeFormManagement from '../../../components/form/notice/new/NewNoticeFormManagement'
import { getAllPosts } from '../../../features/post/postSlice'
import NoticeCard from './components/NoticeCard'

type NoticeProps = {}

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
})

const Notice: React.FC<NoticeProps> = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { posts, fetchingPost } = useAppSelector((state) => state.posts)

  const [openNoticeForm, setOpenNoticeForm] = useState(false)
  const [value, setValue] = React.useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        await dispatch(getAllPosts())
      } catch (error) {
        toast.error('Cannot load data')
      }
    })()
  }, [dispatch])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleOpenNoticeForm = () => {
    setOpenNoticeForm(true)
  }

  const handleCloseNoticeForm = () => {
    setOpenNoticeForm(false)
  }

  return (
    <>
      <Helmet>
        <title>{t('Notice')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Notice' />

        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box component='div' style={{ marginBottom: 12 }} className={classes.innerContainer}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label={t('All')} />
                {/* <Tab label={t('Activated')} />
                <Tab label={t('Not activated')} /> */}
              </Tabs>
            </Box>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={handleOpenNoticeForm}
            >
              {t('Add new notice')}
            </Button>
          </Box>
          <Box style={{ marginTop: 16 }}>
            {fetchingPost ? (
              <Typography>Loading</Typography>
            ) : (
              <Grid container>
                {posts && posts.length > 0 ? (
                  <>
                    {posts.map((post, index) => (
                      <Grid item xs={3} key={index}>
                        <NoticeCard title={post.title} content={post.content} />
                      </Grid>
                    ))}
                  </>
                ) : (
                  <Grid item>
                    <Typography>Không có dữ liệu</Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>

      <Dialog open={openNoticeForm} maxWidth='sm' fullWidth>
        <NewNoticeFormManagement handleCloseNoticeForm={handleCloseNoticeForm} />
      </Dialog>
    </>
  )
}

export default Notice
