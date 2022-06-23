import { JobModel } from '../../models/job.model'
import axiosCorporation from './axiosCorporation'

const url = 'corporation'

const jobApi = {
  getJobs(limit: number, offset: number) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `/job/all?limit=${limit}&offset=${offset}`
    )
  },

  getJobsByTitle(limit: number, offset: number, title: string) {
    return axiosCorporation.get<string, { data: JobModel[]; pagination: { total: number } }>(
      `/search/title?name=${title}&limit=${limit}&offset=${offset}`
    )
  },
}

export default jobApi
