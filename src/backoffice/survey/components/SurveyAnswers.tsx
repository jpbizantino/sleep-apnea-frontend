import { Card, Grid, Typography } from '@mui/material'
import { Question } from '../../../common/types'
import { Answer } from '../../common/types/answer.type'

export const SurveyAnswers = (props: { answers: Answer[] }) => {
  if (props.answers == undefined) return <>dd</>

  return (
    <>
      <Card
        // hidden={!isSuccess || isFetching}
        elevation={3}
        sx={{ mt: 2, p: 2 }}
      >
        <Grid container key={crypto.randomUUID()}>
          {props.answers.map((survey) => {
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
                  <br /> {survey.selectedText} - ({survey.selectedValue})
                </Grid>
              </>
            )
          })}
        </Grid>
      </Card>
    </>
  )
}
