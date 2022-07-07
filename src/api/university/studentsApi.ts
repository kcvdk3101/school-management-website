import { ReportModel } from '../../models/report.model'
import { StudentModel } from '../../models/student.model'
import axiosUniveristy from './axiosUniversity'

const url = '/university/student'

export interface EditStudentData {
  firstName: string
  lastName: string
  address: string
  birthDate: string
  phoneNumber: string
  status: string
  class: string
}

const studentsApi = {
  saveStudentsExcelFile(form: FormData) {
    return axiosUniveristy.post<string, FormData>(`${url}/import`, form)
  },

  generateStudentAccount(academicYear: number) {
    return axiosUniveristy.get<string, { message: string; status: number }>(
      `${url}/generate-account?academicYear=${academicYear}`
    )
  },

  getAllStudents(offset: number, academicYear: number) {
    return axiosUniveristy.get<string, { data: StudentModel[]; pagination: { total: number } }>(
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
    return axiosUniveristy.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${url}/filter?limit=10&offset=${offset}&identityNumber=&status=${status}&fullName=${fullName}&term=${term}&academicYear=${academicYear}&nameTeacher=${nameTeacher}`
    )
  },

  editInfoStudent(id: string, data: EditStudentData) {
    return axiosUniveristy.patch<string, StudentModel>(`${url}?id=${id}`, data)
  },

  addNewStudent(data: StudentModel[]) {
    return axiosUniveristy.post<string, StudentModel>(`${url}`, {
      students: data,
    })
  },

  getListIdentityNumber(academicYear: number) {
    return axiosUniveristy.get<string, { MSSV: string }[]>(
      `${url}/IdentityNumber?academicYear=${academicYear}`
    )
  },

  getListTerm(academicYear: number) {
    return axiosUniveristy.get<string, { Term: string }[]>(
      `${url}/term?academicYear=${academicYear}`
    )
  },

  getListClass(academicYear: number) {
    return axiosUniveristy.get<string, { class: string }[]>(
      `${url}/class?academicYear=${academicYear}`
    )
  },

  reportTotalStudent(academicYear: number) {
    return axiosUniveristy.get<string, { report: ReportModel }>(
      `/university/studentReport?academicYear=${academicYear}`
    )
  },
}

export default studentsApi
