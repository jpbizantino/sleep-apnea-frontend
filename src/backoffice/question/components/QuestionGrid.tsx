import {
  Add,
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  CleaningServices,
  Edit,
  ExpandMore,
  Search,
  Unpublished,
  Straight,
  Merge,
  Workspaces,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  IconButton,
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
import {
  ProcessingRuleEnum,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { translateQuestionType } from '../../../common/enum/question.enum'
import { Question, QuestionFilter } from '../../../common/types'
import {
  useGetQuestionsQuery,
  useMoveDownQuestionMutation,
  useMoveUpQuestionMutation,
} from '../slices/questionQuerySlice'
import { Loader } from '../../../common/components/Loader'
import { scoreActionEnum } from '../../../common/enum/scoreAction.enum'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const QuestionGrid = () => {
  const navigate = useNavigate()

  const patientLocalFilter: QuestionFilter = {
    question: '',
    description: '',
    questionId: '',
    imageLink: '',
    active: false,
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<QuestionFilter | SkipToken>(
    patientLocalFilter
  )

  const [moveUpQuestion, { isLoading: isLoadingUp }] =
    useMoveUpQuestionMutation()

  const [moveDownQuestion, { isLoading: isLoadingDown }] =
    useMoveDownQuestionMutation()

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
      width: 120,
      renderCell: (cellValues) => {
        const { valueA, valueB, scoreToAdd, processingRule } = cellValues.value

        if (processingRule == ProcessingRuleEnum.BETWEEN)
          return `${translateProcessingRule(
            processingRule
          )} ${valueA} y ${valueB} ::: ${scoreToAdd}`
        else
          return `${translateProcessingRule(
            processingRule
          )} ${valueA} :::  ${scoreToAdd}`
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
    {
      field: 'order',
      headerName: 'Orden',
      width: 120,
      renderCell: (cellValues) => {
        return (
          <>
            <Typography sx={{ mr: 1 }}> {cellValues.row.order}</Typography>

            <IconButton
              onClick={async () => {
                await moveUpQuestion(cellValues.row)
              }}
            >
              <ArrowUpward />
            </IconButton>

            <IconButton
              onClick={async () => {
                await moveDownQuestion(cellValues.row)
              }}
            >
              <ArrowDownward />
            </IconButton>
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
    onSubmit: async (values: QuestionFilter) => {
      setFilter(values)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: () => {
      formik.resetForm
      setFilter(skipToken)
    },
  })

  const { isFetching, data } = useGetQuestionsQuery(filter)

  return (
    <>
      <Loader open={isLoadingDown || isLoadingUp} />
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Accordion sx={{ mb: 1 }} disableGutters={true} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Filtros - Preguntas</Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container direction={{ xs: 'column', md: 'row' }} spacing={1}>
              <Grid item sm={4}>
                <TextField
                  name="question"
                  label="Pregunta"
                  variant="standard"
                  fullWidth
                  onChange={formik.handleChange}
                  error={
                    formik.touched.question && Boolean(formik.errors.question)
                  }
                  helperText={formik.touched.question && formik.errors.question}
                  value={formik.values.question}
                  disabled={isFetching}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
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
                    navigate('/backoffice/questions/new')
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
        getRowId={(row: Question) => row.questionId}
        rows={filter === skipToken ? [] : data ?? []}
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
