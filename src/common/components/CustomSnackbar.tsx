import { Alert, Box, Snackbar } from '@mui/material'
import { AlertOption } from '../types'
import { useEffect, useState } from 'react'

export const CustomSnackbar = (props: { alert: AlertOption }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.alert.isAlertOpen)
  }, [props.alert.isAlertOpen])

  return (
    <>
      <Box hidden={!open} sx={{ mt: 2 }}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={() => setOpen(false)}
        >
          <Alert severity={props.alert.color}>
            {Array.isArray(props.alert.message)
              ? props.alert.message.map((a) => (
                  <>
                    {a} <br />
                  </>
                ))
              : props.alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  )
}
