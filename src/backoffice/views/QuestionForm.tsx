import { Add, Close, Save } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { Loader } from '../../common/components/Loader'
import {
  AlertOption,
  Choice,
  GenericDictionary,
  Question,
} from '../../common/types'
import { QuestionType } from '../../common/enum/question.enum'
import { ChoiceModal } from '../components/questions/ChoiceModal'
import { useBackoffice } from '../hooks/userBackoffice'
import { BackofficePage } from '../pages/BackofficePage'
import {
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} from '../slices/questionQuerySlice'
import { CustomSnackbar } from '../../common/components/CustomSnackbar'
import { Rule } from '../../common/types/rule.type'
import { ProcessingRule } from '../../common/enum/processingRule.enum'
import { QuestionTypeCombo } from '../components/questions'
import { RuleTypeCombo } from '../components/questions/RuleTypeCombo'

const ruleSchema = yup.object().shape({
  processingRule: yup.string().required('Seleccione una regla'),
  valueA: yup
    .number()
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser entre 0 y 10')
    .max(10, 'El valor debe ser entre 0 y 10'),
  valueB: yup
    .number()
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser entre 0 y 10')
    .max(10, 'El valor debe ser entre 0 y 10'),
})

const validationSchema = yup.object({
  question: yup.string().trim().required('El campo es requerido'),
  description: yup.string().trim().required('El campo es requerido'),
  rule: ruleSchema,
})

export const QuestionForm = () => {
  const navigate = useNavigate()
  const {
    setSelectedQuestion,
    openNewChoice,
    toggleChoiceModal,
    setSelectedChoice,
  } = useBackoffice()

  //Get de URL Param
  const { questionId } = useParams()

  const [createQuestion, { isLoading: isLoadingCreate }] =
    useCreateQuestionMutation()
  const [updateQuestion, { isLoading: isLoadingUpdate }] =
    useUpdateQuestionMutation()
  const { data, isFetching, isSuccess } = useGetQuestionQuery(
    questionId ?? skipToken
  )
  const [buttonClicked, setButtonClicked] = useState<string | null>(null)

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'error',
  })

  const rule: Rule = {
    processingRule: ProcessingRule.DATA_AS_RECEIVED,
    valueA: 0,
    valueB: 0,
  }

  let initialValue: Question = {
    _id: '',
    question: '',
    description: '',
    order: 0,
    questionType: QuestionType.FIX_NUMBER,
    images: [],
    choices: [],
    rule: rule,
  }

  const processValues = (values: Question): Question => {
    return {
      ...values,
      question: values.question.trim().toUpperCase(),
      description: values.description.trim().toUpperCase(),
    }
  }

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values: Question) => {
      setAlert({
        isAlertOpen: false,
        message: '',
        color: 'info',
      })

      if (values._id == '') {
        createQuestion(processValues(values))
          .unwrap()
          .then(() => {
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
        updateQuestion(processValues(values))
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

    onReset: (values: Question) => {
      initialValue = values
    },
  })

  useEffect(() => {
    if (data) {
      formik.setValues(data)
      setSelectedQuestion(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChoice = (choice: Choice) => {
    console.log(choice)

    const index = formik.values.choices.findIndex((a) => a._id === choice._id)

    const tempChoices = [...formik.values.choices]

    if (index < 0) {
      tempChoices.push(choice)
      formik.setFieldValue('choices', tempChoices)
    } else {
      tempChoices[index] = choice
      formik.setFieldValue('choices', tempChoices)
    }
  }

  const handleDeleteChoice = (choice: Choice) => {
    const index = formik.values.choices.findIndex((a) => a._id === choice._id)

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
        formik.values.choices.filter((p) => p._id !== choice._id)
      )
    }
  }

  const InternalChoiceCard = (props: { choice: Choice }) => {
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
              <Grid item xs={6}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.description}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.choiceValue}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
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
              <Grid item xs={2}>
                <Button
                  fullWidth
                  onClick={() => {
                    setSelectedChoice(null)
                    handleDeleteChoice(props.choice)
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

  const InternalChoiceList = () => {
    return (
      <>
        <Grid container columns={12}>
          <Grid item xs={12}>
            <Button onClick={() => openNewChoice()}>
              <Add />
              Nueva opción
            </Button>
          </Grid>
          <Grid item xs={12}>
            {formik.values.choices.map((item: Choice) => {
              return (
                <div key={item._id}>
                  <InternalChoiceCard choice={item} />
                </div>
              )
            })}
          </Grid>
        </Grid>
        <ChoiceModal handleChoice={handleChoice} />
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
                  {formik.values._id ? 'Editar Pregunta' : 'Nueva Pregunta'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid
                  container
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1}
                  rowSpacing={1}
                  columns={12}
                >
                  <Grid item xs={12}>
                    <TextField
                      name="question"
                      label="Pregunta"
                      variant="standard"
                      fullWidth
                      onChange={formik.handleChange}
                      error={
                        formik.touched.question &&
                        Boolean(formik.errors.question)
                      }
                      helperText={
                        formik.touched.question && formik.errors.question
                      }
                      value={formik.values.question}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Descripción"
                      variant="standard"
                      fullWidth
                      multiline
                      minRows={1}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      value={formik.values.description}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <QuestionTypeCombo
                      label="Tipo de Pregunta"
                      name="questionType"
                      disabled={false}
                      value={formik.values.questionType}
                      error={formik.errors.questionType}
                      helperText={
                        formik.touched.questionType &&
                        formik.errors.questionType
                      }
                      onChange={(_: unknown, value: GenericDictionary) => {
                        formik.setFieldValue('questionType', value.name)
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      {formik.values.questionType == QuestionType.CHOICE && (
                        <Box sx={{ pt: 1, pb: 4 }}>
                          <InternalChoiceList />
                        </Box>
                      )}
                    </>
                  </Grid>

                  <Grid item xs={3}>
                    <RuleTypeCombo
                      label="Regla de procesamiento"
                      name="rule.processingRule"
                      disabled={false}
                      value={formik.values.rule.processingRule}
                      error={formik.errors.rule?.processingRule}
                      helperText={
                        formik.touched.rule?.processingRule &&
                        formik.errors.rule?.processingRule
                      }
                      onChange={(_: unknown, value: GenericDictionary) => {
                        formik.setFieldValue('rule', {
                          ...rule,
                          processingRule: value.name,
                        })
                      }}
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
                      onChange={formik.handleChange}
                      error={
                        formik.touched.rule?.valueA &&
                        Boolean(formik.errors.rule?.valueA)
                      }
                      helperText={
                        formik.touched.rule?.valueA &&
                        formik.errors.rule?.valueA
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
                      disabled={[ProcessingRule.BETWEEN].some(
                        (p) => p !== formik.values.rule.processingRule
                      )}
                      value={formik.values.rule.valueB}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.rule?.valueB &&
                        Boolean(formik.errors.rule?.valueB)
                      }
                      helperText={
                        formik.touched.rule?.valueB &&
                        formik.errors.rule?.valueB
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
                  {/* <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      onClick={() => setButtonClicked('saveAndNew')}
                      startIcon={<Save />}
                      fullWidth
                      variant="contained"
                      type="submit"
                    >
                      Guardar y Nuevo
                    </Button>
                  </Grid> */}
                  <Grid item xs={2} sx={{ mt: 2, ml: { xl: 1, xs: 0 } }}>
                    <Button
                      onClick={() => setButtonClicked('save')}
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
