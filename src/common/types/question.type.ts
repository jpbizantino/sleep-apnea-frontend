import { Choice } from './choice.type'
import { QuestionType } from '../enum/question.enum'
import { Rule } from './rule.type'

export interface Question {
  _id: string
  question: string
  description: string
  order: number
  questionType: QuestionType
  images: string[]
  choices: Choice[]
  rule: Rule
}

export type QuestionFilter = Omit<
  Question,
  '_id' | 'choices' | 'questionType' | 'order' | 'images'
>
