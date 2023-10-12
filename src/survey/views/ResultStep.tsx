import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AlertControl } from '../../common/components/AlertControl'
import { Loader } from '../../common/components/Loader'
import { AlertOption } from '../../common/types'
import { Result } from '../entities/result.entity'
import { useRunAlgorithmQuery } from '../slices/resultQuerySlice'
import { SurveyContext } from './context/SurveyContext'

export const ResultStep = () => {
  const [result, setResult] = useState<Result | null>(null)
  const { state } = useContext(SurveyContext)
  const { data, isSuccess, isFetching, isError, error } = useRunAlgorithmQuery(
    state.inputId
  )

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'info',
  })

  useEffect(() => {
    data && setResult(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    error &&
      setAlert({
        isAlertOpen: true,
        message: 'Error al guardar',
        color: 'error',
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  return (
    <>
      <Loader open={isFetching} />

      <Box sx={{ m: 1 }}>
        <Typography variant="h6" gutterBottom>
          Resultado de la encuesta
        </Typography>
        <Typography variant="body1" gutterBottom>
          {result?.message}
        </Typography>
        <br />
        {result?.recomendation}
        <br />
        <br />
        Score de referencia: {result?.score}
      </Box>
      <AlertControl alert={alert} />
    </>
  )
}
