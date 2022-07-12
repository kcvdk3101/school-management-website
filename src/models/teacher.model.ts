import { Common } from './common'
import { StudentModel } from './student.model'

export interface TeacherModel extends Common {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  position: string
  department: string
  email: string
  phoneNumber: string
  academicYear: string
  studentAmount: number
  maximumStudentAmount: number
  details?: {
    teacher: TeacherModel[]
    student: StudentModel[]
    studentWaitingAccepted: StudentModel[]
  }
  slug?: string
}
