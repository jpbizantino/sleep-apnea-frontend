import { Question, Rule } from '.'

export interface GroupedField {
  groupedFieldId: string
  name: string
  questions: Question[]
  rule: Rule
  scoreToAdd: number
  derivedPatology: ''
}
