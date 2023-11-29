import { GenericDictionary } from '../types'

export enum OperatorType {
  AND = 'AND',
  OR = 'OR',
}

export const operatorTypeDictionary: GenericDictionary[] = [
  { name: OperatorType.AND, translation: 'Y (AND)' },
  { name: OperatorType.OR, translation: ' O (OR)' },
]
