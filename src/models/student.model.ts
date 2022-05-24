import { UserModel } from './user.model'

export interface StudentModel extends UserModel {
  identityNumber: string
  birthDate: string
  address: string
  class: string
  term?: string
  status: string
  academicYear?: string
}
