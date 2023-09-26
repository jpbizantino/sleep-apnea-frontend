import { Box, Typography } from '@mui/material'

export const ResultStep = () => {
  //} (props: { handleNext: any }) => {
  return (
    <>
      <Box sx={{ m: 1 }}>
        <Typography variant="h6" gutterBottom>
          Resultado de la encuesta
        </Typography>
        <Typography variant="body1" gutterBottom>
          Este es el resultado de su encuesta
        </Typography>
        <br />

        {/* <form id={props.stepPosition} onSubmit={formik.handleSubmit}></form> */}
      </Box>
    </>
  )
}
