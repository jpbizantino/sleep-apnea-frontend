import { Box } from '@mui/material'
import { SurveyGrid } from '../components/SurveyGrid'
import { BackofficePage } from '../../common/pages/BackofficePage'

export const SurveyList = () => {
  return (
    <>
      <BackofficePage>
        <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
          <SurveyGrid />
        </Box>
      </BackofficePage>
    </>
  )
}
