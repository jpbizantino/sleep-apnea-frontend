import { Choice } from './choice.type'
import { QuestionType } from '../enum/question.enum'
import { Rule } from './rule.type'

export interface Question {
  questionId: string
  question: string
  description: string
  order: number
  questionType: QuestionType
  imageLink: string
  choices: Choice[]
  rule: Rule
  active: boolean
}

export type QuestionFilter = Omit<
  Question,
  '_id' | 'choices' | 'questionType' | 'order' | 'images' | 'rule'
>
