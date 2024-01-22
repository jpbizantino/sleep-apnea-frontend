import { GroupedField } from '../../../common/types'

export const groupedFieldText = (groupedField: GroupedField) => {
  // let score = ''

  // if (groupedField.rule.scoreAction != scoreActionEnum.COMBINE_SCORE)
  //   score = ` :::  Score:  ${groupedField.rule.scoreToAdd}`

  return groupedField.name

  // if (groupedField.rule.processingRule == ProcessingRuleEnum.BETWEEN)
  //   return `${groupedField.groupedField} [${translateProcessingRule(
  //     groupedField.rule.processingRule
  //   )} ${groupedField.rule.valueA} y ${groupedField.rule.valueB}] ${score}`
  // else
  //   return `${groupedField.groupedField} [${translateProcessingRule(
  //     groupedField.rule.processingRule
  //   )} ${groupedField.rule.valueA}] ${score}`
}
