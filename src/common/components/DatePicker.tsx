import { TextField, TextFieldProps } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

export const DatePicker = (props: {
  label: any
  disabled: boolean
  value: any
  error: any
  helperText: any
  onChange: any
  name: any
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        label={props.label}
        inputFormat="dd/MM/yyyy"
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        // slotProps={{}}
        renderInput={(params: TextFieldProps) => (
          <TextField
            name={props.name}
            variant="standard"
            fullWidth
            value={props.value}
            error={props.error}
            helperText={props.helperText}
            disabled={props.disabled}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  )
}
