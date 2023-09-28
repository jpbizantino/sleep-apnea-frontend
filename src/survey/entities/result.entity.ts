import { Answer } from './answer.entity'

export interface Result {
  patientId: string
  answers: Answer[]
}
