import { LazyExoticComponent } from 'react'
import { SurveyView } from '../views/SurveyView'

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
    Component: SurveyView,
    to: '/',
    name: 'Survey',
  },
]
