import { CommonResponse } from '../../common/types'
import { Gender } from '../../common/types/gender.type'

export interface Patient {
  firstName: string
  lastName: string
  birthDate: Date | string | null
  email: string
  gender: Gender | null
}

export interface PatientResponse extends CommonResponse {
  patient: Patient[]
}
