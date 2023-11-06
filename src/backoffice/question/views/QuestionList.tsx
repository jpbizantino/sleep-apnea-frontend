import { Box } from '@mui/material'
import { QuestionGrid } from '../components'
import { BackofficePage } from '../../common/pages/BackofficePage'

export const QuestionList = () => {
  return (
    <>
      <BackofficePage>
        <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
          <QuestionGrid />
        </Box>
      </BackofficePage>
    </>
  )
}
