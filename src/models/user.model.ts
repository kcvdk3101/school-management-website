import { StudentModel } from './student.model'

export interface UserModel {
  email: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  role?: string
  id: string
  studentId: string
  student?: StudentModel
}
