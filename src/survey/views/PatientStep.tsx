import { Box, Grid, TextField, Typography } from '@mui/material'
import { addYears, parse } from 'date-fns'
import { useFormik } from 'formik'
import { useContext } from 'react'
import * as yup from 'yup'
import { DatePicker } from '../../common/components/DatePicker'
import { GenderCombo } from '../../common/components/GenderCombo'
import { Gender } from '../../common/types/gender.type'
import { Patient } from '../../patient/types/patient.type'
import { SurveyContext } from './context/SurveyContext'
import { doAddPatient, doNextStep } from './reducer/actions/survey.action'

export const PatientStep = (props: {
  handleNext: any
  stepPosition: string
}) => {
  const { dispatch } = useContext(SurveyContext)

  const initialValues: Patient = {
    firstName: '',
    lastName: '',
    birthDate: null,
    gender: null,
    email: '',
  }

  const validationSchema = yup
    .object({
      firstName: yup.string().required('El campo es requerido'),
      lastName: yup.string().required('El campo es requerido'),
      email: yup
        .string()
        .required('El campo es requerido')
        .email('Email inválido'),
      birthDate: yup
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
    })
    .shape({
      gender: yup.object().nullable().required('Seleccione un valor'),
    })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: Patient) => {
      // Add a Patient to the context
      dispatch(doAddPatient(values))
      // Enable Next Button
      dispatch(doNextStep())
    },
  })

  return (
    <>
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
          columns={6}
        >
          <Grid item xs={3}>
            <TextField
              name="firstName"
              label="Nombre"
              variant="standard"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              value={formik.values.lastName}
            />
          </Grid>

          <Grid item xs={3}>
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

          <Grid item xs={3}>
            <GenderCombo
              //onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
              value={formik.values.gender}
              onChange={(_event: unknown, value: Gender) => {
                formik.setFieldValue('gender', value)
              }}
              // disabled={isFetching}
              disabled={false}
            />
          </Grid>

          <Grid item xs={3}>
            <DatePicker
              label="F. Nacimiento"
              name="birthDate"
              // onChange={formik.handleChange}
              onChange={(value: Date) =>
                formik.setFieldValue('birthDate', value, true)
              }
              error={
                formik.touched.birthDate && Boolean(formik.errors.birthDate)
              }
              helperText={formik.touched.birthDate && formik.errors.birthDate}
              value={formik.values.birthDate}
              // disabled={isFetching || formik.values.noBirthDate}
              disabled={false}
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
    </>
  )
}
