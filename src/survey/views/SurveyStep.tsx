import { useEffect } from 'react'
import { useGetQuestionsQuery } from '../slices/questionQuerySlice'
import { QuestionComponent } from '../components/Question'
import { Box, Typography } from '@mui/material'

export const SurveyStep = (props: {
  handleNext: any
  stepPosition: string
}) => {
  // const surveyContext = useContext(SurveyContext)

  const { data, isSuccess } = useGetQuestionsQuery(null)

  useEffect(() => {
    if (isSuccess) console.log(data)
  }, [isSuccess])

  return (
    <>
      <form id={props.stepPosition} onSubmit={props.handleNext}></form>
      <Box sx={{ m: 1 }}>
        <Typography variant="h6" gutterBottom>
          Pregunta 1 de {data?.length}
        </Typography>
      </Box>

      {data && <QuestionComponent question={data[13]} />}
    </>
  )
}
