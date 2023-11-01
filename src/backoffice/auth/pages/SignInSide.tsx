import { Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { Copyright } from '../../../common/components/Copyright'
import { UserLoginData } from '../../common/types/user.type'
import { useAuth } from '../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { LOGIN_URL, LOGO } from '../../../config'

const validationSchema = yup.object({
  username: yup.string().required('El campo es requerido'),
  password: yup.string().required('El campo es requerido'),
})

export const SignInSide = () => {
  const navigate = useNavigate()
  const { startLogin, error, errorMessage } = useAuth()

  const [isOpenAlert, setIsOpenAlert] = useState(false)

  useEffect(() => {
    if (error == 'authenticated') {
      navigate('/')
    }
  }, [error])

  useEffect(() => {
    if (errorMessage !== undefined) {
      setIsOpenAlert(true)
    }
  }, [errorMessage])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: UserLoginData) => {
      startLogin(values)
    },
  })

  return (
    <AuthLayout title="Login">
      <form onSubmit={formik.handleSubmit}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <Grid item xs={false} sm={false} md={8}>
            <Box
              sx={{
                height: '100%',
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'block',
                  xl: 'block',
                },
              }}
            >
              <iframe
                src={LOGIN_URL}
                allowFullScreen
                width="100%"
                height="100%"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src={LOGO} //"../../../../public/logo.png"
                loading="lazy"
                height="100"
              />

              <Typography component="h1" variant="h5" sx={{ mt: 4 }}>
                Bienvenido
              </Typography>

              <Box>
                <TextField
                  className="inputRounded"
                  InputLabelProps={{ shrink: false, sx: { ml: 2 } }}
                  label={formik.values.username === '' ? 'Usuario' : ' '}
                  name="username"
                  margin="normal"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="disable-autofill"
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                ></TextField>
                <TextField
                  className="inputRounded"
                  InputLabelProps={{ shrink: false, sx: { ml: 2 } }}
                  label={formik.values.username === '' ? 'Contraseña' : ' '}
                  name="password"
                  autoComplete="disable-autofill"
                  margin="normal"
                  type="password"
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  fullWidth
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                ></TextField>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  value="Login"
                  sx={{ mt: 3, mb: 2, p: 2, fontSize: 18 }}
                  disabled={error == 'checking' ? true : false}
                >
                  INGRESAR
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={isOpenAlert}
        autoHideDuration={5 * 1000}
        onClose={() => setIsOpenAlert(false)}
        message={errorMessage}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setIsOpenAlert(false)}
          >
            <Close />
          </IconButton>,
        ]}
      ></Snackbar>
    </AuthLayout>
  )
}
