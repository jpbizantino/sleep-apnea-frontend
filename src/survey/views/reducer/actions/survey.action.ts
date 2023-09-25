import { Patient } from '../../../../patient/types'

export enum SurveyActionType {
  ADD_PATIENT_DATA = 'ADD_PATIENT_DATA',
  // ADD_STUDY_DATA = 'ADD_STUDY_DATA',
  NEXT_STEP = 'NEXT_STEP',
  PREVIOUS_STEP = 'PREVIOUS_STEP',
  RESET_WIZARD = 'RESET_WIZARS',
  ENABLE_NEXT_BUTTON = 'ENABLE_NEXT_BUTTON',
  ENABLE_PREVIOUS_BUTTON = 'ENABLE_PREVIOUS_BUTTON',
  TOGGLE_DELETE_MODAL_OPEN = 'TOGGLE_DELETE_MODAL_OPEN',
  TOGGLE_PRINT_LABEL_MODAL_OPEN = 'TOGGLE_PRINT_LABEL_MODAL_OPEN',
  STEP_VALID = 'STEP_VALID',
  STEP_READY = 'STEP_READY',
  SET_FORM_NAME = 'SET_FORM_NAME',
}

export type SurveyAction =
  | {
      type: SurveyActionType.ADD_PATIENT_DATA
      payload: { value: Patient }
    }
  // | {
  //     type: MwlActionType.ADD_STUDY_DATA
  //     payload: { value: MwlItem }
  //   }
  | {
      type: SurveyActionType.SET_FORM_NAME
      payload: { value: string }
    }
  | {
      type:
        | SurveyActionType.ENABLE_NEXT_BUTTON
        | SurveyActionType.ENABLE_PREVIOUS_BUTTON
        | SurveyActionType.STEP_VALID
        | SurveyActionType.STEP_READY
      payload: { value: boolean }
    }
  | {
      type:
        | SurveyActionType.NEXT_STEP
        | SurveyActionType.PREVIOUS_STEP
        | SurveyActionType.RESET_WIZARD
        | SurveyActionType.TOGGLE_DELETE_MODAL_OPEN
        | SurveyActionType.TOGGLE_PRINT_LABEL_MODAL_OPEN
    }

export const doAddPatient = (value: Patient): SurveyAction => ({
  type: SurveyActionType.ADD_PATIENT_DATA,
  payload: { value },
})

// export const doAddStudyData = (value: MwlItem): MwlAction => ({
//   type: MwlActionType.ADD_STUDY_DATA,
//   payload: { value },
// })

export const doNextStep = (): SurveyAction => ({
  type: SurveyActionType.NEXT_STEP,
})

export const doPreviousStep = (): SurveyAction => ({
  type: SurveyActionType.PREVIOUS_STEP,
})

export const doResetWizard = (): SurveyAction => ({
  type: SurveyActionType.RESET_WIZARD,
})

export const doEnableNextButton = (value: boolean): SurveyAction => ({
  type: SurveyActionType.ENABLE_NEXT_BUTTON,
  payload: { value },
})

export const doEnablePreviousButton = (value: boolean): SurveyAction => ({
  type: SurveyActionType.ENABLE_PREVIOUS_BUTTON,
  payload: { value },
})

export const doToggleDeleteModalOpen = (): SurveyAction => ({
  type: SurveyActionType.TOGGLE_DELETE_MODAL_OPEN,
})

export const doTogglePrintModalOpen = (): SurveyAction => ({
  type: SurveyActionType.TOGGLE_PRINT_LABEL_MODAL_OPEN,
})

export const doStepValid = (value: boolean): SurveyAction => ({
  type: SurveyActionType.STEP_VALID,
  payload: { value },
})

export const doStepReady = (value: boolean): SurveyAction => ({
  type: SurveyActionType.STEP_READY,
  payload: { value },
})

export const doSetFormName = (value: string): SurveyAction => ({
  type: SurveyActionType.SET_FORM_NAME,
  payload: { value },
})
