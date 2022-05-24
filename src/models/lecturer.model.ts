import { UserModel } from './user.model'

export interface LecturerModel extends UserModel {
  position: string
  department: string
}
