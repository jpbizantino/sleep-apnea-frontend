import { LazyExoticComponent } from 'react'
import { CombineAnswerList } from '../views/CombinedAnswerList'

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
    Component: CombineAnswerList,
    to: '/',
    name: 'Resultados Combinados',
  },
  // {
  //   path: '/:surveyId',
  //   Component: SurveySumary,
  //   to: '/:surveyId',
  //   name: 'Encuesta',
  // },
  // {
  //   path: '/new',
  //   Component: SurveySumary,
  //   to: '/new',
  //   name: 'Encuesta',
  // },
]
