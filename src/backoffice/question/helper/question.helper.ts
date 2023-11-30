import {
  ProcessingRule,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { Question } from '../../../common/types'

export const questionText = (question: Question) => {
  if (question.rule.processingRule == ProcessingRule.BETWEEN)
    return `${question.question} [${translateProcessingRule(
      question.rule.processingRule
    )} ${question.rule.valueA} y ${question.rule.valueB} ]`
  else
    return `${question.question} [${translateProcessingRule(
      question.rule.processingRule
    )} ${question.rule.valueA} ]`
}
