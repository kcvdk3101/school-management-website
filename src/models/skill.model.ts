import { Common } from './common.model'

export interface Skill extends Common {
  id: string
  level: string
  name: string
  position: string
  slug: string
}
