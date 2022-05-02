export interface StudentModel {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  email?: string
  identityNumber: string
  birthDate: string
  address: string
  phoneNumber: string
  class: string
  term?: string
  status: string
  academicYear?: string
  slug?: string
  isActive?: boolean
  isRegistered?: boolean
  createdAt?: string
  updatedAt?: string
}
