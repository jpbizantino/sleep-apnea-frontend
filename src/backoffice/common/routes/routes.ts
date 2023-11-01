import { LazyExoticComponent } from 'react'
import { QuestionForm } from '../../question/views/QuestionForm'
import { SurveyList } from '../../survey/views/SurveyList'
import BackofficeView from '../views/BackofficeView'

type JSXComponent = () => JSX.Element

interface Route {
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
}

export const routes: Route[] = [
  {
    path: '/*',
    Component: BackofficeView,
    to: '/',
    name: 'Principal',
  },
  // Questions
  {
    path: '/questions/*',
    Component: BackofficeView,
    to: '/',
    name: 'Pregutas',
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

  // Survey
  {
    path: '/surveys/*',
    Component: SurveyList,
    to: '/',
    name: 'Pregutas',
  },
  {
    path: '/surveys/:questionId',
    Component: QuestionForm,
    to: '/:questionId',
    name: 'Pregunta',
  },
  {
    path: '/surveys/new',
    Component: QuestionForm,
    to: '/questions/new',
    name: 'Pregunta',
  },
]
