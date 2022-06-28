import axiosUser from './axiosUser'

type Admin = {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: string
  id: string
}

const url = '/auth'

const userApi = {
  signin(email: string, password: string) {
    return axiosUser.post<string, { user: Admin }>(`${url}/login`, { email, password })
  },
  signout() {
    return axiosUser.post<string, string>(`${url}/logout`)
  },
}

export default userApi
