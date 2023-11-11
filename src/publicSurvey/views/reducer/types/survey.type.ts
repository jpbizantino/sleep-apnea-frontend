import { Answer } from '../../../../backoffice/common/types/answer.type'
import { Patient } from '../../../../patient/types'

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
