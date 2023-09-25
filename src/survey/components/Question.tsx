import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { Choice, Question } from '../entities'
import { QuestionType } from '../enums/question.enum'

export const QuestionComponent = (props: { question: Question }) => (
  <>
    <Box sx={{ m: 1 }}>
      <Typography variant="h6" gutterBottom>
        {props.question.question}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {props.question.description}
      </Typography>
      <br />
      {props.question.questionType == QuestionType.FIX_NUMBER ? (
        <TextField
          name="answer"
          label="Respuesta"
          variant="standard"
          fullWidth
        />
      ) : (
        <RadioGroup>
          {props.question.choices.map((item: Choice) => {
            return (
              <>
                <FormControlLabel
                  value={item.choiceValue}
                  control={<Radio />}
                  label={item.description}
                />
              </>
            )
          })}
        </RadioGroup>
      )}
    </Box>
  </>
)
