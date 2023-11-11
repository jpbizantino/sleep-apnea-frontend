import { ReactNode } from 'react'
import { AppLayout } from '../../../app/Layout/AppLayout'

interface Props {
  children?: ReactNode
}

export const UserPage = ({ children }: Props) => {
  return <AppLayout>{children}</AppLayout>
}
