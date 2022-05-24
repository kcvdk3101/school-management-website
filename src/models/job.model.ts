import { Common } from './common.model'
import { CorporationModel } from './corporation.model'
import { Location } from './location.model'
import { Salary } from './salary.model'
import { Skill } from './skill.model'

export interface Detail {
  corporation: CorporationModel[]
  location: Location[]
  salary: Salary[]
  skill: Skill[]
}

export interface JobModel extends Common {
  id: string
  title: string
  description: string
  dateCreated: string
  numberCandidate: number
  details: Detail
}
