import { Add, Delete, ExpandMore } from '@mui/icons-material'
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@mui/material'
import { Question } from '../../../common/types'
import { questionText } from '../../question/helper/question.helper'
import { QuestionCombo } from './QuestionCombo'
import { useState } from 'react'
import { useGetSingleResultsQuestionsQuery } from '../../question/slices'
import { lightBlue } from '@mui/material/colors'

export interface InternalQuestionComponentProps {
  questionsData: Question[]
  handleAddQuestion: (question: Question) => void
  handleDeleteQuestion: (question: Question) => void
}

export const SimpleQuestionComponent = ({
  questionsData,
  handleAddQuestion,
  handleDeleteQuestion,
}: InternalQuestionComponentProps) => {
  const [tempQuestion, setTempQuestion] = useState<Question | null>(null)

  const { data: questionData, isFetching: isfetchingQuestions } =
    useGetSingleResultsQuestionsQuery('')

  return (
    <>
      <Accordion
        sx={{ mb: 1, backgroundColor: lightBlue[50] }}
        disableGutters={true}
        defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6">Preguntas Simples</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container columns={12} spacing={1}>
            <Grid item xs={12} md={10}>
              <QuestionCombo
                label="Pregunta a incluir"
                name="question"
                disabled={isfetchingQuestions}
                value={tempQuestion}
                error=""
                helperText=""
                onChange={(_: unknown, value: Question) => {
                  if (value) {
                    setTempQuestion(value)
                  }
                }}
                questions={questionData ?? []}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                // variant="contained"
                onClick={() => {
                  if (tempQuestion) {
                    handleAddQuestion(tempQuestion)
                    setTempQuestion(null)
                  }
                }}
              >
                <Add />
                Agregar
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ pt: 2 }}>
              {questionsData.map((item: Question) => {
                return (
                  <div key={item.questionId}>
                    <InternalChoiceCard
                      question={item}
                      handleDeleteQuestion={(question) =>
                        handleDeleteQuestion(question)
                      }
                    />
                  </div>
                )
              })}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

interface InternalChoiceCardProps {
  question: Question
  handleDeleteQuestion: (question: Question) => void
}

const InternalChoiceCard = ({
  question,
  handleDeleteQuestion,
}: InternalChoiceCardProps) => {
  return (
    <>
      <Paper
        elevation={1}
        sx={{ mt: 1, p: 1, backgroundColor: lightBlue[100] }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            verticalAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Grid
            container
            columns={12}
            spacing={1}
            rowSpacing={1}
            sx={{
              justify: 'center',
              alignItems: 'center',
              minHeight: '100%',
            }}
          >
            <Grid item xs={12} sm={10} md={10}>
              <Typography variant="caption">Pregunta</Typography>
              <br />
              <Typography sx={{ fontWeight: 'bold' }}>
                {questionText(question)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={2} md={2}>
              <Button
                startIcon={<Delete />}
                fullWidth
                onClick={() => handleDeleteQuestion(question)}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  )
}
