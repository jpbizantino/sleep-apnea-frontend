import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
//import { purpleTheme } from './purpleTheme'
import { mdxTheme } from './mdxTheme'
import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const AppTheme = ({ children }: Props) => {
  return (
    <ThemeProvider theme={mdxTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
