import { UserModel } from '../../models/user.model'
import axiosUser from './axiosUser'

const url = '/auth'

const userApi = {
  signin(email: string, password: string) {
    return axiosUser.post<string, { user: UserModel }>(`${url}/login`, { email, password })
  },
  signout() {
    return axiosUser.post<string, string>(`${url}/logout`)
  },
  authenticate() {
    return axiosUser.get<string, { user: UserModel }>(`${url}`)
  },
}

export default userApi
