import { StudentModel } from './student.model'
import { TeacherModel } from './teacher.model'

export interface UserModel {
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  role?: string
  id: string
  studentId?: string
  teacherId?: string
  student?: StudentModel
  detail?: {
    teacher: TeacherModel[]
  }
  token?: string
}
