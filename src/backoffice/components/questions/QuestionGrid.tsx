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
  TextField,
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
  ProcessingRule,
  translateProcessingRule,
} from '../../../common/enum/processingRule.enum'
import { translateQuestionType } from '../../../common/enum/question.enum'
import { Question, QuestionFilter } from '../../../common/types'
import { useGetQuestionsQuery } from '../../slices/questionQuerySlice'

// const validationSchema = yup.object({
//   question: yup.number().optional(),
//   nameTwo: yup.string(),
//   nameOne: yup.string(),
// })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const QuestionGrid = () => {
  const navigate = useNavigate()

  const patientLocalFilter: QuestionFilter = {
    question: '',
    description: '',
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filter, setFilter] = useState<QuestionFilter | SkipToken>(skipToken)

  const columns: GridColDef[] = [
    {
      field: '_id',
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
      width: 500,
    },
    {
      field: 'description',
      headerName: 'Descripción',
      width: 300,
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
      field: 'rule',
      headerName: 'Regla Procesamiento',
      width: 150,
      renderCell: (cellValues) => {
        const ruleType = cellValues.value.processingRule

        if (ruleType == ProcessingRule.BETWEEN)
          return `${translateProcessingRule(ruleType)} ${
            cellValues.value.valueA
          } y ${cellValues.value.valueB}`
        else
          return `${translateProcessingRule(ruleType)} ${
            cellValues.value.valueA
          }`
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
      console.log(values)
      setFilter(values)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset: (values: QuestionFilter) => {
      console.log(values)
      formik.resetForm
      setFilter(skipToken)
    },
  })

  const { isFetching, data } = useGetQuestionsQuery(filter)

  return (
    <>
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
          _id: false,
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
        getRowId={(row: Question) => row._id}
        rows={data ?? []}
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
