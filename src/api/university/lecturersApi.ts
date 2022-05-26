import { LecturerModel } from '../../models/lecturer.model'
import axiosUniveristy from './axiosUniversity'

const url = 'university'

// export interface EditStudentData {
//   firstName: string
//   lastName: string
//   address: string
//   birthDate: string
//   phoneNumber: string
//   status: string
//   class: string
// }

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

  // editInfoStudent(id: string, data: EditStudentData) {
  //   return axiosUniveristy.patch<string, LecturerModel>(`${url}/teacher?id=${id}`, data)
  // },

  addNewStudent(data: LecturerModel[]) {
    return axiosUniveristy.post<string, LecturerModel[]>(`${url}/student`, {
      students: data,
    })
  },
}

export default lecturersApi
