import {
  Box,
  Button,
  Grid,
  Card,
  Toolbar,
  Typography,
  CardActions,
  CardContent,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Header from '../../../components/commons/Header'
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})

const Notice: React.FC<NoticeProps> = () => {
  const classes = useStyles()

  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Notice')}</title>
      </Helmet>

      <Box sx={{ display: 'flex' }}>
        <Header title='Notice' />

        <Box component='main' className={classes.container}>
          <Toolbar />
          <Box component='div' style={{ marginBottom: 12 }}>
            <Button variant='contained' color='secondary' type='button' onClick={() => {}}>
              {t('Add new notice')}
            </Button>
          </Box>
          <Box className={classes.innerContainer}>
            <Grid container>
              <Grid item xs={3}>
                <NoticeCard
                  title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
                  content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
                />
              </Grid>
              <Grid item xs={3}>
                <NoticeCard
                  title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
                  content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
                />
              </Grid>
              <Grid item xs={3}>
                <NoticeCard
                  title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
                  content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
                />
              </Grid>
              <Grid item xs={3}>
                <NoticeCard
                  title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
                  content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Notice
