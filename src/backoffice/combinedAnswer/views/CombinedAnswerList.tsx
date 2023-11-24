import { Box } from '@mui/material'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { CombinedAnswerGrid } from '../components'

export const CombineAnswerList = () => {
  return (
    <>
      <BackofficePage>
        <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
          <CombinedAnswerGrid />
        </Box>
      </BackofficePage>
    </>
  )
}
