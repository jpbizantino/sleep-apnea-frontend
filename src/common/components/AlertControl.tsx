import { Box, Alert, AlertTitle } from '@mui/material'
import { AlertOption } from '../types'

export const AlertControl = (props: { alert: AlertOption }) => {
  return (
    <>
      <Box hidden={!props.alert.isAlertOpen} sx={{ mt: 2 }}>
        <Alert severity="error">
          <AlertTitle>Error:</AlertTitle>
          {props.alert.msgError}
        </Alert>
      </Box>
    </>
  )
}
