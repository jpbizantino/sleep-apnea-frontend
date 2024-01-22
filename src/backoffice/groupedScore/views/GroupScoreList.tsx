import { Box } from '@mui/material'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { GroupScoreGrid } from '../components/GroupScoreGrid'

export const GroupScoreList = () => {
  return (
    <>
      <BackofficePage>
        <Box sx={{ p: 2, height: '80vh ', width: '100%' }}>
          <GroupScoreGrid />
        </Box>
      </BackofficePage>
    </>
  )
}
