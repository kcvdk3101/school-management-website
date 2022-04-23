export interface Detail {}

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
