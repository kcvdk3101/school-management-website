import { Box, Button, Card, Toolbar, Typography, CardActions, CardContent } from '@mui/material'
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
          <Box component='div' className={classes.innerContainer}>
            {/* <Box component='div'>
              <label htmlFor='button-file'>
                <Input
                  accept='*.xlsx'
                  id='button-file'
                  multiple
                  type='file'
                  onChange={handleOnChange}
                />
                <Button variant='contained' color='secondary' component='span'>
                  <UploadFileIcon />
                </Button>
              </label>
              <Button
                variant='contained'
                color='info'
                component='span'
                sx={{ ml: 1 }}
                disabled={selectedFile === undefined || isLoading}
                onClick={saveExcelFile}
              >
                {isLoading ? <CircularProgress size={24} /> : <SaveIcon />}
              </Button>
              {selectedFile && nameFile && (
                <Typography
                  component='span'
                  sx={{
                    ml: 1,
                    textAlign: 'center',
                  }}
                >
                  {nameFile}
                </Typography>
              )}
            </Box> */}
            <Box component='div'>
              <Button variant='contained' color='secondary' type='button' onClick={() => {}}>
                {t('Add new notice')}
              </Button>
            </Box>
          </Box>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <NoticeCard
              title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
              content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
            />
            <NoticeCard
              title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
              content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
            />
            <NoticeCard
              title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
              content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
            />
            <NoticeCard
              title='HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ!'
              content='"HUFLIT JOB FAIR 2022 – SỰ KIỆN HUFLITERS KHÔNG THỂ BỎ LỠ! \n Thời gian & địa điểm : 7:30 – 15:30 ngày 21/5/2022 tại 828 Sư Vạn Hạnh P.13 Q.10 \n Hoạt động ngày hội: talkshow về môi trường và cơ hội nghề nghiệp, giao lưu và học hỏi kinh nghiệm từ các cựu sinh viên HUFLIT thành đạt, gặp gỡ với hơn 30 doanh nghiệp đồng hành, nộp hồ sơ ứng tuyển, tham gia phỏng vấn thật – việc thật, giao lưu cùng ca sĩ DatKaa'
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Notice
