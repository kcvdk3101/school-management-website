import { StudentModel } from '../../models/student.model'
import axiosUniveristy from './axiosUniversity'

const url = '/university'

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
    return axiosUniveristy.post<string, FormData>(`${url}/student/import`, form)
  },

  generateStudentAccount() {
    return axiosUniveristy.get<string, { students: StudentModel[] }>(
      `${url}/student/generate-account`
    )
  },

  getAllStudents(offset: number) {
    return axiosUniveristy.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${url}/student/all?limit=8&offset=${offset}`
    )
  },

  filterByCondition(offset: number, status: string, fullName: string) {
    return axiosUniveristy.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${url}/student/filter?limit=8&offset=${offset}&identityNumber=&status=${status}&fullName=${fullName}`
    )
  },

  editInfoStudent(id: string, data: EditStudentData) {
    return axiosUniveristy.patch<string, StudentModel>(`${url}/student?id=${id}`, data)
  },

  addNewStudent(data: StudentModel[]) {
    return axiosUniveristy.post<string, StudentModel>(`${url}/student`, {
      students: data,
    })
  },
}

export default studentsApi
