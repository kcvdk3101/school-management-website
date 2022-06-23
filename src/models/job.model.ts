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

export interface JobModel {
  id: string
  title: string
  description: string
  dateCreated: string
  numberCandidate: number
  isActive: boolean
  isRegistered: boolean
  createdAt: string
  updatedAt: string
  details: Detail
}
