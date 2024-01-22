import { LazyExoticComponent } from 'react'
import { GroupScoreForm } from '../views/GroupScoreForm'
import { GroupScoreList } from '../views/GroupScoreList'

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
    Component: GroupScoreList,
    to: '/',
    name: 'Resultados Combinados',
  },
  {
    path: '/:calculatedFieldId',
    Component: GroupScoreForm,
    to: '/:calculatedFieldId',
    name: 'Encuesta',
  },
  {
    path: '/new',
    Component: GroupScoreForm,
    to: '/new',
    name: 'Encuesta',
  },
]
