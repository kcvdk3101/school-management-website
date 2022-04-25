import axios from 'axios'
import { API_CORPORATION_URL } from '../constants'
import { JobModel } from '../models'

const url = 'job'

const jobApi = {
  getJobsByCondition(limit: number, offset: number) {
    return axios.get<string, { data: { data: JobModel[]; pagination: { total: number } } }>(
      `${API_CORPORATION_URL}/${url}/all?limit=${limit}&offset=${offset}`
    )
  },
}

export default jobApi
