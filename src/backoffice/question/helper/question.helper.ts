import {
  ProcessingRuleEnum,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { scoreActionEnum } from '../../../common/enum/scoreAction.enum'
import { Question } from '../../../common/types'

export const questionText = (question: Question) => {
  let score = ''

  if (question.rule.scoreAction != scoreActionEnum.COMBINE_SCORE)
    score = ` :::  Score:  ${question.rule.scoreToAdd}`

  if (question.rule.processingRule == ProcessingRuleEnum.BETWEEN)
    return `${question.question} [${translateProcessingRule(
      question.rule.processingRule
    )} ${question.rule.valueA} y ${question.rule.valueB}] ${score}`
  else
    return `${question.question} [${translateProcessingRule(
      question.rule.processingRule
    )} ${question.rule.valueA}] ${score}`
}
