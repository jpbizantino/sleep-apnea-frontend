import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { Box, Button, MobileStepper, Paper } from '@mui/material'
import { useContext, useEffect } from 'react'
import { Loader } from '../../common/components/Loader'
import { useGetQuestionsQuery } from '../slices'
import { PatientStep } from './PatientStep'
import { ResultStep } from './ResultStep'
import { SummaryStep } from './SummaryStep'
import { SurveyStep } from './SurveyStep'
import { SurveyContext } from './context/SurveyContext'
import {
  doPreviousStep,
  doSetTotalSteps,
} from './reducer/actions/survey.action'

export const SurveyStepper = () => {
  const { state, dispatch } = useContext(SurveyContext)
  const { data, isSuccess, isFetching } = useGetQuestionsQuery(null)

  useEffect(() => {
    if (isSuccess && data) dispatch(doSetTotalSteps(data.length))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleBack = () => {
    dispatch(doPreviousStep())
  }

  const isLastStep = (lastStep = state.totalSteps + 1): boolean => {
    return state.stepPosition == lastStep
  }

  const showData = () => {
    if (!data || data.length < state.stepPosition) return <>No hay Preguntas</>

    return (
      <>
        <SurveyStep
          question={data[state.stepPosition - 1]}
          key={data[state.stepPosition - 1].questionId}
        />
      </>
    )
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PatientStep stepPosition="Step0" />

      case state.totalSteps + 1:
        return <SummaryStep />

      case state.totalSteps + 2:
        return <ResultStep />

      default:
        return showData()
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
        <Loader open={isFetching} />
        <Box sx={{ width: '100%', pt: 2 }}>
          {renderStepContent(state.stepPosition)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <>
              <MobileStepper
                variant="progress"
                steps={state.totalSteps + 3}
                position="static"
                activeStep={state.stepPosition}
                sx={{ flexGrow: 1 }}
                nextButton={
                  <Button
                    sx={{ ml: 2 }}
                    size="small"
                    type="submit"
                    form={'Step' + state.stepPosition}
                    disabled={!state.enableNextButton}
                  >
                    {isLastStep()
                      ? 'PROCESAR RESULTADOS'
                      : isLastStep(state.totalSteps)
                      ? 'Finalizar'
                      : 'Siguiente'}
                    {!isLastStep() && <KeyboardArrowRight />}
                  </Button>
                }
                backButton={
                  <Button
                    sx={{ mr: 2 }}
                    size="small"
                    onClick={handleBack}
                    disabled={isLastStep(0) || !state.enablePreviousButton}
                  >
                    <KeyboardArrowLeft />
                    Anterior
                  </Button>
                }
              />
            </>
          </Box>
        </Box>
      </Paper>
    </>
  )
}
