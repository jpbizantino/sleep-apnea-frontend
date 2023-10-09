import { QuestionType } from '../../survey/enums/question.enum'
import { Choice } from '../../survey/entities/choice.entity'

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
