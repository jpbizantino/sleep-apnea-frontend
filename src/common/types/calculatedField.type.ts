import { Question } from '.'
import { OperatorType } from '../enum/calculatedFiled.enus'

export interface CalculatedField {
  name: string
  calculatedFieldId: string
  questions: Question[]
  operator: OperatorType
  scoreToAdd: number
}
