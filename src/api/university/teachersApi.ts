import { TeacherModel } from '../../models/teacher.model'
import axiosUniveristy from './axiosUniversity'

const url = 'university'

export interface EditTeacherData {
  firstName: string
  lastName: string
  email: string
  position: string
  department: string
  phoneNumber: string
}

const teachersApi = {
  saveLecturersExcelFile(form: FormData) {
    return axiosUniveristy.post<string, FormData>(`${url}/teacher/import`, form)
  },

  getAllLecturers(offset: number) {
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/teacher/all?limit=8&offset=${offset}`
    )
  },

  filterByCondition(offset: number, status: string, fullName: string) {
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/teacher/filter?limit=8&offset=${offset}&identityNumber=&position=&department=&status=${status}&fullName=${fullName}`
    )
  },

  editInfoLecturer(id: string, data: EditTeacherData) {
    return axiosUniveristy.patch<string, TeacherModel>(`${url}/teacher?id=${id}`, data)
  },

  addNewLecturer(data: TeacherModel[]) {
    return axiosUniveristy.post<string, TeacherModel>(`${url}/teacher`, {
      teachers: data,
    })
  },
}

export default teachersApi
