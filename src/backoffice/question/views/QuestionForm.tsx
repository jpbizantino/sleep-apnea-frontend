import { Add, Close, Delete, Edit, ExpandMore, Save } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import { skipToken } from '@reduxjs/toolkit/query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { CustomSnackbar } from '../../../common/components/CustomSnackbar'
import { Loader } from '../../../common/components/Loader'
import { ProcessingRuleEnum } from '../../../common/enum/processingRule.enum'
import { QuestionType } from '../../../common/enum/question.enum'
import { scoreActionEnum } from '../../../common/enum/scoreAction.enum'
import {
  AlertOption,
  Choice,
  GenericDictionary,
  Question,
} from '../../../common/types'
import { Rule } from '../../../common/types/rule.type'
import { ScoreActionCombo } from '../../common/components/ScoreActionCombo'
import { useBackoffice } from '../../common/hooks/userBackoffice'
import { BackofficePage } from '../../common/pages/BackofficePage'
import { QuestionTypeCombo } from '../components'
import { ChoiceModal } from '../components/ChoiceModal'
import { RuleTypeCombo } from '../components/RuleTypeCombo'
import {
  useCreateQuestionMutation,
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from '../slices/questionQuerySlice'

const ruleSchema = yup.object().shape({
  processingRule: yup.string().required('Seleccione una regla'),
  valueA: yup
    .number()
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser entre 0 y 100')
    .max(100, 'El valor debe ser entre 0 y 100'),
  valueB: yup
    .number()
    .required('Ingrese un valor')
    .min(0, 'El valor debe ser entre 0 y 100')
    .max(100, 'El valor debe ser entre 0 y 100'),
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

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    message: '',
    color: 'error',
  })

  const rule: Rule = {
    processingRule: ProcessingRuleEnum.EQUAL,
    valueA: 0,
    valueB: 0,
    scoreToAdd: 0,
    scoreAction: scoreActionEnum.ADD_TO_FINAL_SCORE,
  }

  let initialValue: Question = {
    questionId: '',
    question: '',
    description: '',
    order: 0,
    questionType: QuestionType.FIX_NUMBER,
    imageLink: '',
    choices: [],
    rule: rule,
    active: true,
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

      if (values.questionId == '') {
        createQuestion(processValues(values))
          .unwrap()
          .then((result: Question) => {
            formik.setFieldValue('questionId', result.questionId)
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
      const choice = [...data.choices].sort((a, b) => a.order - b.order)

      formik.setValues({
        ...data,
        choices: choice,
      })
      setSelectedQuestion(data)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleChoice = (choice: Choice) => {
    const index = formik.values.choices.findIndex(
      (a) => a.choiceId === choice.choiceId
    )

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
    const index = formik.values.choices.findIndex(
      (a) => a.choiceId === choice.choiceId
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
        formik.values.choices.filter((p) => p.choiceId !== choice.choiceId)
      )
    }
  }

  const InternalChoiceCard = (props: { choice: Choice }) => {
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
              <Grid item xs={12} sm={4} md={4}>
                <Typography variant="caption">Descripción</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.description}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="caption">Valor</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.choiceValue}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="caption">Orden</Typography>
                <br />
                <Typography sx={{ fontWeight: 'bold' }}>
                  {props.choice.order}
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
        <Accordion
          sx={{ mb: 1, backgroundColor: lightBlue[50] }}
          disableGutters={true}
          defaultExpanded
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6">Opciones</Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                    <div key={item.choiceId}>
                      <InternalChoiceCard key={item.choiceId} choice={item} />
                    </div>
                  )
                })}
              </Grid>
            </Grid>
            <ChoiceModal handleChoice={handleChoice} />
          </AccordionDetails>
        </Accordion>
      </>
    )
  }

  return (
    <>
      <BackofficePage>
        <Paper sx={{ p: 2, m: 2 }}>
          <Loader open={isFetching || isLoadingCreate || isLoadingUpdate} />
          <CustomSnackbar alert={alert} />
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Typography variant="h6">
              {formik.values.questionId ? 'Editar Pregunta' : 'Nueva Pregunta'}
            </Typography>

            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              spacing={1}
              rowSpacing={1}
              columns={12}
            >
              <Grid item xs={12} sx={{ mt: 2 }}>
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

                {
                  <Typography
                    color="error"
                    variant="caption"
                    //fontWeight="bold"
                    display="block"
                  >
                    {formik.errors.choices as string}
                  </Typography>
                }
              </Grid>
              <Grid item xs={2} sx={{ mt: 1, mb: 1 }}>
                <FormControlLabel
                  label="Activo"
                  control={
                    <Switch
                      checked={formik.values.active}
                      name="active"
                      value={formik.values.active}
                      onChange={formik.handleChange}
                    />
                  }
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
                    formik.touched.questionType && formik.errors.questionType
                  }
                  onChange={(_: unknown, value: GenericDictionary) => {
                    formik.setFieldValue('questionType', value.name)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="imageLink"
                  label="Link a Imagen"
                  variant="standard"
                  fullWidth
                  multiline
                  maxRows={1}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.imageLink && Boolean(formik.errors.imageLink)
                  }
                  helperText={
                    formik.touched.imageLink && formik.errors.imageLink
                  }
                  value={formik.values.imageLink}
                />

                <Box
                  sx={{
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 2,
                  }}
                >
                  {/* Signature error message */}
                  {formik.values.imageLink && (
                    <Typography color="error" variant="caption" display="block">
                      {formik.touched.imageLink && formik.errors.imageLink}
                    </Typography>
                  )}

                  {formik.values.imageLink && (
                    <img src={formik.values.imageLink} style={{ width: 300 }} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <>
                  {formik.values.questionType == QuestionType.CHOICE && (
                    <Box sx={{ pt: 1, pb: 4 }}>
                      <InternalChoiceList />
                      {formik.errors.choices && formik.touched.choices && (
                        <Typography
                          color="error"
                          variant="caption"
                          //fontWeight="bold"
                          display="block"
                        >
                          {formik.errors.choices as string}
                        </Typography>
                      )}
                    </Box>
                  )}
                </>
              </Grid>
              <Grid item xs={2}>
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
                    formik.setFieldValue('rule.processingRule', value.name)
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
                  label="Acción"
                  value={formik.values.rule.scoreAction}
                  error={formik.errors.rule?.scoreAction}
                  helperText={
                    formik.touched.rule?.scoreAction &&
                    formik.errors.rule?.scoreAction
                  }
                  onChange={(_: unknown, value: GenericDictionary) => {
                    formik.setFieldValue('rule.scoreAction', value.name)
                  }}
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
        </Paper>
      </BackofficePage>
    </>
  )
}
