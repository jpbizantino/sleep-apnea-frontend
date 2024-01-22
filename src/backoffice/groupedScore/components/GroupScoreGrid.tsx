import {
  Add,
  CleaningServices,
  Edit,
  ExpandMore,
  Merge,
  Search,
  Straight,
  Workspaces,
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
import { CombinedField, QuestionFilter } from '../../../common/types'
import { useGetCombinedFieldsQuery } from '../slices/GroupScoreQuerySlice'
import {
  ProcessingRuleEnum,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { scoreActionEnum } from '../../../common/enum/scoreAction.enum'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GroupScoreGrid = () => {
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
      field: 'combinedFieldId',
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
                `/backoffice/groupedScore/${cellValues.row.combinedFieldId}`
              )
            }}
          >
            Editar
          </Button>
        )
      },
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 500,
    },
    {
      field: 'singleResult',
      headerName: 'Resultado',
      width: 100,
      renderCell: (cellValues) => {
        return (
          <>
            {cellValues.row.rule.scoreAction ==
              scoreActionEnum.ADD_TO_FINAL_SCORE && (
              <Tooltip title="Resultado Simple" followCursor>
                <Straight color="success" />
              </Tooltip>
            )}
            {cellValues.row.rule.scoreAction ==
              scoreActionEnum.COMBINE_SCORE && (
              <Tooltip title="Resultado Combinado" followCursor>
                <Merge color="warning" />
              </Tooltip>
            )}
            {cellValues.row.rule.scoreAction == scoreActionEnum.GROUP_SCORE && (
              <Tooltip title="Resultado Agrupado" followCursor>
                <Workspaces color="info" />
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

        if (ruleType == ProcessingRuleEnum.BETWEEN)
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
      .filter((column) => column.field !== 'combinedFieldId')
      .map((column) => column.field)
  }

  const formik = useFormik({
    // validationSchema: validationSchema,
    initialValues: patientLocalFilter,
    onSubmit: async () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: () => {},
  })

  const { isFetching, data } = useGetCombinedFieldsQuery(null)

  return (
    <>
      <Loader open={isFetching} />
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Accordion sx={{ mb: 1 }} disableGutters={true} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Filtros - Score Agrupado</Typography>
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
                    navigate('/backoffice/groupedScore/new')
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
          combinedFieldId: false,
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
        getRowId={(row: CombinedField) => row.combinedFieldId}
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
