import { API_BASE_URL } from '../constants/index'
import { StudentModel } from '../models'
import axiosClient from './axiosClien'

const url = 'university'

export interface EditStudentData {
  firstName: string
  lastName: string
  address: string
  birthDate: string
  phoneNumber: string
}

const studentsApi = {
  saveStudentsExcelFile(form: FormData) {
    return axiosClient.post<string, FormData>(`${API_BASE_URL}/${url}/import`, form)
  },

  getAllStudents(offset: number) {
    return axiosClient.get<string, { data: StudentModel[]; pagination: { total: number } }>(
      `${API_BASE_URL}/${url}/student/all?limit=8&offset=${offset}`
    )
  },

  editInfoStudent(id: string, data: EditStudentData) {
    return axiosClient.patch<string, StudentModel>(`${API_BASE_URL}/${url}/student?id=${id}`, data)
  },

  // getAllCouponsByCouponName(offset: number, couponName: string) {
  //   return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
  //     `${url}/name/details?couponName=${couponName}&limit=6&offset=${offset}`
  //   )
  // },

  // addNewCoupon(data: FormData) {
  //   return axiosClient.post<string, Coupon>(`${url}`, data)
  // },

  // deleteCouponById(id: string) {
  //   return axiosClient.delete<string, Coupon>(`${url}/remove?id=${id}`)
  // },
}

export default studentsApi
