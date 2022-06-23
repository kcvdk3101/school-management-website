import { Common } from './common'

export interface SubReview extends Common {
  content: string
  rating: number
}

export interface Review extends Common {
  id?: string
  title: string
  comment: string
  isRecommendable?: string
  rating?: number
  subReview: SubReview[]
}
