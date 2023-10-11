import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { Button, Grid, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { Choice } from '../../../common/types'
import { useFormik } from 'formik'
import * as yup from 'yup'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChoiceItem = (props: { choice: Choice; handleDelete: any }) => {
  const [editMode, setEditMode] = useState(false)

  const initialValue: Choice = {
    _id: '',
    description: '',
    choiceValue: 0,
    order: 0,
  }
  const validationSchema = yup.object({
    description: yup.string().trim().required('El campo es requerido'),
    choiceValue: yup
      .number()
      .required('Ingrese un valor')
      .integer('El valor debe ser entero')
      .min(-1, 'El valor debe ser 0 o 1')
      .max(2, 'El valor debe ser 0 o 1'),
  })

  const formik = useFormik({
    initialValues: props.choice ?? initialValue,
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values: Choice) => {
      // if (state.answerExist(values)) dispatch(doRemoveAnswer(values))
    },
  })

  return (
    <>
      <Paper elevation={1} sx={{ mt: 1, p: 1 }}>
        <Grid container columns={12} sx={{ p: 1 }} spacing={1} rowSpacing={1}>
          <Grid item xs={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              {editMode ? 'Guardar' : 'Editar'}
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => props.handleDelete(props.choice)}
            >
              Eliminar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="description"
              variant="standard"
              label="Texto"
              fullWidth
              value={formik.values.description}
              disabled={!editMode}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              name="choiceValue"
              variant="standard"
              label="Valor choiceValue"
              fullWidth
              value={formik.values.choiceValue}
              disabled={!editMode}
              onChange={formik.handleChange}
              error={
                formik.touched.choiceValue && Boolean(formik.errors.choiceValue)
              }
              helperText={
                formik.touched.choiceValue && formik.errors.choiceValue
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <ArrowUpward />
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              variant="contained"
              onClick={() => {
                setEditMode(!editMode)
              }}
            >
              <ArrowDownward />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}
