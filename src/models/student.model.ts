import { Common } from './common'
import { CVModel } from './cv.model'

export interface StudentModel extends Common {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  email?: string
  birthDate: string
  identityNumber: string
  address: string
  phoneNumber: string
  class: string
  term?: string
  status: string
  academicYear?: string
  nameTeacher?: string
  slug?: string
  internshipCertification?: string
  internshipGrade?: string
  internshipReport?: string
  cv?: CVModel[]
}
