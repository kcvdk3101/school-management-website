import { Box, Button, Typography, Menu, MenuItem } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { makeStyles } from '@mui/styles'
import teachersApi from '../../../../api/university/teachersApi'
import { toast } from 'react-toastify'

type FilterTeacherProps = {
  isLoading: boolean
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const useStyles = makeStyles({
  container: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 16,
  },
})

const FilterTeacher: React.FC<FilterTeacherProps> = ({ isLoading, setPage }) => {
  const { t } = useTranslation()
  let { search } = useLocation()
  const classes = useStyles()

  let navigate = useNavigate()
  let paginationQuery = queryString.parse(search)
  const academicYear = paginationQuery.academicYear ? +paginationQuery.academicYear : 0
  const position = paginationQuery.position ? (paginationQuery.position as string) : ''
  const department = paginationQuery.department ? (paginationQuery.department as string) : ''
  const fullName = paginationQuery.fullName ? (paginationQuery.fullName as string) : ''

  const [academicYearValue, setAcademicYearValue] = useState<number>(academicYear)
  const [positionValue, setPositionValue] = useState<string>('')
  const [departmentValue, setDepartmentValue] = useState<string>('')

  const [listPosition, setListPosition] = useState<{ position: string }[]>([])
  const [listDepartment, setListDepartment] = useState<{ department: string }[]>([])

  // const [anchorElAcademic, setAnchorElAcademic] = useState<null | HTMLElement>(null)
  const [anchorElPos, setAnchorElPos] = useState<null | HTMLElement>(null)
  const [anchorElDepartment, setAnchorElDepartment] = useState<null | HTMLElement>(null)

  // const openAcademic = Boolean(anchorElAcademic)
  const openPos = Boolean(anchorElPos)
  const openDepartment = Boolean(anchorElDepartment)

  useEffect(() => {
    ;(async () => {
      try {
        const listPosition = await teachersApi.getListPosition(academicYear)
        const listDepartment = await teachersApi.getListDepartment(academicYear)
        if (listDepartment.length > 0 && listPosition.length > 0) {
          setListDepartment(listDepartment)
          setListPosition(listPosition)
        }
      } catch (error) {
        toast.error('Cannot load department or position in current year')
      }
    })()
  }, [academicYear])

  // const handleClickAcedemicYear = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorElAcademic(event.currentTarget)
  // }
  const handleClickPosition = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPos(event.currentTarget)
  }
  const handleClickDepartment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElDepartment(event.currentTarget)
  }

  // const handleCloseAcademicYear = () => {
  //   setAnchorElAcademic(null)
  // }
  const handleClosePosition = () => {
    setAnchorElPos(null)
  }
  const handleCloseDepartment = () => {
    setAnchorElDepartment(null)
  }

  async function handleChangeFilterPosition(position: string) {
    setPage(0)
    if (position === 'all') {
      setPositionValue('')
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=&fullName=${fullName}&department=&academicYear=${academicYear}`,
      })
    } else {
      setPositionValue(position)
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}&academicYear=${academicYear}`,
      })
    }
  }

  async function handleChangeFilterDepartment(department: string) {
    setPage(0)
    if (department === 'all') {
      setDepartmentValue('')
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=&academicYear=${academicYear}`,
      })
    } else {
      setDepartmentValue(department)
      navigate({
        pathname: '/admin/teachers',
        search: `?limit=8&offset=0&position=${position}&fullName=${fullName}&department=${department}&academicYear=${academicYear}`,
      })
    }
  }

  return (
    <Box className={classes.container}>
      <Typography style={{ marginRight: 8 }}>{t('Search by')}:</Typography>
      <Box>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          // onClick={handleClickAcedemicYear}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Academic year')} ${
            academicYearValue !== 0 ? ':' : ''
          } ${academicYearValue !== 0 ? academicYearValue : ''}`}</Typography>
        </Button>
        <Button
          style={{ marginRight: 8 }}
          variant='contained'
          size='small'
          onClick={handleClickPosition}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Position')} ${positionValue !== '' ? ':' : ''} ${
            positionValue !== '' ? positionValue : ''
          }`}</Typography>
        </Button>
        <Button
          variant='contained'
          size='small'
          onClick={handleClickDepartment}
          disabled={isLoading}
        >
          <Typography variant='body2'>{`${t('Department')} ${departmentValue !== '' ? ':' : ''} ${
            departmentValue !== '' ? departmentValue : ''
          }`}</Typography>
        </Button>
      </Box>

      <Menu
        anchorEl={anchorElPos}
        open={openPos}
        onClose={handleClosePosition}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterPosition('all')}>{t('All')}</MenuItem>
        {listPosition &&
          listPosition.map((p, idx) => (
            <MenuItem key={idx} onClick={() => handleChangeFilterPosition(p.position)}>
              {p.position}
            </MenuItem>
          ))}
      </Menu>
      <Menu
        anchorEl={anchorElDepartment}
        open={openDepartment}
        onClose={handleCloseDepartment}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleChangeFilterDepartment('all')}>{t('All')}</MenuItem>
        {listDepartment &&
          listDepartment.map((d, idx) => (
            <MenuItem key={idx} onClick={() => handleChangeFilterDepartment(d.department)}>
              {d.department}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default FilterTeacher
