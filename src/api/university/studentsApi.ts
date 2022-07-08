import { ReportModel } from '../../models/report.model'
import { StudentModel } from '../../models/student.model'
import axiosUniversity from './axiosUniversity'

const url = '/university/student'

export interface EditStudentData {
  firstName: string
  lastName: string
  address: string
  birthDate: string
  phoneNumber: string
  status: string
  class: string
  internshipFirstGrade: number
  internshipSecondGrade: number
  internshipThirdGrade: number
}

export interface UpdateStudentFormResquest {
  internshipCertification: string
  internshipReport: string
  internshipFeedback: string
  internshipSurvey: string
}

type UpdateStudentFormResponse = {
  studentId: string
  internshipCertification: boolean
  internshipReport: boolean
  internshipFeedback: boolean
  internshipSurvey: boolean
  message: string
}

const studentsApi = {
  saveStudentsExcelFile(form: FormData) {
    return axiosUniversity.post<string, FormData>(`${url}/import`, form)
  },

  generateStudentAccount(academicYear: number) {
    return axiosUniversity.get<string, { message: string; status: number }>(
      `${url}/generate-account?academicYear=${academicYear}`
    )
  },

  getAllStudents(offset: number, academicYear: number) {
    return axiosUniversity.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${url}/all?limit=10&offset=${offset}&academicYear=${academicYear}`
    )
  },

  filterByCondition(
    offset: number,
    status: string,
    fullName: string,
    term: string,
    academicYear: number,
    nameTeacher: string
  ) {
    return axiosUniversity.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${url}/filter?limit=10&offset=${offset}&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`
    )
  },

  editInfoStudent(id: string, data: EditStudentData) {
    return axiosUniversity.patch<string, StudentModel>(`${url}?id=${id}`, data)
  },

  addNewStudent(data: StudentModel[]) {
    return axiosUniversity.post<string, StudentModel>(`${url}`, {
      students: data,
    })
  },

  getListIdentityNumber(academicYear: number) {
    return axiosUniversity.get<string, { MSSV: string }[]>(
      `${url}/IdentityNumber?academicYear=${academicYear}`
    )
  },

  getListTerm(academicYear: number) {
    return axiosUniversity.get<string, { Term: string }[]>(
      `${url}/term?academicYear=${academicYear}`
    )
  },

  getListClass(academicYear: number) {
    return axiosUniversity.get<string, { class: string }[]>(
      `${url}/class?academicYear=${academicYear}`
    )
  },

  reportTotalStudent(academicYear: number) {
    return axiosUniversity.get<string, { report: ReportModel }>(
      `/university/studentReport?academicYear=${academicYear}`
    )
  },

  updateStudentInternshipForm(studentId: string, form: UpdateStudentFormResquest) {
    return axiosUniversity.patch<string, UpdateStudentFormResponse>(
      `${url}/internship-update?studentId=${studentId}`,
      { ...form }
    )
  },
}

export default studentsApi
