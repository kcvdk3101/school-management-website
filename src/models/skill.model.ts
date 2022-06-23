import { Common } from './common'

export interface Skill extends Common {
  id?: string
  name: string
  rating?: number
  slug?: string
}
