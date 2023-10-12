import { Autocomplete, TextField } from '@mui/material'
import { ruleTypeDictionary } from '../../../common/enum/processingRule.enum'

export const RuleTypeCombo = (props: {
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
  return (
    <Autocomplete
      disabled={props.disabled}
      disablePortal
      options={ruleTypeDictionary}
      getOptionLabel={(option) => option.value}
      value={ruleTypeDictionary.find(
        (ruleTypeDictionary) => ruleTypeDictionary.name === props.value
      )}
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
