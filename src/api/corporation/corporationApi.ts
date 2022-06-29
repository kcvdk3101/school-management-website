import { CorporationModel } from '../../models/corporation.model'
import axiosCorporation from './axiosCorporation'

const url = 'corporation'

const corporationApi = {
  getAllCorporations(limit: number, offset: number) {
    return axiosCorporation.get<
      string,
      { data: CorporationModel[]; pagination: { total: number } }
    >(`${url}/all?limit=${limit}&offset=${offset}`)
  },
}

export default corporationApi
