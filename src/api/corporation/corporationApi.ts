import { CorporationModel } from '../../models/corporation.model'
import { ReportCorporationModel } from '../../models/report.corporation.model'
import axiosCorporation from './axiosCorporation'

const url = '/corporation'

const corporationApi = {
  getAllCorporations(limit: number, offset: number) {
    return axiosCorporation.get<
      string,
      { data: CorporationModel[]; pagination: { total: number } }
    >(`${url}/all?limit=${limit}&offset=${offset}`)
  },

  activateCorporation(corpId: string) {
    return axiosCorporation.patch<string, CorporationModel>(`${url}/activate?id=${corpId}`)
  },

  getCorporationReport(academicYear: number) {
    return axiosCorporation.get<
      string,
      {
        report: ReportCorporationModel[]
        totalCorporation: number
        numberOfActiveCorporation: number
        numberOfInActiveCorporation: number
      }
    >(`${url}/report?academicYear=${academicYear}`)
  },
}

export default corporationApi
