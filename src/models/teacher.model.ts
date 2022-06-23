import { Common } from './common'

export interface TeacherModel extends Common {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  position: string
  department: string
  email: string
  phoneNumber: string
  studentAmount: number
  maximumStudentAmount: number
  slug?: string
}
