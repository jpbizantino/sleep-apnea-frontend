import { Autocomplete, TextField } from '@mui/material'
import { Question } from '../../../common/types'
import { questionText } from '../../question/helper/question.helper'

export const QuestionCombo = (props: {
  disabled: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helperText: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: Question[]
}) => {
  return (
    <Autocomplete
      disabled={props.disabled}
      // disablePortal
      disableClearable={true}
      options={props.questions}
      onChange={props.onChange}
      getOptionLabel={(option) => questionText(option)}
      value={props.questions.find((question) => question === props.value)}
      renderInput={(params) => (
        <TextField
          {...params}
          name={props.name}
          label={props.label}
          variant="standard"
          fullWidth
          error={props.error}
          helperText={props.helperText}
          //value={props.value}
          //onChange={props.onChange}
        />
      )}
    />
  )
}
