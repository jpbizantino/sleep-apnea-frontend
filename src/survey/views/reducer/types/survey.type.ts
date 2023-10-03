import { Patient } from '../../../../patient/types'
import { Answer } from '../../../entities/answer.entity'

export interface SurveyState {
  patient: Patient
  stepPosition: number
  totalSteps: number
  enableNextButton: boolean
  enablePreviousButton: boolean
  surveyResults: Answer[]
  inputId: string
  answerExist: (answer: Answer) => boolean
}
