import { LecturerModel } from '../../models/lecturer.model'
import axiosUniveristy from './axiosUniversity'

const url = 'university'

export interface EditLecturerData {
  firstName: string
  lastName: string
  email: string
  position: string
  department: string
  phoneNumber: string
}

const lecturersApi = {
  saveLecturersExcelFile(form: FormData) {
    return axiosUniveristy.post<string, FormData>(`${url}/teacher/import`, form)
  },

  getAllLecturers(offset: number) {
    return axiosUniveristy.get<string, { data: LecturerModel[]; pagination: { total: number } }>(
      `${url}/teacher/all?limit=8&offset=${offset}`
    )
  },

  filterByCondition(offset: number, status: string, fullName: string) {
    return axiosUniveristy.get<string, { data: LecturerModel[]; pagination: { total: number } }>(
      `${url}/teacher/filter?limit=8&offset=${offset}&identityNumber=&position=&department=&status=${status}&fullName=${fullName}`
    )
  },

  editInfoLecturer(id: string, data: EditLecturerData) {
    return axiosUniveristy.patch<string, LecturerModel>(`${url}/teacher?id=${id}`, data)
  },

  addNewLecturer(data: LecturerModel[]) {
    return axiosUniveristy.post<string, LecturerModel>(`${url}/teacher`, {
      teachers: data,
    })
  },
}

export default lecturersApi
