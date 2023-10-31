import { Add } from '@mui/icons-material'
import { SpeedDial } from '@mui/material'

export const WorkflowSpeedDialMenu = () => {
  return (
    <>
      <SpeedDial
        ariaLabel="Menu"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
        // onClick={() => toggleNewWorkflowItem()}
        icon={<Add />}
      />
      {/* <WorkflowItemModal /> */}
    </>
  )
}
