import { GenericDictionary } from '../types'

export enum OperatorType {
  AND = 'AND',
  OR = 'OR',
}

export const logicalOperatorTypeDictionary: GenericDictionary[] = [
  { name: OperatorType.AND, translation: 'Y (AND)' },
  { name: OperatorType.OR, translation: ' O (OR)' },
]
