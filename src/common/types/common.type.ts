import { AlertColor } from '@mui/material'

export interface CommonResponse {
  message: string
  status: boolean
}

export enum ModalReason {
  backdropClick = 'backdropClick',
}

export interface AlertOption {
  isAlertOpen: boolean
  message: string | string[]
  color: AlertColor
}

export interface SnackbarData {
  severity: AlertColor | undefined
  message: string
}

export interface GenericDictionary {
  name: string
  translation: string
}
