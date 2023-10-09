import { Box } from '@mui/material'
import { QuestionGrid } from '../components/questions'

export const QuestionList = () => {
  return (
    <>
      <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
        <QuestionGrid />
      </Box>
    </>
  )
}
