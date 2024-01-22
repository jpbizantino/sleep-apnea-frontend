import { ProcessingRuleEnum } from '../enum/processingRule.enum'
import { scoreActionEnum } from '../enum/scoreAction.enum'

export interface Rule {
  processingRule: ProcessingRuleEnum
  scoreAction: scoreActionEnum
  valueA: number
  valueB: number
  scoreToAdd: number
}
