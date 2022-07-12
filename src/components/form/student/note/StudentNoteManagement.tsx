import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useAppDispatch } from '../../../../app/hooks'
import { editInfoStudent, updateInternshipForm } from '../../../../features/student/studentsSlice'
import { StudentModel } from '../../../../models/student.model'
import StudentNoteForm from './StudentNoteForm'

type StudentNoteManagementProps = {
  student: StudentModel
  handleClose: () => void
}

const StudentNoteManagement: React.FC<StudentNoteManagementProps> = ({ student, handleClose }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    internshipCertification: student.internshipCertification ? 'yes' : 'no',
    internshipReport: student.internshipReport ? 'yes' : 'no',
    internshipFeedback: student.internshipFeedback ? 'yes' : 'no',
    internshipSurvey: student.internshipSurvey ? 'yes' : 'no',
  })

  const hanldeChangeStatusForm = (
    name:
      | 'internshipCertification'
      | 'internshipReport'
      | 'internshipFeedback'
      | 'internshipSurvey',
    value: string
  ) => {
    setForm({ ...form, [name]: value })
  }

  const handleUpdateStudentInternshipForm = async () => {
    try {
      const response: any = await dispatch(
        updateInternshipForm({ studentId: student.id as string, form })
      )
      if (response.meta.requestStatus === 'fulfilled') {
        await dispatch(
          editInfoStudent({
            id: student.id as string,
            data: {
              firstName: student.firstName,
              lastName: student.lastName,
              address: student.address,
              birthDate: student.birthDate,
              phoneNumber: student.phoneNumber,
              status: form.internshipCertification === 'yes' ? 'Đang thực tập' : 'Chưa thực tập',
              class: student.class,
              internshipFirstGrade:
                student.internshipFirstGrade === undefined ? 0 : student.internshipFirstGrade,
              internshipSecondGrade:
                student.internshipSecondGrade === undefined ? 0 : student.internshipSecondGrade,
              internshipThirdGrade:
                student.internshipThirdGrade === undefined ? 0 : student.internshipThirdGrade,
            },
          })
        )
        toast.success(response.payload.message as string)
      }
    } catch (error) {
      toast.error('Cannot update student internship form')
    } finally {
      handleClose()
    }
  }

  return (
    <Box>
      <Typography variant='h5' sx={{ mb: 2 }}>
        {t('Profile sheet')}
      </Typography>
      <form>
        <StudentNoteForm
          form={form}
          student={student}
          handleClose={handleClose}
          hanldeChangeStatusForm={hanldeChangeStatusForm}
          handleUpdateStudentInternshipForm={handleUpdateStudentInternshipForm}
        />
      </form>
    </Box>
  )
}

export default StudentNoteManagement
