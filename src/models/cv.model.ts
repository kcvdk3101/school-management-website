import { CertificatedModel } from './certificated.model'
import { Common } from './common'
import { ContactModel } from './contact.model'
import { ProjectModel } from './project.model'
import { Skill } from './skill.model'
import { StudentModel } from './student.model'

export interface CVModel extends Common {
  id?: string
  name: string
  studentName: string
  position: string
  content: string
  slug?: string
  images?: string[]
  details: {
    student: StudentModel[]
    contacts: ContactModel[]
    skills: Skill[]
    certificated: CertificatedModel[]
    project: ProjectModel[]
  }
}
