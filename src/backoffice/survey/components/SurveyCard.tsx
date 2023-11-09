import { Card, Grid, Typography } from '@mui/material'
import { differenceInYears, format } from 'date-fns'
import { convertDateToStringDate } from '../../../common/utilities'
import { Survey } from '../../common/types/survey.type'

export const SurveyCard = (props: { survey: Survey }) => {
  const { patient } = props.survey

  if (patient == undefined) return <></>

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
              Fecha Creación:
            </Typography>
            <br />
            {props.survey.createdAt
              ? convertDateToStringDate(
                  new Date(props.survey.createdAt),
                  'dd/MM/yyyy HH:mm'
                )
              : 'Sin Información'}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
              Score
            </Typography>
            <br />
            {props.survey.calculatedStore ?? 0}
          </Grid>

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
