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

export const QuestionComponent = (props: {
  question: Question
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelection: any
}) => (
  <>
    <Box key={props.question._id} sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h4" gutterBottom>
        {props.question.question}
      </Typography>
      <Typography variant="body1" fontStyle="italic" gutterBottom>
        {props.question.description}
      </Typography>
      <br />
      {props.question.questionType == QuestionType.FIX_NUMBER ? (
        <TextField
          name="answer"
          label="Respuesta"
          variant="standard"
          fullWidth
          onChange={props.handleSelection}
        />
      ) : (
        <RadioGroup key={props.question._id} onChange={props.handleSelection}>
          {props.question.choices.map((item: Choice) => {
            return (
              <>
                <FormControlLabel
                  key={props.question._id + item.choiceValue}
                  id={props.question._id + item.choiceValue}
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
