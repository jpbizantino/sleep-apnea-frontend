import {
  Add,
  CleaningServices,
  Download,
  Edit,
  ExpandMore,
  Search,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { SkipToken, skipToken } from '@reduxjs/toolkit/dist/query'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NoResultsOverlay } from '../../../common/components/NoResultsOverlay'
import { NoRowsOverlay } from '../../../common/components/NoRowsOverlay'
import { convertDateToStringDate } from '../../../common/utilities'
import { Patient } from '../../../patient/types'
import { Survey, SurveyFilter } from '../../common/types/survey.type'
import { donwloadExcel } from '../api/surveyApi'
import { useGetSurveysQuery } from '../slices/surveyQuerySlice'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SurveyGrid = () => {
  const navigate = useNavigate()

  const initialPatient: Patient = {
    patientId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    email: '',
    gender: '',
    weight: 0,
    height: 0,
    _birthDate: new Date(),
    _gender: null,
  }

  const surveyLocalFilter: SurveyFilter = {
    surveyId: '',
    patient: initialPatient,
    answers: [],
    createdAt: '',
    updatedAt: '',
    calculatedScore: 0,
    patientId: '',
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<SurveyFilter | SkipToken>(skipToken)

  const columns: GridColDef[] = [
    {
      field: 'surveyId',
      headerName: 'id',
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 140,
      renderCell: (cellValues) => {
        return (
          <Button
            startIcon={<Edit />}
            sx={{ width: 140 }}
            variant="contained"
            color="colorLevel4White"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => {
              navigate(`/backoffice/surveys/${cellValues.id}`)
            }}
          >
            Ver
          </Button>
        )
      },
    },

    {
      field: 'patient',
      headerName: 'Paciente',
      width: 300,
      renderCell: (cellValues) => {
        return `${cellValues.row.patient.lastName}, ${cellValues.row.patient.firstName} `
      },
    },
    {
      field: 'createdAt',
      headerName: 'Fecha',
      width: 200,
      renderCell: (cellValues) => {
        return convertDateToStringDate(
          new Date(cellValues.row.createdAt),
          'dd/MM/yyyy HH:mm'
        )
      },
    },
    {
      field: 'calculatedScore',
      headerName: 'Score',
      width: 200,
    },
  ]

  const getTogglableColumns = (columns: GridColDef[]) => {
    // hide the column with field `id` from list of togglable columns
    return columns
      .filter((column) => column.field !== '_id')
      .map((column) => column.field)
  }

  const formik = useFormik({
    // validationSchema: validationSchema,
    initialValues: surveyLocalFilter,
    onSubmit: async (values: SurveyFilter) => {
      setFilter(values)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: (values: SurveyFilter) => {
      console.log(values)
      formik.resetForm
      setFilter(skipToken)
    },
  })

  const { isFetching, data } = useGetSurveysQuery(filter)

  return (
    <>
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Accordion sx={{ mb: 1 }} disableGutters={true} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Filtros - Encuestas</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container direction={{ xs: 'column', md: 'row' }} spacing={1}>
              {/* <Grid item sm={4}>
                <TextField
                  name="survey"
                  label="Pregunta"
                  variant="standard"
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.survey && Boolean(formik.errors.survey)}
                  helperText={formik.touched.survey && formik.errors.survey}
                  value={formik.values.survey}
                  disabled={isFetching}
                /> 
              </Grid>*/}
              <Grid item sm={4}>
                <label></label>

                {/* <TextField
                  name="description"
                  label="Descripcion"
                  variant="standard"
                  fullWidth
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  value={formik.values.description}
                  disabled={isFetching}
                /> */}
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
                  disabled={isFetching}
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
                  disabled={isFetching}
                  fullWidth
                  variant="contained"
                >
                  Limpiar
                </Button>
              </Grid>

              <Grid item xs={2} sx={{ mt: 2, ml: { md: 1, xl: 1, xs: 0 } }}>
                <Button
                  fullWidth
                  startIcon={<Add />}
                  variant="contained"
                  disabled={isFetching}
                  onClick={() => {
                    navigate('/')
                  }}
                >
                  Nuevo
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>

      <Grid container direction={{ xs: 'column', md: 'row' }} spacing={1}>
        <Grid item xs={2} sx={{ mt: 2, ml: { md: 1, xl: 1, xs: 0 } }}>
          <Button
            fullWidth
            startIcon={<Download />}
            variant="outlined"
            disabled={isFetching}
            onClick={async () => {
              await donwloadExcel().then((result) => {
                console.log(result)
              })
            }}
          >
            Exportar
          </Button>
        </Grid>
      </Grid>

      <DataGrid
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          surveyId: false,
        }}
        disableColumnSelector
        slotProps={{
          columnsPanel: {
            getTogglableColumns,
          },
        }}
        sx={{
          backgroundColor: 'white',
          mt: 1,
        }}
        getRowId={(row: Survey) => row.surveyId}
        rows={filter === skipToken ? [] : data ?? []}
        columns={columns}
        // pageSize={50}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoResultsOverlay,
          //toolbar: GridToolbar,
        }}
        // rowsPerPageOptions={[50]}
        loading={isFetching}
        // error={error}
        // onRowClick={(
        //   params: GridRowParams,
        //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //   event: MuiEvent<React.MouseEvent>,
        //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //   details: GridCallbackDetails
        // ) => {
        //   // setSelectedPatient(params.row)
        // }}
        // components={{
        //   NoRowsOverlay: () => (
        //     <Stack height="100%" alignItems="center" justifyContent="center">
        //       Sin Datos
        //     </Stack>
        //   ),
        //   NoResultsOverlay: () => (
        //     <Stack height="100%" alignItems="center" justifyContent="center">
        //       Sin Resultados
        //     </Stack>
        //   ),
        // }}
      />
    </>
  )
}
