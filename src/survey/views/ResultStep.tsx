import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import { AlertControl } from '../../common/components/AlertControl'
import { Loader } from '../../common/components/Loader'
import { AlertOption } from '../../common/types'
import { PatientCard } from '../components/PatientCard'
import { ResultCard } from '../components/ResultCard'
import { Result } from '../entities/result.entity'
import { useCreateSurveyMutation } from '../slices/resultQuerySlice'
import { SurveyContext } from './context/SurveyContext'
import {
  doEnableNextButton,
  doEnablePreviousButton,
} from './reducer/actions/survey.action'

export const ResultStep = () => {
  const { state, dispatch } = useContext(SurveyContext)
  const [createSurvey, { isLoading }] = useCreateSurveyMutation()

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    msgError: '',
  })

  const initialValue: Result = {
    patientId: state.patient._id,
    answers: state.surveyResults,
  }

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: (values: Result) => {
      createSurvey(values)
        .unwrap()
        .then(() => {
          dispatch(doEnablePreviousButton(false))
          dispatch(doEnableNextButton(false))
        })
        .catch((error) => {
          setAlert({
            isAlertOpen: true,
            msgError: error.data.message,
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
