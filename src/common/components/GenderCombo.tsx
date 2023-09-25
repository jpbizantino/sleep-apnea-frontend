import { Autocomplete, TextField } from '@mui/material'
import { Gender } from '../types/gender.type'

export const GenderCombo = (props: {
  disabled: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  helperText: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any
}) => {
  const data: Gender[] = [
    {
      genderId: '1',
      genderCode: 'M',
      genderName: 'MASCULINO',
      inactive: false,
    },

    {
      genderId: '2',
      genderCode: 'F',
      genderName: 'FEMENINO',
      inactive: false,
    },
  ]

  return (
    <Autocomplete
      disabled={props.disabled}
      disablePortal
      options={data}
      getOptionLabel={(option: Gender) => option.genderName}
      value={props.value}
      isOptionEqualToValue={(option, value) =>
        option.genderCode === value.genderCode
      }
      onChange={props.onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          name="gender"
          label="Género"
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
