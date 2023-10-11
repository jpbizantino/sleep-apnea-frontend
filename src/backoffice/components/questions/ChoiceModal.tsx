import { Close, Save } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Choice, ModalReason } from '../../../common/types'
import { useBackoffice } from '../../hooks/userBackoffice'
import { useEffect } from 'react'

export const ChoiceModal = () => {
  const {
    isChoiceModalOpen,
    toggleChoiceModal,
    selectedChoice,
    selectedQuestion,
    addNewChoice,
    updateChoice,
  } = useBackoffice()

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
      .min(0, 'El valor debe ser 0 o 1')
      .max(1, 'El valor debe ser 0 o 1'),
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values: Choice) => {
      if (values._id == '') addNewChoice(selectedQuestion!, values)
      else updateChoice(selectedQuestion!, values)

      toggleChoiceModal()
    },
    onReset: () => {
      toggleChoiceModal()
    },
  })

  useEffect(() => {
    if (selectedChoice !== null) {
      formik.setValues(selectedChoice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChoice])

  return (
    <Dialog
      open={isChoiceModalOpen}
      onClose={(_event, reason) => {
        if (reason && reason == ModalReason.backdropClick) return
        // ReportModal()
      }}
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <DialogTitle>
          <Typography
            component={'div'}
            variant="h6"
            color="primary"
            gutterBottom
          >
            Opción
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container columns={12} spacing={1} rowSpacing={1}>
            <Grid item xs={6}>
              <TextField
                name="description"
                variant="standard"
                label="Texto"
                fullWidth
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                label="Valor Score"
                fullWidth
                value={formik.values.choiceValue}
                onChange={formik.handleChange}
                error={
                  formik.touched.choiceValue &&
                  Boolean(formik.errors.choiceValue)
                }
                helperText={
                  formik.touched.choiceValue && formik.errors.choiceValue
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ mb: 1, mt: 1, p: 1 }}
          >
            <Grid item>
              <Button startIcon={<Close />} variant="outlined" type="reset">
                Cerrar
              </Button>
            </Grid>
            <Grid item>
              <Button startIcon={<Save />} variant="contained" type="submit">
                Guardar
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}
