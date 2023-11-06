import { Card, Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { SurveyContext } from '../views/context/SurveyContext'
import { Question } from '../../common/types'

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
            const question: Question = JSON.parse(survey.jsonQuestion)

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
                    {question.question}
                  </Typography>
                  <br /> {survey.selectedValue}
                </Grid>
              </>
            )
          })}
        </Grid>
      </Card>
    </>
  )
}
