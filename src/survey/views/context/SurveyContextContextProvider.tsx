import { ReactNode, useReducer } from 'react'
import { Patient } from '../../../patient/types'
import { surveyReducer } from '../reducer/state/survey.state'
import { SurveyState } from '../reducer/types/survey.type'
import { SurveyContext } from './SurveyContext'
import { Answer } from '../../entities/answer.entity'

interface Props {
  children?: ReactNode
}

const initialPatient: Patient = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  _gender: null,
  _id: '',
  gender: '',
  weight: 0,
  height: 0,
  _birthDate: null,
}

const initialState: SurveyState = {
  stepPosition: 0,
  totalSteps: 0,
  enableNextButton: true,
  enablePreviousButton: true,
  patient: initialPatient,
  surveyResults: [],
  answerExist: function (answer: Answer): boolean {
    return this.surveyResults.some((p) => p.questionId == answer.questionId)
  },
}

export const SurveyContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(surveyReducer, initialState)

  return (
    <SurveyContext.Provider value={{ state: state, dispatch }}>
      {children}
    </SurveyContext.Provider>
  )
}
