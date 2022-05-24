import { Common } from './common.model'

export interface Salary extends Common {
  gt: number
  id: string
  lt: number
  unit: string
}
