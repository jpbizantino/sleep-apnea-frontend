import { Question } from '.'

export interface CalculatedField {
  calculatedFieldId: string
  questions: Question[]
  operator: string
  scoreToAdd: number
}
