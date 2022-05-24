import { Common } from './common.model'

export interface UserModel extends Common {
  id?: string
  firstName: string
  lastName: string
  fullName: string
  email?: string
  phoneNumber: string
  slug?: string
}
