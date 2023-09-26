import { SurveyAction, SurveyActionType } from '../actions/survey.action'
import { SurveyState } from '../types/survey.type'

export const surveyReducer = (
  state: SurveyState,
  action: SurveyAction
): SurveyState => {
  switch (action.type) {
    case SurveyActionType.ADD_PATIENT_DATA:
      return {
        ...state,
        patient: action.payload.value,
      }
    case SurveyActionType.TOGGLE_DELETE_MODAL_OPEN:
      return {
        ...state,
        isDeleteModalOpen: !state.isDeleteModalOpen,
      }

    case SurveyActionType.TOGGLE_PRINT_LABEL_MODAL_OPEN:
      return {
        ...state,
        isPrintLabelModalOpen: !state.isPrintLabelModalOpen,
      }

    case SurveyActionType.NEXT_STEP:
      return {
        ...state,
        stepPosition: state.stepPosition + 1,
      }
    case SurveyActionType.PREVIOUS_STEP:
      return {
        ...state,
        stepPosition: state.stepPosition > 1 ? state.stepPosition - 1 : 0,
      }
    case SurveyActionType.RESET_WIZARD:
      return {
        ...state,
        stepPosition: 0,
      }
    case SurveyActionType.ENABLE_NEXT_BUTTON:
      return {
        ...state,
        enableNextButton: !!action.payload.value,
      }
    case SurveyActionType.ENABLE_PREVIOUS_BUTTON:
      return {
        ...state,
        enablePreviousButton: !!action.payload.value,
      }
    case SurveyActionType.STEP_VALID:
      return {
        ...state,
        stepValid: action.payload.value,
      }
    case SurveyActionType.STEP_READY:
      return {
        ...state,
        stepReady: action.payload.value,
      }
    case SurveyActionType.SET_FORM_NAME:
      return {
        ...state,
        formName: action.payload.value,
      }
    case SurveyActionType.SET_TOTAL_STEPS:
      return {
        ...state,
        totalSteps: action.payload.value,
      }
    default:
      return state
  }
}
