import { Add, Close, Delete, Edit, Save } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
import { OperatorTypeCombo, QuestionModal } from '../components'
import {
  useCreateCalculatedFieldMutation,
  useGetCalculatedFieldQuery,
  useUpdateCalculatedFieldMutation,
} from '../slices/combinedAnsweQuerySlice'

const ruleSchema = yup.object().shape({
  question: yup.array().min(2, 'Ingrese al menos 2 opciones'),

  scoreToAdd: yup
    .number()
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser entre 0 y 10')
    .max(10, 'El valor debe ser entre 0 y 10'),
})

const validationSchema = yup.object({
  question: yup.string().trim().required('El campo es requerido'),
  description: yup.string().trim().required('El campo es requerido'),
  rule: ruleSchema,
  // choices: yup.array().min(2, 'Ingrese al menos 2 opciones'),
})

export interface QuestionModalProps {
  open: boolean
  question: Question | null
  handleQuestion: any
}

export const CombinedAnswerForm = () => {
  const navigate = useNavigate()

  // Get de URL Param
  const { combinedAnswerId } = useParams()

  const [createCalculatedField, { isLoading: isLoadingCreate }] =
    useCreateCalculatedFieldMutation()
  const [updateCalculatedField, { isLoading: isLoadingUpdate }] =
    useUpdateCalculatedFieldMutation()
  const { data, isFetching, isSuccess } = useGetCalculatedFieldQuery(
    combinedAnswerId ?? skipToken
  )

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'error',
  })

  let initialValue: CalculatedField = {
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

  const handleDeleteQuestion = (choice: Question) => {
    const index = formik.values.questions.findIndex(
      (a) => a.questionId === choice.questionId
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
        'choices',
        formik.values.questions.filter(
          (p) => p.questionId !== choice.questionId
        )
      )
    }
  }

  const InternalChoiceCard = (props: { choice: Question }) => {
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
              <Grid item xs={12} sm={4} md={4}>
                <Typography variant="caption">Descripción</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.question}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="caption">Valor</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.rule.processingRule}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="caption">Orden</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.rule.valueA}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  startIcon={<Edit />}
                  // variant="outlined"
                  fullWidth
                  onClick={() => {
                    setSelectedChoice(props.choice)
                    toggleChoiceModal()
                  }}
                >
                  Editar
                </Button>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Button
                  startIcon={<Delete />}
                  fullWidth
                  onClick={() => {
                    handleDeleteQuestion(props.choice)
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

  const [questionModal, setQuestionModal] = useState<QuestionModalProps>({
    open: false,
    question: null,
    handleQuestion,
  })

  const InternalChoiceList = () => {
    return (
      <>
        <Grid container columns={12}>
          <Grid item xs={12}>
            <Button
              onClick={() => setQuestionModal({ ...questionModal, open: true })}
            >
              <Add />
              Nueva pregunta
            </Button>
          </Grid>
          <Grid item xs={12}>
            {formik.values.questions.map((item: Question) => {
              return (
                <div key={item.questionId}>
                  <InternalChoiceCard choice={item} />
                </div>
              )
            })}
          </Grid>
        </Grid>
        <QuestionModal
          questionModal={questionModal}
          setQuestionModal={setQuestionModal}
        />
      </>
    )
  }

  return (
    <>
      <BackofficePage>
        <Loader open={isFetching || isLoadingCreate || isLoadingUpdate} />
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
                <Box sx={{ pt: 1, pb: 4 }}>
                  <InternalChoiceList />
                </Box>
                <Grid container>
                  <Grid item xs={3}>
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
      </BackofficePage>
    </>
  )
}
