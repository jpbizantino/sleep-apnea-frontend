import { LazyExoticComponent } from 'react'
import { BackofficeRoutes } from '../../backoffice/common/routes/BackofficeRoutes'
import { SurveyRoutes } from '../../survey/routes/SurveyRoutes'

type JSXComponent = () => JSX.Element

interface Route {
  to: string
  path: string
  Component: LazyExoticComponent<JSXComponent> | JSXComponent
  name: string
}

export const publicRoutes: Route[] = [
  {
    path: '/*',
    to: '/',
    Component: SurveyRoutes,
    name: 'Survey',
  },
  // {
  //   path: '/backoffice/*',
  //   to: '/backoffice',
  //   Component: BackofficeRoutes,
  //   name: 'Backoffice',
  // },
]

export const privateRoutes: Route[] = [
  {
    path: '/backoffice/*',
    to: '/backoffice',
    Component: BackofficeRoutes,
    name: 'Backoffice',
  },
]
