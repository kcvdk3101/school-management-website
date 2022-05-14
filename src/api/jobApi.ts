import axios from 'axios'
import { API_CORPORATION_URL } from '../constants'
import { JobModel } from '../models'

const jobApi = {
  getJobs(limit: number, offset: number) {
    return axios.get<string, { data: { data: JobModel[]; pagination: { total: number } } }>(
      `${API_CORPORATION_URL}/job/all?limit=${limit}&offset=${offset}`
    )
  },

  getJobsByTitle(limit: number, offset: number, title: string) {
    return axios.get<string, { data: { data: JobModel[]; pagination: { total: number } } }>(
      `${API_CORPORATION_URL}/search/title?name=${title}&limit=${limit}&offset=${offset}`
    )
  },
}

export default jobApi
