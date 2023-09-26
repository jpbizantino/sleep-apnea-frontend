import { Patient } from '../../patient/types'
import { Answer } from './answer.entity'

export interface Result {
  patient: Patient
  answers: Answer[]
}
