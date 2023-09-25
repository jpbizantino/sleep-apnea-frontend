import { AllInboxTwoTone } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

export const NoRowsOverlay = () => {
  return (
    <>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <AllInboxTwoTone fontSize="large" />
        <Typography>Sin datos</Typography>
      </Stack>
    </>
  )
}
