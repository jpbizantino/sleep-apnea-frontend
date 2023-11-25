import { LazyExoticComponent } from 'react'
import { CombineAnswerList } from '../views/CombinedAnswerList'
import { CombinedAnswerForm } from '../views/CombinedAnswerForm'

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
  {
    path: '/:combinedAnswerId',
    Component: CombinedAnswerForm,
    to: '/:surveyId',
    name: 'Encuesta',
  },
  {
    path: '/new',
    Component: CombinedAnswerForm,
    to: '/new',
    name: 'Encuesta',
  },
]
