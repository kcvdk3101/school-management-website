import { StudentModel } from '../../models/student.model'
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
  maximumStudentAmount: number
}

const teachersApi = {
  saveTeachersExcelFile(form: FormData) {
    return axiosUniveristy.post<string, FormData>(`${url}/import`, form)
  },

  generateTeacherAccount(academicYear: number) {
    return axiosUniveristy.get<string, { message: string; status: number }>(
      `${url}/generate-account?academicYear=${academicYear}`
    )
  },

  getAllTeachers(offset: number, academicYear: number) {
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/all/pagination?limit=8&offset=${offset}&academicYear=${academicYear}`
    )
  },

  getAllTeachersNoPagination(academicYear: number) {
    return axiosUniveristy.get<string, { data: TeacherModel[] }>(`${url}/all?academicYear=2022`)
  },

  getTeacherById(teacherId: string) {
    return axiosUniveristy.get<string, { teacher: TeacherModel[]; student: StudentModel[] }>(
      `${url}?id=${teacherId}`
    )
  },

  filterByCondition(
    offset: number,
    position: string,
    department: string,
    fullName: string,
    academicYear: number
  ) {
    return axiosUniveristy.get<string, { data: TeacherModel[]; pagination: { total: number } }>(
      `${url}/filter?limit=8&offset=${offset}&position=${position}&fullName=${fullName}&department=${department}&academicYear=${academicYear}`
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

  getListTeacherFullname(academicYear: number) {
    return axiosUniveristy.get<string, { fullName: string }[]>(
      `${url}/fullName?academicYear=${academicYear}`
    )
  },

  getListDepartment(academicYear: number) {
    return axiosUniveristy.get<string, { department: string }[]>(
      `${url}/department?academicYear=${academicYear}`
    )
  },

  getListPosition(academicYear: number) {
    return axiosUniveristy.get<string, { position: string }[]>(
      `${url}/position?academicYear=${academicYear}`
    )
  },
}

export default teachersApi
