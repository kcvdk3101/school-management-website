import { Common } from './common.model'
import { Location } from './location.model'

export interface CorporationModel extends Common {
  id: string
  name: string
  hotline: string
  email: string
  presenterId: string
  overtimeRequire: string
  special: string
  startWorkTime: string
  endWorkTime: string
  origin: string
  numberEmployees: number
  slug: string
  image: any[]
  location: Location[]
}
