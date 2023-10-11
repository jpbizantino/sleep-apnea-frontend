import { Question } from '../../common/types'

export interface Answer {
  questionId: string
  selectedDescription: string
  selectedValue: string
  question: Question
}
