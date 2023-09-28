import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AlertControl } from '../../common/components/AlertControl'
import { AlertOption } from '../../common/types'
import { Result } from '../entities/result.entity'
import { useCreateSurveyMutation } from '../slices/resultQuerySlice'
import { Loader } from '../../common/components/Loader'
import { SurveyContext } from './context/SurveyContext'

export const ResultStep = () => {
  const { state } = useContext(SurveyContext)

  const [createSurvey, { isLoading }] = useCreateSurveyMutation()

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    msgError: '',
  })

  useEffect(() => {
    processResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const processResults = () => {
    const surveyResult: Result = {
      patientId: state.patient._id,
      answers: state.surveyResults,
    }

    console.log(surveyResult)
    createSurvey(surveyResult)
      .unwrap()
      .then(() => {})
      .catch((error) => {
        setAlert({
          isAlertOpen: true,
          msgError: error.data.message,
        })
      })
  }

  return (
    <>
      <Loader open={isLoading} />
      <Box sx={{ m: 1 }}>
        <Typography variant="h6" gutterBottom>
          Resultado de la encuesta
        </Typography>
        <Typography variant="body1" gutterBottom>
          Este es el resultado de su encuesta
        </Typography>
        <br />

        {/* <form id={props.stepPosition} onSubmit={formik.handleSubmit}></form> */}
      </Box>
      <AlertControl alert={alert} />
    </>
  )
}
