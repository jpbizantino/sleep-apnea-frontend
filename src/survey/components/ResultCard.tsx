import { Card, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { SurveyContext } from '../views/context/SurveyContext'

export const ResultCard = () => {
  const surveyContext = useContext(SurveyContext)

  const { surveyResults } = surveyContext.state

  return (
    <>
      <Card
        // hidden={!isSuccess || isFetching}
        elevation={3}
        sx={{ mt: 2, p: 2 }}
      >
        <Grid container>
          {surveyResults.map((survey) => {
            return (
              <>
                <Grid
                  key={survey.questionId}
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ pb: 2 }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {survey.question.question}
                  </Typography>
                  <br /> {survey.selectedDescription}
                </Grid>
              </>
            )
          })}
        </Grid>
      </Card>
    </>
  )
}
