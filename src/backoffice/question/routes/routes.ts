import { LazyExoticComponent } from 'react'
import { QuestionForm } from '../../question/views/QuestionForm'
import { QuestionList } from '../views/QuestionList'

type JSXComponent = () => JSX.Element

interface Route {
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
}

export const routes: Route[] = [
  // Questions
  {
    path: '/*',
    Component: QuestionList,
    to: '/',
    name: 'Pregutas',
  },
  {
    path: '/:questionId',
    Component: QuestionForm,
    to: '/:questionId',
    name: 'Pregunta',
  },
  {
    path: '/new',
    Component: QuestionForm,
    to: '/new',
    name: 'Pregunta',
  },
]
