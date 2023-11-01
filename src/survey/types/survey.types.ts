import { Answer } from './answer.types'

export interface Survey {
  surveyId: string
  patientId: string
  answers: Answer[]
}
