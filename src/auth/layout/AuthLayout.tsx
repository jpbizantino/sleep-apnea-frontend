import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  title: string
  // any props that come into the component
}

export const AuthLayout = ({ children }: Props) => {
  return <>{children}</>
}
