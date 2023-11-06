import { Card, Grid, Typography } from '@mui/material'
import { differenceInYears, format } from 'date-fns'
import { useContext } from 'react'
import { SurveyContext } from '../views/context/SurveyContext'

export const PatientCard = () => {
  const surveyContext = useContext(SurveyContext)

  const { patient } = surveyContext.state

  return (
    <>
      <Card
        // hidden={!isSuccess || isFetching}
        elevation={3}
        sx={{ mt: 2, p: 2 }}
      >
        <Typography variant="h6">
          {patient.firstName} {patient.lastName}
        </Typography>

        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Peso:
            </Typography>
            <br /> {patient.weight} Kg.
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Altura:
            </Typography>
            <br />
            {patient.height} cm.
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Fecha Nacimiento:
            </Typography>
            <br />
            {patient._birthDate
              ? format(new Date(patient._birthDate), 'dd/MM/yyyy') +
                ' (' +
                differenceInYears(new Date(), new Date(patient._birthDate)) +
                ' años) '
              : ''}
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Género:
            </Typography>
            <br />
            {patient._gender?.genderName}
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
