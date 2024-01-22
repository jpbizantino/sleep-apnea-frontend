import { Question, Rule } from '.'

export interface CombinedField {
  combinedFieldId: string
  name: string
  questions: Question[]
  rule: Rule
  scoreToAdd: number
}
