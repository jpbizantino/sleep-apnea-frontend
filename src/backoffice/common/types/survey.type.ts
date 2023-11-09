import { Patient } from '../../../patient/types'
import { Answer } from './answer.type'

export interface Survey {
  surveyId: string
  patientId: string
  answers: Answer[]
  calculatedScore?: number
  createdAt: string
  updatedAt: string
  patient?: Patient | undefined
}

export interface SurveyFilter extends Survey {}

// import { Patient } from '../../patient/types'
// import { Answer } from './answer.types'

// export interface Survey {
//   surveyId: string
//   patientId: string
//   answers: Answer[]
//   calculatedStore?: number
//   createdAt?: string
//   updatedAt?: string
//   patient?: Patient | undefined
// }
