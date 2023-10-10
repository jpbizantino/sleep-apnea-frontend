import { Choice } from './choice.type'
import { QuestionType } from '../../survey/enums/question.enum'

export interface Question {
  _id: string
  question: string
  description: string
  order: number
  questionType: QuestionType
  images: string[]
  choices: Choice[]
}

export type QuestionFilter = Omit<
  Question,
  '_id' | 'choices' | 'questionType' | 'order' | 'images'
>
