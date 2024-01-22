import { GenericDictionary } from '../types'

export enum ProcessingRuleEnum {
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
  { name: ProcessingRuleEnum.EQUAL, translation: '=' },
  { name: ProcessingRuleEnum.LESS_THAN, translation: '<' },
  { name: ProcessingRuleEnum.EQUAL_OR_LESS_THAN, translation: '< =' },
  { name: ProcessingRuleEnum.GREATER_THAN, translation: '>' },
  {
    name: ProcessingRuleEnum.EQUAL_OR_GREATER_THAN,
    translation: '> =',
  },
  { name: ProcessingRuleEnum.BETWEEN, translation: 'ENTRE' },
]
