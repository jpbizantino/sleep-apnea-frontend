import { Close } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/query'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertControl } from '../../../common/components/AlertControl'
import { Loader } from '../../../common/components/Loader'
import { AlertOption } from '../../../common/types'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { SurveyAnswers } from '../components/SurveyAnswers'
import { SurveyCard } from '../components/SurveyCard'
import { useGetSurveyQuery } from '../slices/surveyQuerySlice'

export const SurveySumary = () => {
  const navigate = useNavigate()
  //Get de URL Param
  const { surveyId } = useParams()

  const { isFetching, isSuccess, isError, data } = useGetSurveyQuery(
    surveyId ?? skipToken
  )

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'info',
  })

  useEffect(() => {
    isError &&
      setAlert({
        isAlertOpen: true,
        message: 'Error al obtener datos',
        color: 'error',
      })
  }, [isError])

  return (
    <>
      <BackofficePage>
        <Loader open={isFetching} />

        <Paper elevation={1} sx={{ m: 1, p: 1 }}>
          <Box sx={{ m: 1 }}>
            <Typography variant="h6" gutterBottom>
              Resúmen de respuestas
            </Typography>
            <Typography variant="body1" gutterBottom>
              Encuesta basada en la configuración existente en ese momento.
            </Typography>
            <br />

            {isSuccess && data && <SurveyCard survey={data} />}
            {isSuccess && <SurveyAnswers answers={data.answers} />}
          </Box>
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            justifyContent={'space-between'}
            sx={{ mb: 1, mt: 1 }}
          >
            <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
              <Button
                startIcon={<Close />}
                fullWidth
                variant="outlined"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cerrar
              </Button>
            </Grid>
          </Grid>

          <AlertControl alert={alert} />
        </Paper>
      </BackofficePage>
    </>
  )
}
