import { Close, ExpandMore, Save } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import YupPassword from 'yup-password'
import { CustomSnackbar } from '../../../common/components/CustomSnackbar'
import { Loader } from '../../../common/components/Loader'
import { AlertOption } from '../../../common/types'
import { PassField } from '../../common/components/PassField'
import { User } from '../../common/types/user.type'
import { UserPage } from '../pages/UserPage'
import {
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from '../slices'

//Call to Yup Password.
YupPassword(yup)

const validationSchema = yup.object({
  name: yup.string().required('El campo es requerido'),
  password: yup
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .minUppercase(1, 'La contraseña debe contener al menos una mayúscula')
    .minNumbers(1, 'La contraseña debe contener al menos una minúscula'),
  email: yup.string().required('El campo es requerido').email('Email inválido'),
})
// .shape({
//   role: yup.object().nullable().required('Seleccione un valor'),
//   //patient: yup.object().nullable().required('Ingrese un valor'),
// })

export const UserForm = () => {
  const navigate = useNavigate()

  //Get de URL Param
  const { userId } = useParams()

  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserMutation()
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation()
  const { data, isFetching, isSuccess } = useGetUserQuery(userId!)
  const [expanded, setExpanded] = useState(true)

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'info',
  })

  const user: User = {
    userId: '',
    email: '',
    name: '',
    password: '',
    roleId: '',
    active: true,
    creaAt: undefined,
    updateAt: undefined,
    role: undefined,
  }

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: (values: User) => {
      setAlert({
        isAlertOpen: false,
        message: '',
        color: 'info',
      })

      values = {
        ...values,
        email: values.email.trim().toLocaleLowerCase(),
        name: values.name.trim().toLocaleLowerCase(),
        roleId: '653e47d4b5a7f8beb2066c80',
      }

      if (!formik.values.userId) {
        createUser(values)
          .unwrap()
          .then(() => {
            formik.setFieldValue('userId', values.userId)
            setAlert({
              isAlertOpen: true,
              message: 'Datos guardados exitosamente',
              color: 'success',
            })
          })
          .catch((error) => {
            setAlert({
              isAlertOpen: true,
              message: error.data.message,
              color: 'error',
            })
          })
      } else {
        updateUser(values)
          .unwrap()
          .then(() => {
            setAlert({
              isAlertOpen: true,
              message: 'Datos modificados exitosamente',
              color: 'success',
            })
          })
          .catch((error) => {
            setAlert({
              isAlertOpen: true,
              message: error.data.message,
              color: 'error',
            })
          })
      }
    },

    onReset: () => {
      formik.resetForm()
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  return (
    <>
      <UserPage>
        <Loader open={isFetching || isLoadingCreate || isLoadingUpdate} />
        <CustomSnackbar alert={alert} />
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Box sx={{ mt: 1 }}>
            <Accordion
              expanded={expanded}
              sx={{ m: 1, p: 1 }}
              disableGutters={true}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">
                  {formik.values.userId ? 'Editar Usuario' : 'Nuevo Usuario'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1}
                  columns={6}
                >
                  <Grid item xs={3} sx={{ pr: 1 }}>
                    <TextField
                      name="email"
                      label="Email"
                      variant="standard"
                      fullWidth
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                      value={formik.values.email}
                    />
                  </Grid>

                  <Grid item xs={3} sx={{ pr: 1 }}>
                    <TextField
                      name="name"
                      label="Nombre"
                      variant="standard"
                      fullWidth
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      value={formik.values.name.toLowerCase()}
                    />
                  </Grid>

                  <Grid item xs={3} sx={{ pr: 1 }}>
                    <PassField
                      name="password"
                      label="Contraseña"
                      variant="standard"
                      fullWidth
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      value={formik.values.password}
                    />
                  </Grid>

                  <Grid item xs={2} sx={{ mt: 1, mb: 1 }}>
                    <FormControlLabel
                      label="Activo"
                      control={
                        <Switch
                          checked={formik.values.active}
                          name="active"
                          value={formik.values.active}
                          onChange={formik.handleChange}
                        />
                      }
                    />
                  </Grid>

                  <Grid item xs={2} sx={{ pr: 1 }}></Grid>
                </Grid>

                <Grid
                  container
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent={'space-between'}
                  sx={{ mb: 1, mt: 1 }}
                >
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      startIcon={<Close />}
                      fullWidth
                      variant="outlined"
                      disabled={
                        isLoadingCreate || isLoadingUpdate || isFetching
                      }
                      onClick={() => {
                        navigate(-1)
                      }}
                    >
                      Cerrar
                    </Button>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      startIcon={<Save />}
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={
                        isLoadingCreate || isLoadingUpdate || isFetching
                      }
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </form>
      </UserPage>
    </>
  )
}
