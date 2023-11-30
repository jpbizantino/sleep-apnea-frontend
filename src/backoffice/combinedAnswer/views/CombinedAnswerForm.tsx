import {
  Add,
  Close,
  Delete,
  DeleteOutline,
  Save,
  ThumbUpOffAlt,
} from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { CustomSnackbar } from '../../../common/components/CustomSnackbar'
import { Loader } from '../../../common/components/Loader'
import { OperatorType } from '../../../common/enum/calculatedFiled.enus'
import {
  AlertOption,
  CalculatedField,
  GenericDictionary,
  Question,
} from '../../../common/types'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { questionText } from '../../question/helper/question.helper'
import { useGetSingleResultsQuestionsQuery } from '../../question/slices/questionQuerySlice'
import { OperatorTypeCombo } from '../components'
import { QuestionCombo } from '../components/QuestionCombo'
import {
  useCreateCalculatedFieldMutation,
  useDeleteCalculatedFieldMutation,
  useGetCalculatedFieldQuery,
  useUpdateCalculatedFieldMutation,
} from '../slices/combinedAnsweQuerySlice'

const validationSchema = yup.object({
  name: yup.string().required('Ingrese un nombre'),
  scoreToAdd: yup
    .number()
    .required('Ingrese un valor')
    .min(1, 'El valor debe ser entre 1 y 10')
    .max(10, 'El valor debe ser entre 1 y 10'),
  questions: yup.array().min(2, 'Ingrese al menos 2 opciones'),
})

export const CombinedAnswerForm = () => {
  const navigate = useNavigate()

  // Get de URL Param

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { calculatedFieldId } = useParams()

  const [createCalculatedField, { isLoading: isLoadingCreate }] =
    useCreateCalculatedFieldMutation()

  const [updateCalculatedField, { isLoading: isLoadingUpdate }] =
    useUpdateCalculatedFieldMutation()

  const [deleteCalculatedField, { isLoading: isLoadingDelete }] =
    useDeleteCalculatedFieldMutation()

  const { data, isFetching, isSuccess } = useGetCalculatedFieldQuery(
    calculatedFieldId ?? skipToken
  )

  const { data: questionData, isFetching: isfetchingQuestions } =
    useGetSingleResultsQuestionsQuery('')

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'error',
  })

  const [tempQuestion, setTempQuestion] = useState<Question | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  let initialValue: CalculatedField = {
    name: '',
    calculatedFieldId: '',
    questions: [],
    operator: OperatorType.OR,
    scoreToAdd: 0,
  }

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values: CalculatedField) => {
      setAlert({
        isAlertOpen: false,
        message: '',
        color: 'info',
      })

      if (values.calculatedFieldId == '') {
        createCalculatedField(values)
          .unwrap()
          .then((result: CalculatedField) => {
            formik.setFieldValue('questionId', result.calculatedFieldId)
            setAlert({
              isAlertOpen: true,
              message: 'Datos guardados exitosamente',
              color: 'success',
            })
          })
          .catch((error) => {
            setAlert({
              isAlertOpen: true,
              message: error.data.message,
              color: 'error',
            })
          })
      } else {
        updateCalculatedField(values)
          .unwrap()
          .then(() => {
            setAlert({
              isAlertOpen: true,
              message: 'Datos modificados exitosamente',
              color: 'success',
            })
          })
          .catch((error) => {
            setAlert({
              isAlertOpen: true,
              message: error.data.message,
              color: 'error',
            })
          })
      }
    },

    onReset: (values: CalculatedField) => {
      initialValue = values
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const DeleteCalculatedField = () => {
    return (
      <Dialog fullWidth open={openDeleteDialog}>
        <DialogTitle>¿Desea eliminar el registro?</DialogTitle>

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
                disabled={isLoadingDelete}
                variant="outlined"
                onClick={() => {
                  setOpenDeleteDialog(false)
                }}
              >
                Cerrar
              </Button>
            </Grid>

            <Grid item>
              <Button
                startIcon={<ThumbUpOffAlt />}
                disabled={isLoadingDelete}
                variant="contained"
                onClick={() => {
                  deleteCalculatedField(formik.values)
                    .unwrap()
                    .then((result: CalculatedField) => {
                      formik.setFieldValue(
                        'questionId',
                        result.calculatedFieldId
                      )
                      navigate(-1)
                    })
                    .catch((error) => {
                      setAlert({
                        isAlertOpen: true,
                        message: error.data.message,
                        color: 'error',
                      })
                    })
                }}
              >
                CONFIRMAR
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    )
  }

  const handleQuestion = (question: Question) => {
    const index = formik.values.questions.findIndex(
      (a) => a.questionId === question.questionId
    )

    const tempQuestions = [...formik.values.questions]

    if (index < 0) {
      tempQuestions.push(question)
      formik.setFieldValue('questions', tempQuestions)
    } else {
      tempQuestions[index] = question
      formik.setFieldValue('questions', tempQuestions)
    }
  }

  const handleDeleteQuestion = (question: Question) => {
    const index = formik.values.questions.findIndex(
      (a) => a.questionId === question.questionId
    )

    setAlert({
      isAlertOpen: false,
      message: '',
      color: 'info',
    })

    if (index < 0) {
      setAlert({
        isAlertOpen: true,
        message: 'Error al eliminar item',
        color: 'error',
      })
    } else {
      formik.setFieldValue(
        'questions',
        formik.values.questions.filter(
          (p) => p.questionId !== question.questionId
        )
      )
    }
  }

  const InternalChoiceCard = (props: { question: Question }) => {
    return (
      <>
        <Paper elevation={1} sx={{ mt: 1, p: 1 }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              verticalAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              columns={12}
              spacing={1}
              rowSpacing={1}
              sx={{
                justify: 'center',
                alignItems: 'center',
                minHeight: '100%',
              }}
            >
              <Grid item xs={12} sm={10} md={10}>
                <Typography variant="caption">Pregunta</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {questionText(props.question)}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={2} md={2}>
                <Button
                  startIcon={<Delete />}
                  fullWidth
                  onClick={() => {
                    handleDeleteQuestion(props.question)
                  }}
                >
                  Eliminar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </>
    )
  }

  const InternalQuestionList = () => {
    return (
      <>
        <Grid container columns={12} spacing={1}>
          <Grid item xs={12} md={10}>
            <QuestionCombo
              label="Pregunta a incluir"
              name="question"
              disabled={isfetchingQuestions}
              value={tempQuestion}
              error={formik.errors.operator}
              helperText={formik.touched.operator && formik.errors.operator}
              onChange={(_: unknown, value: Question) => {
                if (value) {
                  setTempQuestion(value)
                }
              }}
              questions={questionData ?? []}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              // variant="contained"
              onClick={() => {
                if (tempQuestion) {
                  handleQuestion(tempQuestion)
                  setTempQuestion(null)
                }
              }}
            >
              <Add />
              Agregar
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ pt: 2 }}>
            {formik.values.questions.map((item: Question) => {
              return (
                <div key={item.questionId}>
                  <InternalChoiceCard question={item} />
                </div>
              )
            })}
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <>
      <BackofficePage>
        <Loader
          open={
            isFetching || isLoadingCreate || isLoadingUpdate || isLoadingDelete
          }
        />
        <CustomSnackbar alert={alert} />
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Box sx={{ mt: 1 }}>
            <Accordion
              expanded={true}
              sx={{ m: 1, p: 1 }}
              disableGutters={true}
              //onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary>
                <Typography variant="h6">
                  {formik.values.calculatedFieldId
                    ? 'Editar Respuesta Combinada'
                    : 'Nueva Respuesta Combinada'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ pb: 2 }}>
                  <InternalQuestionList />
                  {formik.errors.questions && formik.touched.questions && (
                    <Typography
                      color="error"
                      variant="caption"
                      //fontWeight="bold"
                      display="block"
                    >
                      {formik.errors.questions as string}
                    </Typography>
                  )}
                </Box>

                <Grid container columns={12} spacing={1} rowSpacing={1}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      label="Nombre"
                      variant="standard"
                      fullWidth
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      value={formik.values.name}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <OperatorTypeCombo
                      label="Operador"
                      name="operator"
                      disabled={false}
                      value={formik.values.operator}
                      error={formik.errors.operator}
                      helperText={
                        formik.touched.operator && formik.errors.operator
                      }
                      onChange={(_: unknown, value: GenericDictionary) => {
                        formik.setFieldValue('operator', value.name)
                      }}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      name="scoreToAdd"
                      label="Score a sumar"
                      variant="standard"
                      type="number"
                      fullWidth
                      value={formik.values.scoreToAdd}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.scoreToAdd &&
                        Boolean(formik.errors.scoreToAdd)
                      }
                      helperText={
                        formik.touched.scoreToAdd && formik.errors.scoreToAdd
                      }
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction={{ xs: 'column', md: 'row' }}
                  justifyContent={'space-between'}
                  sx={{ mb: 1, mt: 1 }}
                >
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      startIcon={<Close />}
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        navigate(-1)
                      }}
                    >
                      Cerrar
                    </Button>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      startIcon={<DeleteOutline />}
                      fullWidth
                      onClick={() => setOpenDeleteDialog(true)}
                      disabled={formik.values.calculatedFieldId ? false : true}
                    >
                      Eliminar
                    </Button>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      startIcon={<Save />}
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </form>
        <DeleteCalculatedField />
      </BackofficePage>
    </>
  )
}
