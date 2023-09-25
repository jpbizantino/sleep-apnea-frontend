import { CommonResponse } from '.'

export interface Gender {
  genderId: string
  genderCode: string
  genderName: string
  inactive: boolean
}

export interface GenderResponse extends CommonResponse {
  gender: Gender[]
}
