import { GenericDictionary } from '../types'

export enum ProcessingRule {
  DATA_AS_RECEIVED = 'DATA_AS_RECEIVED',
  LESS_THAN = 'LESS_THAN',
  IQUAL_OR_LESS_THAN = 'IQUAL_OR_LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  IQUAL_OR_GREATER_THAN = 'IQUAL_OR_GREATER_THAN',
  BETWEEN = 'BETWEEN',
}

export const translateProcessingRule = (input: string) => {
  return ruleTypeDictionary.find((p) => p.name == input)?.translation
}

export const ruleTypeDictionary: GenericDictionary[] = [
  { name: ProcessingRule.DATA_AS_RECEIVED, translation: '=' },
  { name: ProcessingRule.LESS_THAN, translation: '<' },
  { name: ProcessingRule.IQUAL_OR_LESS_THAN, translation: '< =' },
  { name: ProcessingRule.GREATER_THAN, translation: '>' },
  {
    name: ProcessingRule.IQUAL_OR_GREATER_THAN,
    translation: '> =',
  },
  { name: ProcessingRule.BETWEEN, translation: 'ENTRE' },
]
