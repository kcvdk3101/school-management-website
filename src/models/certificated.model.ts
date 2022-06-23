import { Common } from './common'

export interface CertificatedModel extends Common {
  id: string
  name: string
  issueDate: string | Date
  organizer: string
}
