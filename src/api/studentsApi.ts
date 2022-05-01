import { API_BASE_URL } from '../constants/index'
import { StudentModel } from '../models'
import axiosClient from './axiosClient'

const url = 'university'

export interface EditStudentData {
  firstName: string
  lastName: string
  address: string
  birthDate: string
  phoneNumber: string
}

const studentsApi = {
  saveStudentsExcelFile(form: FormData) {
    return axiosClient.post<string, FormData>(`${API_BASE_URL}/${url}/import`, form)
  },

  getAllStudents(offset: number) {
    return axiosClient.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${API_BASE_URL}/${url}/student/all?limit=8&offset=${offset}`
    )
  },

  filterByCondition(offset: number, status: string, fullName: string) {
    return axiosClient.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${API_BASE_URL}/${url}/student/filter?limit=8&offset=${offset}&identityNumber=&status=${status}&fullName=${fullName}&firstName=&lastName=`
    )
  },

  editInfoStudent(id: string, data: EditStudentData) {
    return axiosClient.patch<string, StudentModel>(`${API_BASE_URL}/${url}/student?id=${id}`, data)
  },

  addNewStudent(data: StudentModel[]) {
    return axiosClient.post<string, StudentModel[]>(`${API_BASE_URL}/${url}/student`, {
      students: data,
    })
  },
}

export default studentsApi
