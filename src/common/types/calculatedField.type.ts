import { GroupedField, Question } from '.'
import { OperatorType } from '../enum/calculatedFiled.enus'

export interface CalculatedField {
  name: string
  calculatedFieldId: string
  questions: Question[]
  groupedFields: GroupedField[]
  operator: OperatorType
  scoreToAdd: number
}
