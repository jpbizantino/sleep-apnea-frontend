import { Autocomplete, TextField } from '@mui/material'
import {
  scoreActionEnum,
  scoreActionDictionary,
} from '../../../common/enum/scoreAction.enum'
import { useMemo } from 'react'

export const ScoreActionCombo = (props: {
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
  exclude?: scoreActionEnum
}) => {
  const data = useMemo(() => {
    return scoreActionDictionary.filter((p) => p.name != props.exclude)
  }, [props.exclude])

  return (
    <Autocomplete
      disabled={props.disabled}
      // disablePortal
      disableClearable={true}
      options={data} //{scoreActionDictionary}
      onChange={props.onChange}
      getOptionLabel={(option) => option.translation}
      value={scoreActionDictionary.find(
        (scoreActionDictionary) => scoreActionDictionary.name === props.value
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
