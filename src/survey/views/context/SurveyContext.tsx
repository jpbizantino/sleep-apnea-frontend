import { createContext } from 'react'
import { SurveyAction } from '../reducer/actions/survey.action'
import { SurveyState } from '../reducer/types/survey.type'

export type SurveyContextType = {
  state: SurveyState
  dispatch: React.Dispatch<SurveyAction>
}

export const SurveyContext = createContext<SurveyContextType>({
  state: undefined as any,
  dispatch: undefined as any,
})
