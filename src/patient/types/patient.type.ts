import { CommonResponse } from '../../common/types'
import { Gender } from '../../common/types/gender.type'

export interface Patient {
  patientId: string
  firstName: string
  lastName: string
  dateOfBirth: Date | null // string
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
