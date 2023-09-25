import { Patient } from '../../../../patient/types'

export interface SurveyState {
  patient: Patient
  stepPosition: number
  enableNextButton: boolean
  enablePreviousButton: boolean
  isDeleteModalOpen: boolean
  isPrintLabelModalOpen: boolean
  stepValid: boolean
  stepReady: boolean
  formName: string
}
