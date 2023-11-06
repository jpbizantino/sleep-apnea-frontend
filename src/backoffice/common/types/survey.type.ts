import { Patient } from '../../../patient/types'
import { Answer } from './answer.type'

export interface Survey {
  surveyId: string
  patient: Patient
  answers: Answer[]
  calculatedScore?: number
  createdAt: string
  updatedAt: string
}

export interface SurveyFilter extends Survey {}
