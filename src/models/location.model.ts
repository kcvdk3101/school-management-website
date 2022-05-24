import { Common } from './common.model'

export interface Location extends Common {
  id: string
  country: string
  city: string
  district: string
  ward: string
  street: string
  details: string
  slug: string
}
