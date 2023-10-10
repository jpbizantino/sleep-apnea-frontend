import { Autocomplete, TextField } from '@mui/material'
import { QuestionType } from '../../../survey/enums/question.enum'
import { GenericData } from '../../../common/types'

export const QuestionTypeCombo = (props: {
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
}) => {
  const data: GenericData[] = [
    {
      id: QuestionType.CHOICE,
      name: 'OPCIONES',
      value: QuestionType.CHOICE.toString(),
    },
    {
      id: QuestionType.FIX_NUMBER,
      name: 'VALOR FIJO',
      value: QuestionType.FIX_NUMBER.toString(),
    },
  ]

  console.log('**********')
  console.log(props.value)
  console.log('**********')

  return (
    <Autocomplete
      disabled={props.disabled}
      disablePortal
      id="QuestionTypeAutocomplete"
      options={data}
      getOptionLabel={(option: GenericData) => {
        return option.name
      }}
      value={props.value}
      //isOptionEqualToValue={(option, value) => option.id === value.id}
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
          onChange={props.onChange}
        />
      )}
    />
  )
}
