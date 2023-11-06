import { LazyExoticComponent } from 'react'
import { SurveyList } from '../../survey/views/SurveyList'
import { SurveySumary } from '../../survey/views/SurveySumary'

type JSXComponent = () => JSX.Element

interface Route {
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
}

export const routes: Route[] = [
  // Survey
  {
    path: '/*',
    Component: SurveyList,
    to: '/',
    name: 'Encuestas',
  },
  {
    path: '/:surveyId',
    Component: SurveySumary,
    to: '/:surveyId',
    name: 'Encuesta',
  },
  {
    path: '/new',
    Component: SurveySumary,
    to: '/new',
    name: 'Encuesta',
  },
]
