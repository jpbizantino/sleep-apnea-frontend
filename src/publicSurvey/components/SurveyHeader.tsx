import { AppBar, Box, Typography } from '@mui/material'

export const SurveyHeader = () => {
  return (
    <>
      <Box boxShadow={15} sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ p: 2 }}>
          <Typography variant="h5">Diagnóstico de Salud de Sueño</Typography>
        </AppBar>
      </Box>
    </>
  )
}
