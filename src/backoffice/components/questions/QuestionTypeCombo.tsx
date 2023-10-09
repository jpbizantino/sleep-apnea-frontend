import { Autocomplete, TextField } from '@mui/material'
import { QuestionType } from '../../../survey/enums/question.enum'
import { GenericData } from '../../../common/types'

export const QuestionTypeCombo = (props: {
  disabled: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helperText: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any
}) => {
  const data: GenericData[] = [
    {
      id: QuestionType.CHOICE.toString(),
      name: 'OPCIONES',
      value: QuestionType.CHOICE.toString(),
    },
    {
      id: QuestionType.FIX_NUMBER.toString(),
      name: 'VALOR FIJO',
      value: QuestionType.FIX_NUMBER.toString(),
    },
  ]

  return (
    <Autocomplete
      disabled={props.disabled}
      disablePortal
      options={data}
      getOptionLabel={(option: GenericData) => option.name}
      value={props.value}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          name={props.name}
          label={props.label}
          variant="standard"
          fullWidth
          error={props.error}
          helperText={props.helperText}
          value={props.value}
        />
      )}
    />
  )
}
