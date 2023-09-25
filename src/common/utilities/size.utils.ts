import useMediaQuery from '@mui/material/useMediaQuery'
import { Breakpoint, useTheme } from '@mui/material/styles'

export const getSize = (
  expectedStart: Breakpoint,
  expectedEnd: Breakpoint
): boolean => {
  const theme = useTheme()

  const prueba = useMediaQuery(
    theme.breakpoints.between(expectedStart, expectedEnd)
  )

  return prueba
}
