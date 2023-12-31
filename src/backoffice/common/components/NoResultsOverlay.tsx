import { AllInboxTwoTone } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'

export const NoResultsOverlay = () => {
  return (
    <>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <AllInboxTwoTone fontSize="large" />
        <Typography>Sin resultados</Typography>
      </Stack>
    </>
  )
}
