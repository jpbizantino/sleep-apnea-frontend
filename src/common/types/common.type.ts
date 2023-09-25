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
  msgError: string
}

export interface SnackbarData {
  severity: AlertColor | undefined
  message: string
}
