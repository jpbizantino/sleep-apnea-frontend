import { GenericDictionary } from '../types'

export enum ProcessingRule {
  // DATA_AS_RECEIVED = 'DATA_AS_RECEIVED',
  LESS_THAN = 'LESS_THAN',
  EQUAL_OR_LESS_THAN = 'EQUAL_OR_LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  EQUAL_OR_GREATER_THAN = 'EQUAL_OR_GREATER_THAN',
  BETWEEN = 'BETWEEN',
  EQUAL = 'EQUAL',
}

export const translateProcessingRule = (input: string) => {
  return ruleTypeDictionary.find((p) => p.name == input)?.translation
}

export const ruleTypeDictionary: GenericDictionary[] = [
  { name: ProcessingRule.EQUAL, translation: '=' },
  { name: ProcessingRule.LESS_THAN, translation: '<' },
  { name: ProcessingRule.EQUAL_OR_LESS_THAN, translation: '< =' },
  { name: ProcessingRule.GREATER_THAN, translation: '>' },
  {
    name: ProcessingRule.EQUAL_OR_GREATER_THAN,
    translation: '> =',
  },
  { name: ProcessingRule.BETWEEN, translation: 'ENTRE' },
]
