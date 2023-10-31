import { LazyExoticComponent, lazy } from 'react'
import { QuestionForm } from '../../question/views/QuestionForm'

type JSXComponent = () => JSX.Element

interface Route {
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
}

const backOfficeViewLazy = lazy(() => import('../views/BackofficeView'))

export const routes: Route[] = [
  {
    path: '/*',
    Component: backOfficeViewLazy,
    to: '/',
    name: 'Admisión',
  },
  {
    path: '/questions/*',
    Component: backOfficeViewLazy,
    to: '/',
    name: 'Admisión',
  },
  {
    path: '/questions/:questionId',
    Component: QuestionForm,
    to: '/:questionId',
    name: 'Pregunta',
  },
  {
    path: '/questions/new',
    Component: QuestionForm,
    to: '/questions/new',
    name: 'Pregunta',
  },
]
