import {
  Add,
  Close,
  Delete,
  DeleteOutline,
  ExpandMore,
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
import { ProcessingRuleEnum } from '../../../common/enum/processingRule.enum'
import { scoreActionEnum } from '../../../common/enum/scoreAction.enum'
import {
  AlertOption,
  GroupedField,
  GenericDictionary,
  Question,
  Rule,
} from '../../../common/types'
import { QuestionCombo } from '../../combinedAnswer/components/QuestionCombo'
import { ScoreActionCombo } from '../../common/components/ScoreActionCombo'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { RuleTypeCombo } from '../../question/components'
import { questionText } from '../../question/helper/question.helper'
import { useGetGroupScoreQuestionsQuery } from '../../question/slices/questionQuerySlice'
import {
  useCreateGroupedFieldMutation,
  useUpdateGroupedFieldMutation,
  useDeleteGroupedFieldMutation,
  useGetGroupedFieldQuery,
} from '../slices'
import { lightBlue } from '@mui/material/colors'

// const ruleValidation = yup.object({
//   scoreToAdd: yup
//     .number()
//     .required('Ingrese un valor')
//     .min(1, 'El valor debe ser entre 1 y 10')
//     .max(10, 'El valor debe ser entre 1 y 10'),
// })

const validationSchema = yup.object({
  name: yup.string().required('Ingrese un nombre'),
  questions: yup.array().min(2, 'Ingrese al menos 2 opciones'),
  //rule: ruleValidation,
})

export const GroupScoreForm = () => {
  const navigate = useNavigate()

  // Get de URL Param

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { groupedFieldId } = useParams()

  const [createGroupedField, { isLoading: isLoadingCreate }] =
    useCreateGroupedFieldMutation()

  const [updateGroupedField, { isLoading: isLoadingUpdate }] =
    useUpdateGroupedFieldMutation()

  const [deleteGroupedField, { isLoading: isLoadingDelete }] =
    useDeleteGroupedFieldMutation()

  const { data, isFetching, isSuccess } = useGetGroupedFieldQuery(
    groupedFieldId ?? skipToken
  )

  const { data: questionData, isFetching: isfetchingQuestions } =
    useGetGroupScoreQuestionsQuery('')

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'error',
  })

  const [tempQuestion, setTempQuestion] = useState<Question | null>(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const rule: Rule = {
    processingRule: ProcessingRuleEnum.EQUAL,
    valueA: 0,
    valueB: 0,
    scoreToAdd: 0,
    scoreAction: scoreActionEnum.ADD_TO_FINAL_SCORE,
  }

  let initialValue: GroupedField = {
    groupedFieldId: '',
    name: '',
    questions: [],
    scoreToAdd: 0,
    rule: rule,
  }

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values: GroupedField) => {
      setAlert({
        isAlertOpen: false,
        message: '',
        color: 'info',
      })

      if (values.groupedFieldId == '') {
        createGroupedField(values)
          .unwrap()
          .then((result: GroupedField) => {
            formik.setFieldValue('questionId', result.groupedFieldId)
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
        updateGroupedField(values)
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

    onReset: (values: GroupedField) => {
      initialValue = values
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const DeleteGroupedField = () => {
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
                  deleteGroupedField(formik.values)
                    .unwrap()
                    .then((result: GroupedField) => {
                      formik.setFieldValue('questionId', result.groupedFieldId)
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
        <Paper
          elevation={1}
          sx={{ mt: 1, p: 1, backgroundColor: lightBlue[100] }}
        >
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
        <Accordion
          sx={{ mb: 1, backgroundColor: lightBlue[50] }}
          disableGutters={true}
          defaultExpanded
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Preguntas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container columns={12} spacing={1}>
              <Grid item xs={12} md={10}>
                <QuestionCombo
                  label="Pregunta a incluir"
                  name="question"
                  disabled={isfetchingQuestions}
                  value={tempQuestion}
                  error=""
                  helperText=""
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
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  return (
    <>
      <BackofficePage>
        <Paper sx={{ p: 2, m: 2 }}>
          <Loader
            open={
              isFetching ||
              isLoadingCreate ||
              isLoadingUpdate ||
              isLoadingDelete
            }
          />
          <CustomSnackbar alert={alert} />
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Typography variant="h6">
              {`${
                formik.values.groupedFieldId ? 'Editar' : 'Nuevo'
              } Score Agrupado (Suma de Scores)`}
            </Typography>

            <Box sx={{ pt: 2, pb: 2 }}>
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

              <Grid item xs={12}>
                <Typography
                  fontStyle="italic"
                  fontWeight="bold"
                  sx={{ pt: 2, pb: 2 }}
                >
                  Si la suma de los score de las preguntas incluidas es ....
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <RuleTypeCombo
                  label="Regla de procesamiento"
                  name="rule.processingRule"
                  value={formik.values.rule.processingRule}
                  error={formik.errors.rule?.processingRule}
                  helperText={
                    formik.touched.rule?.processingRule &&
                    formik.errors.rule?.processingRule
                  }
                  onChange={(_: unknown, value: GenericDictionary) => {
                    formik.setFieldValue('rule.processingRule', value.name)
                  }}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  name="rule.valueA"
                  label="Valor A"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={formik.values.rule.valueA}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'rule.valueA',
                      parseInt(event.target.value)
                    )
                  }}
                  error={
                    formik.touched.rule?.valueA &&
                    Boolean(formik.errors.rule?.valueA)
                  }
                  helperText={
                    formik.touched.rule?.valueA && formik.errors.rule?.valueA
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  name="rule.valueB"
                  label="Valor B"
                  variant="standard"
                  type="number"
                  fullWidth
                  disabled={[ProcessingRuleEnum.BETWEEN].some(
                    (p) => p !== formik.values.rule.processingRule
                  )}
                  value={formik.values.rule.valueB}
                  onChange={(event) => {
                    formik.setFieldValue(
                      'rule.valueB',
                      parseInt(event.target.value)
                    )
                  }}
                  error={
                    formik.touched.rule?.valueB &&
                    Boolean(formik.errors.rule?.valueB)
                  }
                  helperText={
                    formik.touched.rule?.valueB && formik.errors.rule?.valueB
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <ScoreActionCombo
                  name="rule.scoreAction"
                  value={formik.values.rule.scoreAction}
                  error={
                    formik.touched.rule?.scoreAction &&
                    Boolean(formik.errors.rule?.scoreAction)
                  }
                  helperText={
                    formik.touched.rule?.scoreAction &&
                    formik.errors.rule?.scoreAction
                  }
                  onChange={(_: unknown, value: GenericDictionary) => {
                    formik.setFieldValue('rule.scoreAction', value.name)
                  }}
                  label="Acción"
                  exclude={scoreActionEnum.GROUP_SCORE}
                  disabled={false}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  name="rule.scoreToAdd"
                  label="Score a sumar"
                  variant="standard"
                  type="number"
                  fullWidth
                  value={formik.values.rule.scoreToAdd}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.rule?.scoreToAdd &&
                    Boolean(formik.errors.rule?.scoreToAdd)
                  }
                  helperText={
                    formik.touched.rule?.scoreToAdd &&
                    formik.errors.rule?.scoreToAdd
                  }
                  disabled={
                    formik.values.rule.scoreAction ==
                    scoreActionEnum.COMBINE_SCORE
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
                  disabled={formik.values.groupedFieldId ? false : true}
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
          </form>
          <DeleteGroupedField />
        </Paper>
      </BackofficePage>
    </>
  )
}
