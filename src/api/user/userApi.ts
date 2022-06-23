import axiosUser from './axiosUser'

const url = '/auth'

const userApi = {
  signin(email: string, password: string) {
    return axiosUser.post(`${url}/login`, { email, password })
  },
}

export default userApi
