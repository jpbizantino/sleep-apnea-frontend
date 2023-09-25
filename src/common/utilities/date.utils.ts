import { addMinutes, format, isDate, parse } from 'date-fns'

export const convertDateToDbFormat = (input: Date): string => {
  try {
    return format(input, 'yyyy-MM-dd')
  } catch {
    return ''
  }
}

export const getLocalDateLessTimeZone = (inputDate: Date): Date => {
  return new Date(
    addMinutes(inputDate, -1 * inputDate.getTimezoneOffset()).toDateString()
  )
}

export const getLocalDatePlusTimeZone = (inputDate: Date): Date => {
  return new Date(
    addMinutes(inputDate, inputDate.getTimezoneOffset()).toDateString()
  )
}

export const getTimeLessTimeZone = (inputTime: Date): Date => {
  return new Date(addMinutes(inputTime, -1 * inputTime.getTimezoneOffset()))
}

export const getTimePlusTimeZone = (inputTime: Date): Date => {
  return new Date(addMinutes(inputTime, inputTime.getTimezoneOffset()))
}

/**
 *  Expected input format: yyyy-MM-dd
 */
export const convertStringDateToDate = (
  stringDate: string,
  inputFormat: string
): Date | null => {
  const result = parse(stringDate, inputFormat, new Date())

  if (isDate(result)) return result
  else return null
}

export const convertStringDateToStringDate = (
  stringDate: string,
  inputFormat: string,
  outputFormat: string
): string => {
  try {
    const result = parse(stringDate.toString(), inputFormat, new Date())

    if (!isDate(result)) return ''

    return format(result, outputFormat)
  } catch {
    return ''
  }
}

export const convertDateToStringDate = (
  inputDate: Date,
  outputFormat: string
): string => {
  try {
    return format(inputDate, outputFormat)
  } catch {
    return ''
  }
}
