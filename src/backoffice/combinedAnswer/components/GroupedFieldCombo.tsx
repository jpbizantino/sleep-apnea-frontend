import { Autocomplete, TextField } from '@mui/material'
import { GroupedField } from '../../../common/types'
import { groupedFieldText } from '../../groupedScore/helper/groupedScore.helper'

export const GroupedFieldCombo = (props: {
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
  groupedFields: GroupedField[]
}) => {
  return (
    <Autocomplete
      disabled={props.disabled}
      // disablePortal
      disableClearable={true}
      options={props.groupedFields}
      onChange={props.onChange}
      getOptionLabel={(option) => groupedFieldText(option)}
      value={props.groupedFields.find(
        (groupedField) => groupedField === props.value
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
          //value={props.value}
          //onChange={props.onChange}
        />
      )}
    />
  )
}
