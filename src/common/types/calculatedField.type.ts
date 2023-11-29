import { Question } from '.'
import { OperatorType } from '../enum/calculatedFiled.enus'

export interface CalculatedField {
  calculatedFieldId: string
  questions: Question[]
  operator: OperatorType
  scoreToAdd: number
}
