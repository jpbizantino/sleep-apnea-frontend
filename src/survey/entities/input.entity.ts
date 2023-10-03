import { Answer } from './answer.entity'

export interface Input {
  _id: string
  patientId: string
  answers: Answer[]
}
