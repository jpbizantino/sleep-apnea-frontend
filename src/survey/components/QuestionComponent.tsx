import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { QuestionType } from '../../common/enum/question.enum'
import { Question, Choice } from '../../common/types'

export const QuestionComponent = (props: {
  question: Question
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelection: any
}) => (
  <>
    <Box key={props.question._id} sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h5" gutterBottom>
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
          type="number"
          fullWidth
          onChange={props.handleSelection}
        />
      ) : (
        <RadioGroup name="radio-buttons-group" onChange={props.handleSelection}>
          {props.question.choices.map((item: Choice) => {
            return (
              <>
                <FormControlLabel
                  key={item._id}
                  value={item._id}
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
