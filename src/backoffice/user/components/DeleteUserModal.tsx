import { Close, ThumbUpOffAlt } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  DialogActions,
  Box,
  Alert,
  AlertTitle,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks'
import { useDeleteUserMutation } from '../slices'
import { AlertOption } from '../../../common/types'

export const DeleteUserModal = () => {
  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: true,
    message: '',
    color: 'info',
  })
  const { selectedUser, isDeleteUserModalOpen, toggleDeleteUserModal } =
    useUser()
  const [DeleteUser, { isLoading }] = useDeleteUserMutation()

  const confirmHandler = async () => {
    await DeleteUser(selectedUser!)
      .unwrap()
      .then(() => {
        toggleDeleteUserModal()
      })
      .catch((error) => {
        setAlert({
          isAlertOpen: true,
          message: error.data.message,
          color: error,
        })
      })
  }

  useEffect(() => {
    setAlert({
      isAlertOpen: false,
      message: '',
      color: 'info',
    })
  }, [isDeleteUserModalOpen])

  return (
    <Dialog fullWidth open={isDeleteUserModalOpen}>
      <DialogTitle>¿Desea eliminar el usuario?</DialogTitle>
      <DialogContent>
        <>Presione el botón CONFIRMAR para continuar la operación.</>
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
            <Button
              startIcon={<Close />}
              disabled={isLoading}
              variant="outlined"
              onClick={() => {
                toggleDeleteUserModal()
              }}
            >
              Cerrar
            </Button>
          </Grid>

          <Grid item>
            <Button
              startIcon={<ThumbUpOffAlt />}
              disabled={isLoading}
              variant="contained"
              onClick={() => confirmHandler()}
            >
              CONFIRMAR
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
      <Box hidden={!alert.isAlertOpen}>
        <Alert severity="error">
          <AlertTitle>Error:</AlertTitle>
          {alert.message}
        </Alert>
      </Box>
    </Dialog>
  )
}
