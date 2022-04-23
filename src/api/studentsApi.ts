import axios from 'axios'
// import { API_BASE_URL } from '../helpers/configs'
import axiosClient from './axiosClient'

const url = 'students'

const studentsApi = {
  saveStudentsExcelFile(form: FormData) {
    return axiosClient.post<string, FormData>(`http://localhost/${url}`, form)
  },

  // getAllCouponsByCouponName(offset: number, couponName: string) {
  //   return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
  //     `${url}/name/details?couponName=${couponName}&limit=6&offset=${offset}`
  //   )
  // },

  // addNewCoupon(data: FormData) {
  //   return axiosClient.post<string, Coupon>(`${url}`, data)
  // },

  // updateCouponStatus(id: string | undefined) {
  //   return axiosClient.patch<string, Coupon>(`${url}/status?id=${id}`)
  // },

  // deleteCouponById(id: string) {
  //   return axiosClient.delete<string, Coupon>(`${url}/remove?id=${id}`)
  // },
}

export default studentsApi
