import { Common } from './common'
import { TechnologyModel } from './technology.model'

export interface ProjectModel extends Common {
  id?: string
  projectName: string
  startDate: string | Date
  endDate: string | Date
  teamSize: string
  role: string
  responsibilities: string
  sourceLink: string
  description: string
  technology: TechnologyModel[]
}
