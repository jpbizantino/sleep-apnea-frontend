import { Box, Button, Paper, Step, StepLabel, Stepper } from '@mui/material'
import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import { PatientStep } from './views/PatientStep'
import { SurveyContext } from './views/context/SurveyContext'
import {
  doNextStep,
  doPreviousStep,
} from './views/reducer/actions/survey.action'
import { ResultStep } from './views/ResultStep'
import { SurveyStep } from './views/SurveyStep'

export const Survey = () => {
  // const navigate = useNavigate()
  const { state, dispatch } = useContext(SurveyContext)
  const steps = ['Paciente', 'Encuesta', 'Resultado']

  const handleNext = () => {
    if (state.stepPosition == steps.length - 1) navigate(-1)
    dispatch(doNextStep())
  }

  const handleBack = () => {
    dispatch(doPreviousStep())
  }

  function renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <PatientStep handleNext={handleNext} stepPosition="Step1" />
      case 1:
        return <SurveyStep handleNext={handleNext} stepPosition="Step2" />
      case 2:
        return <ResultStep handleNext={handleNext} stepPosition="Step3" />
      // case 3:
      //   return <MwlStep4 handleNext={handleNext} stepPosition="Step4" />
    }
  }

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          m: 2,
          p: 2,
        }}
      >
        <Box sx={{ width: '100%', pt: 2 }}>
          <Stepper
            activeStep={state.stepPosition}
            style={{ wordBreak: 'break-all' }}
          >
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              )
            })}
          </Stepper>
          <Box sx={{ width: '100%', pt: 2 }}>
            <>
              {renderStepContent(state.stepPosition)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  disabled={
                    state.stepPosition === 0 || !state.enablePreviousButton
                  }
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  ATRAS
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button
                  disabled={!state.enableNextButton}
                  type="submit"
                  form={'Step' + (state.stepPosition + 1)}
                >
                  {state.stepPosition === steps.length - 1
                    ? 'FINALIZAR'
                    : 'SIGUIENTE'}
                </Button>
              </Box>
            </>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
