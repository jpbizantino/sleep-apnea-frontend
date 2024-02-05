import { Box } from '@mui/material'
import { SurveyHeader } from '../components/SurveyHeader'
import { SurveyStepper } from './SurveyStepper'

export const SurveyView = () => {
  return (
    <>
      <SurveyHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box maxWidth="md">
          <SurveyStepper />
        </Box>
      </Box>
    </>
  )
}
