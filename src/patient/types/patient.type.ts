import { CommonResponse } from '../../common/types'
import { Gender } from '../../common/types/gender.type'

export interface Patient {
  _id: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  gender: string
  _birthDate: Date | null
  _gender: Gender | null
}

export interface PatientResponse extends CommonResponse {
  patient: Patient[]
}
