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
    path: '/:calculatedFieldId',
    Component: CombinedAnswerForm,
    to: '/:calculatedFieldId',
    name: 'Encuesta',
  },
  {
    path: '/new',
    Component: CombinedAnswerForm,
    to: '/new',
    name: 'Encuesta',
  },
]
