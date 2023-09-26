import { QuestionType } from '../enums/question.enum'
import { Choice } from './choice.entity'

export interface Question {
  _id: string
  question: string
  description: string
  order: number
  questionType: QuestionType
  images: string[]
  choices: Choice[]
}
