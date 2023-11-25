import {
  Add,
  CheckCircle,
  CleaningServices,
  Edit,
  ExpandMore,
  Merge,
  Search,
  Straight,
  Unpublished,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../common/components/Loader'
import { NoResultsOverlay } from '../../../common/components/NoResultsOverlay'
import { NoRowsOverlay } from '../../../common/components/NoRowsOverlay'
import {
  ProcessingRule,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { translateQuestionType } from '../../../common/enum/question.enum'
import {
  CalculatedField,
  Question,
  QuestionFilter,
} from '../../../common/types'
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
      field: 'questionId',
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
              navigate(`/backoffice/questions/${cellValues.id}`)
            }}
          >
            Editar
          </Button>
        )
      },
    },
    {
      field: 'question',
      headerName: 'Pregunta',
      width: 400,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 250,
    },
    {
      field: 'questionType',
      headerName: 'Tipo de Pregunta',
      width: 150,
      renderCell: (cellValues) => {
        return translateQuestionType(cellValues.value)
      },
    },
    {
      field: 'singleResult',
      headerName: 'Resultado',
      width: 100,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.rule.singleResult ? (
              <Tooltip title="Resultado Simple" followCursor>
                <Straight color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Resultado Combinado" followCursor>
                <Merge color="warning" />
              </Tooltip>
            )}
          </>
        )
      },
    },
    {
      field: 'rule',
      headerName: 'Regla',
      width: 100,
      renderCell: (cellValues) => {
        const ruleType = cellValues.value.processingRule

        if (ruleType == ProcessingRule.BETWEEN)
          return `${translateProcessingRule(ruleType)} ${
            cellValues.value.valueA
          } y ${cellValues.value.valueB} ::: ${cellValues.value.scoreToAdd}`
        else
          return `${translateProcessingRule(ruleType)} ${
            cellValues.value.valueA
          } :::  ${cellValues.value.scoreToAdd}`
      },
    },
    {
      field: 'active',
      headerName: 'Estado',
      align: 'center',
      width: 100,
      //valueGetter: (params: GridValueGetterParams) => params.row.inactive ? 'INACTIVO' : 'ACTIVO'
      renderCell: (cellValues) => {
        const user: Question = cellValues.row

        return (
          <>
            {user.active ? (
              <Tooltip title="Pregunta Activa" followCursor>
                <CheckCircle color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Pregunta Inactiva" followCursor>
                <Unpublished color="disabled" />
              </Tooltip>
            )}
          </>
        )
      },
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
    initialValues: patientLocalFilter,
    onSubmit: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: () => {},
  })

  const { isFetching, data } = useGetCalculatedFieldsQuery(null)

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
          questionId: false,
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
