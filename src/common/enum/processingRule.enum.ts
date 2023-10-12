export enum ProcessingRule {
  DATA_AS_RECEIVED = 'DATA_AS_RECEIVED',
  LESS_THAN = 'LESS_THAN',
  IQUAL_OR_LESS_THAN = 'IQUAL_OR_LESS_THAN',
  GREATER_THAN = 'GREATER_THAN',
  IQUAL_OR_GREATER_THAN = 'IQUAL_OR_GREATER_THAN',
  BETWEEN = 'BETWEEN',
}

export const translateProcessingRule = (input: string) => {
  return ruleTypeDictionary.find((p) => p.name == input)?.value
}

export const ruleTypeDictionary = [
  { name: ProcessingRule.DATA_AS_RECEIVED, value: 'VALOR INGRESADO' },
  { name: ProcessingRule.LESS_THAN, value: '<' },
  { name: ProcessingRule.IQUAL_OR_LESS_THAN, value: '< =' },
  { name: ProcessingRule.GREATER_THAN, value: '>' },
  {
    name: ProcessingRule.IQUAL_OR_GREATER_THAN,
    value: '> =',
  },
  { name: ProcessingRule.BETWEEN, value: 'ENTRE' },
]
