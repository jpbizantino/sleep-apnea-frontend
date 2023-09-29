import { Question } from '.'

export interface Answer {
  questionId: string
  selectedDescription: string
  selectedValue: string
  question: Question
}
