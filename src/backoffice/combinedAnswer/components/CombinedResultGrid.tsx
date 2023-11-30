import {
  Add,
  CleaningServices,
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
import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/components/Loader'
import { NoResultsOverlay } from '../../../common/components/NoResultsOverlay'
import { NoRowsOverlay } from '../../../common/components/NoRowsOverlay'
import { CalculatedField, QuestionFilter } from '../../../common/types'
import { useGetCalculatedFieldsQuery } from '../slices/combinedAnsweQuerySlice'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CombinedAnswerGrid = () => {
  const navigate = useNavigate()

  const patientLocalFilter: QuestionFilter = {
    question: '',
    description: '',
    questionId: '',
    imageLink: '',
    active: false,
  }

  const columns: GridColDef[] = [
    {
      field: 'calculatedFieldId',
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
              navigate(
                `/backoffice/combinedAnswer/${cellValues.row.calculatedFieldId}`
              )
            }}
          >
            Editar
          </Button>
        )
      },
    },
    {
      field: 'operator',
      headerName: 'Operador',
      width: 200,
    },
    {
      field: 'scoreToAdd',
      headerName: 'score',
      width: 200,
    },
    {
      field: 'questions',
      headerName: 'Preguntas',
      width: 150,
      renderCell: (cellValues) => {
        return cellValues.row.questions ? cellValues.row.questions.length : 0
      },
    },
  ]

  const getTogglableColumns = (columns: GridColDef[]) => {
    // hide the column with field `id` from list of togglable columns
    return columns
      .filter((column) => column.field !== 'calculatedFieldId')
      .map((column) => column.field)
  }

  const formik = useFormik({
    // validationSchema: validationSchema,
    initialValues: patientLocalFilter,
    onSubmit: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: () => {},
  })

  const { isFetching, data } = useGetCalculatedFieldsQuery(null)

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <>
      <Loader open={isFetching} />
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Accordion sx={{ mb: 1 }} disableGutters={true} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">
              Filtros - Respuestas Combinadas
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
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
                    navigate('/backoffice/combinedAnswer/new')
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
          calculatedFieldId: false,
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
        getRowId={(row: CalculatedField) => row.calculatedFieldId}
        rows={data ?? []}
        columns={columns}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          noResultsOverlay: NoResultsOverlay,
        }}
        loading={isFetching}
      />
    </>
  )
}
