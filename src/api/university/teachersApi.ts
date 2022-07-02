import { TeacherModel } from '../../models/teacher.model'
import axiosUniveristy from './axiosUniversity'

const url = 'university/teacher'

export interface EditTeacherData {
  firstName: string
  lastName: string
  email: string
  position: string
  department: string
  phoneNumber: string
}

const teachersApi = {
  saveTeachersExcelFile(form: FormData) {
    return axiosUniveristy.post<string, FormData>(`${url}/import`, form)
  },

  getAllTeachers(offset: number) {
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/all/pagination?limit=8&offset=${offset}`
    )
  },

  filterByCondition(offset: number, position: string, department: string, fullName: string) {
    console.log(position, department)
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/filter?limit=8&offset=${offset}&position=${position}&fullName=${fullName}&department=${department}`
    )
  },

  editInfoTeacher(id: string, data: EditTeacherData) {
    return axiosUniveristy.patch<string, TeacherModel>(`${url}?id=${id}`, data)
  },

  addNewTeacher(data: TeacherModel[]) {
    return axiosUniveristy.post<string, TeacherModel>(`${url}`, {
      teachers: data,
    })
  },
}

export default teachersApi
