import { ProcessingRule } from '../enum/processingRule.enum'

export interface Rule {
  processingRule: ProcessingRule
  valueA: number
  valueB: number
  scoreToAdd: number
}
