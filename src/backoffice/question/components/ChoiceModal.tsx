import { Close, Save } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'
import { Choice, ModalReason } from '../../../common/types'
import { useBackoffice } from '../../common/hooks/userBackoffice'

export const ChoiceModal = (props: { handleChoice: any }) => {
  const { toggleChoiceModal, isChoiceModalOpen, selectedChoice } =
    useBackoffice()

  const initialValue: Choice = {
    choiceId: crypto.randomUUID().toString(),
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
      .min(0, 'El valor debe ser 0 o 5')
      .max(5, 'El valor debe ser 0 o 5'),
    order: yup
      .number()
      .required('Ingrese un valor')
      .integer('El valor debe ser entero')
      .min(0, 'El valor debe ser igual o mayor a 0'),
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit: (values: Choice) => {
      props.handleChoice(values)
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
          <Typography variant="h6" color="primary" gutterBottom>
            {formik.values.choiceId ? 'Editar Opción' : 'Nueva Opción'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container columns={12} spacing={1} rowSpacing={1}>
            <Grid item xs={2}>
              <TextField
                name="order"
                variant="standard"
                label="Orden"
                fullWidth
                type="number"
                value={formik.values.order}
                onChange={formik.handleChange}
                error={formik.touched.order && Boolean(formik.errors.order)}
                helperText={formik.touched.order && formik.errors.order}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                name="description"
                variant="standard"
                label="Texto de opción"
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
                label="Valor score"
                fullWidth
                type="number"
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
        </DialogContent>
        <DialogActions>
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
        </DialogActions>
      </form>
    </Dialog>
  )
}
