import { Close, Copyright } from '@mui/icons-material'
import {
  Box,
  Button,
  CardMedia,
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
// import { Copyright } from '../../common/components/Copyright'
import { useAuth } from '../hooks'
import { AuthLayout } from '../layout/AuthLayout'
import { UserLoginData } from '../../common/types/user.type'
// import { UserLoginData } from '../../common/types/user.type'

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
          <Grid item xs={false} sm={false} md={7}>
            <CardMedia
              sx={{
                height: '100%',
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'block',
                  xl: 'block',
                },
              }}
              image="/assets/background.jpg"
            ></CardMedia>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
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
                //src="https://clinicasanmiguelweb.com/wp-content/uploads/2022/10/logo-csm1.png"
                src="https://acdn.mitiendanube.com/stores/002/530/264/themes/common/logo-1089671112-1667238889-5f8cd55eb9de7f933aa60122e63d31131667238889-480-0.png?0"
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
                  autoComplete="on"
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
