import { CommonResponse } from '../../common/types'
import { Gender } from '../../common/types/gender.type'

export interface Patient {
  _id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  gender: string
  weight: number
  height: number
  _birthDate: Date | null
  _gender: Gender | null
}

export interface PatientResponse extends CommonResponse {
  patient: Patient[]
}
