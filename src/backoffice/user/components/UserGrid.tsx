import {
  CheckCircle,
  CleaningServices,
  Delete,
  Edit,
  ExpandMore,
  PersonAdd,
  Search,
  Unpublished,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SkipToken, skipToken } from '@reduxjs/toolkit/dist/query'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoResultsOverlay } from '../../../common/components/NoResultsOverlay'
import { NoRowsOverlay } from '../../../common/components/NoRowsOverlay'
import { User, UserLocalFilter } from '../../common/types/user.type'
import { useUser } from '../hooks'
import { useGetUsersQuery } from '../slices'
import { DeleteUserModal } from './DeleteUserModal'

export const UserGrid = () => {
  const navigate = useNavigate()
  const { setSelectedUser, toggleDeleteUserModal } = useUser()

  const [filter, setFilter] = useState<UserLocalFilter | SkipToken>(skipToken)

  const { data, isFetching } = useGetUsersQuery(null)

  const columns: GridColDef[] = [
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 140,
      renderCell: (cellValues) => {
        const user: User = cellValues.row

        if (!user.name) {
          return (
            <Button
              startIcon={<Delete />}
              sx={{ width: 140 }}
              variant="contained"
              color="colorLevel4White"
              fullWidth
              onClick={() => {
                setSelectedUser(user)
                toggleDeleteUserModal()
              }}
            >
              Eliminar
            </Button>
          )
        } else {
          return (
            <Button
              startIcon={<Edit />}
              sx={{ width: 140 }}
              variant="contained"
              color="colorLevel4White"
              onClick={() => {
                navigate(`/backoffice/users/${cellValues.id}`)
              }}
            >
              Editar
            </Button>
          )
        }
      },
    },
    {
      field: 'userId',
      headerName: 'id',
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 250,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'active',
      headerName: 'Estado',
      align: 'center',
      width: 110,
      //valueGetter: (params: GridValueGetterParams) => params.row.inactive ? 'INACTIVO' : 'ACTIVO'
      renderCell: (cellValues) => {
        const user: User = cellValues.row

        return (
          <>
            {user.active ? (
              <Tooltip title="Usuario Activo" followCursor>
                <CheckCircle color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Usuario Inactivo" followCursor>
                <Unpublished color="disabled" />
              </Tooltip>
            )}
          </>
        )
      },
    },
  ]

  const initialValues: UserLocalFilter = {
    userId: '',
    email: '',
    name: '',
    password: '',
    roleId: '',
    active: false,
    role: undefined,
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: UserLocalFilter) => {
      setFilter(values)
    },
    onReset: () => {
      formik.resetForm
      setFilter(skipToken)
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Accordion sx={{ mb: 1 }} disableGutters={true} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Filtros - Usuarios</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
              columns={8}
            >
              <Grid item xs={2} sx={{ pr: 1 }}>
                <TextField
                  name="name"
                  label="Usuario"
                  variant="standard"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </Grid>

              <Grid item xs={4} sx={{ pr: 1 }}>
                <TextField
                  name="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              justifyContent={'space-between'}
            >
              <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                <Button
                  startIcon={<Search />}
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={2} sx={{ mt: 2, ml: { md: 1, xl: 1, xs: 0 } }}>
                <Button
                  startIcon={<CleaningServices />}
                  type="reset"
                  fullWidth
                  variant="contained"
                >
                  Limpiar
                </Button>
              </Grid>

              <Grid item xs={2} sx={{ mt: 2, ml: { md: 1, xl: 1, xs: 0 } }}>
                <Button
                  fullWidth
                  startIcon={<PersonAdd />}
                  variant="contained"
                  onClick={() => {
                    navigate('/backoffice/users/new')
                  }}
                >
                  Nuevo
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>

      <DataGrid
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          userId: false,
        }}
        disableColumnSelector
        sx={{
          backgroundColor: 'white',
          mt: 1,
        }}
        getRowId={(row: User) => row.userId}
        rows={filter === skipToken ? [] : data ?? []}
        columns={columns}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoResultsOverlay,
        }}
        loading={isFetching}
      />

      {/* <UserModal></UserModal> */}
      <DeleteUserModal />
    </>
  )
}
