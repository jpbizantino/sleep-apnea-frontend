import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { AlertControl } from '../../common/components/AlertControl'
import { Loader } from '../../common/components/Loader'
import { AlertOption } from '../../common/types'
import { PatientCard } from '../components/PatientCard'
import { ResultCard } from '../components/ResultCard'
import { Survey } from '../types/survey.types'
import { useCreateSurveyMutation } from '../slices/surveyQuerySlice'
import { SurveyContext } from './context/SurveyContext'
import {
  doEnableNextButton,
  doEnablePreviousButton,
  doNextStep,
  doSetInputId,
} from './reducer/actions/survey.action'

export const SummaryStep = () => {
  const { state, dispatch } = useContext(SurveyContext)
  const [createSurvey, { isLoading }] = useCreateSurveyMutation()

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'info',
  })

  const initialValue: Survey = {
    patientId: state.patient.patientId,
    answers: state.surveyResults,
    surveyId: '',
  }

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values: Survey) => {
      createSurvey(values)
        .unwrap()
        .then((input) => {
          dispatch(doSetInputId(input.surveyId))
          dispatch(doEnablePreviousButton(false))
          dispatch(doEnableNextButton(false))
          dispatch(doNextStep())
        })
        .catch((error) => {
          setAlert({
            isAlertOpen: true,
            message: error.data.message,
            color: 'error',
          })
        })
    },
  })

  return (
    <>
      <Loader open={isLoading} />
      <form id={'Step' + state.stepPosition} onSubmit={formik.handleSubmit}>
        <Box sx={{ m: 1 }}>
          <Typography variant="h6" gutterBottom>
            Resúmen de respuestas
          </Typography>
          <Typography variant="body1" gutterBottom>
            Verifique que todas las respuestas sean correctas y presione el
            botón.
          </Typography>
          <br />

          <PatientCard />
          <ResultCard />
        </Box>
        <AlertControl alert={alert} />
      </form>
    </>
  )
}
