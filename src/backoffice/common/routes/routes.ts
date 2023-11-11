import { LazyExoticComponent } from 'react'
import QuestionRoutes from '../../question/routes/QuestionRoutes'
import SurveyRoutes from '../../survey/routes/SurveyRoutes'
import { UserRoutes } from '../../user/routes/UserRoutes'

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
    Component: QuestionRoutes,
    to: '/',
    name: 'Principal',
  },
  // Questions
  {
    path: '/questions/*',
    Component: QuestionRoutes,
    to: '/',
    name: 'Pregutas',
  },
  // Survey
  {
    path: '/surveys/*',
    Component: SurveyRoutes,
    to: '/',
    name: 'Encuestas',
  },
  // Usersd
  {
    path: '/users/*',
    Component: UserRoutes,
    to: '/',
    name: 'Usuarios',
  },
]
