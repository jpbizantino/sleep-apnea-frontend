import { Box, Grid, TextField, Typography } from '@mui/material'
import { addYears, parse } from 'date-fns'
import { useFormik } from 'formik'
import { useContext, useState } from 'react'
import * as yup from 'yup'
import { DatePicker } from '../../common/components/DatePicker'
import { GenderCombo } from '../../common/components/GenderCombo'
import { Gender } from '../../common/types/gender.type'
import { Patient } from '../../patient/types/patient.type'
import { SurveyContext } from './context/SurveyContext'
import { doAddPatient, doNextStep } from './reducer/actions/survey.action'
import { useCreatePatientMutation } from '../../patient/slices'
import { AlertOption } from '../../common/types'
import { AlertControl } from '../../common/components/AlertControl'
import { Loader } from '../../common/components/Loader'
import { convertDateToDbFormat } from '../../common/utilities'

export const PatientStep = (props: { stepPosition: string }) => {
  const { dispatch } = useContext(SurveyContext)
  const [createPatient, { isLoading }] = useCreatePatientMutation()

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    msgError: '',
  })

  const initialValues: Patient = {
    _id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    _gender: null,
    _birthDate: null,
    weight: 0,
    height: 0,
  }

  const validationSchema = yup
    .object({
      firstName: yup.string().required('El campo es requerido'),
      lastName: yup.string().required('El campo es requerido'),
      email: yup
        .string()
        .required('El campo es requerido')
        .email('Email inválido'),
      _birthDate: yup
        .date()
        .transform(function (value, originalValue) {
          if (this.isType(value)) {
            return value
          }
          const result = parse(originalValue, 'dd/MM/yyyy', new Date())
          return result
        })
        .typeError('Ingrese una fecha válida.')
        .required()
        .min(addYears(new Date(), -100), 'La edad debe ser menor a 100 años.')
        .max(addYears(new Date(), -18), 'La edad debe ser mayor a 17 años.'),
      weight: yup
        .number()
        .typeError('El campo debe ser numérico y sin decimales')
        .required('El campo es requerido')
        .positive()
        .integer('No utilizar decimales')
        .min(9, 'Valor no puede ser menor a 10')
        .max(151, 'Valor no puede ser mayor a 150'),
      height: yup
        .number()
        .typeError('El campo debe ser numérico y sin decimales')
        .required('El campo es requerido')
        .positive()
        .integer('No utilizar decimales')
        .min(99, 'Valor no puede ser menor a 100')
        .max(251, 'Valor no puede ser mayor a 250'),
    })
    .shape({
      _gender: yup.object().nullable().required('Seleccione un valor'),
    })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: Patient) => {
      createPatient({
        ...values,
        gender: values._gender ? values._gender.genderCode : 'O',
        dateOfBirth: values._birthDate
          ? convertDateToDbFormat(values._birthDate)
          : '',
      })
        .unwrap()
        .then((p: Patient) => {
          // Add a Patient to the context
          dispatch(doAddPatient({ ...values, _id: p._id }))
          // Enable Next Button
          dispatch(doNextStep())
        })
        .catch((error) => {
          setAlert({
            isAlertOpen: true,
            msgError: error.data.message,
          })
        })
    },
  })

  return (
    <>
      <Loader open={isLoading} />
      <form id={props.stepPosition} onSubmit={formik.handleSubmit}></form>
      <Box sx={{ m: 1 }}>
        <Typography variant="h6" gutterBottom>
          Datos del Paciente
        </Typography>
        <Typography variant="body1" gutterBottom>
          Complete la información solicitada
        </Typography>
        <br />
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          spacing={1}
          columns={12}
        >
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="Nombre"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              value={formik.values.firstName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Apellido"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              value={formik.values.lastName}
            />
          </Grid>

          <Grid item xs={6}>
            <GenderCombo
              //onChange={formik.handleChange}
              error={formik.touched._gender && Boolean(formik.errors._gender)}
              helperText={formik.touched._gender && formik.errors._gender}
              value={formik.values._gender}
              onChange={(_event: unknown, value: Gender) => {
                formik.setFieldValue('_gender', value)
              }}
              disabled={false}
            />
          </Grid>

          <Grid item xs={6}>
            <DatePicker
              label="F. Nacimiento"
              name="_birthDate"
              // onChange={formik.handleChange}
              onChange={(value: Date) =>
                formik.setFieldValue('_birthDate', value, true)
              }
              error={
                formik.touched._birthDate && Boolean(formik.errors._birthDate)
              }
              helperText={formik.touched._birthDate && formik.errors._birthDate}
              value={formik.values._birthDate}
              // disabled={isFetching || formik.values.noBirthDate}
              disabled={false}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="weight"
              label="Peso (Kg)"
              variant="standard"
              type="number"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
              inputProps={{
                inputMode: 'numeric',
              }}
              value={formik.values.weight}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="height"
              label="Altura (cm)"
              variant="standard"
              type="number"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.height && Boolean(formik.errors.height)}
              helperText={formik.touched.height && formik.errors.height}
              inputProps={{
                inputMode: 'numeric',
              }}
              value={formik.values.height}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              value={formik.values.email}
            />
          </Grid>
        </Grid>
      </Box>
      <AlertControl alert={alert} />
    </>
  )
}
