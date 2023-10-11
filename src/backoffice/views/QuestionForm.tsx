import { Close, ExpandMore, Save } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
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
import { AlertOption, Question } from '../../common/types'
import { QuestionType } from '../../survey/enums/question.enum'
import { ChoiceList } from '../components/questions/ChoiceList'
import { useBackoffice } from '../hooks/userBackoffice'
import { BackofficePage } from '../pages/BackofficePage'
import { useGetQuestionQuery } from '../slices/questionQuerySlice'

const validationSchema = yup.object({
  question: yup.string().trim().required('El campo es requerido'),
  description: yup.string().trim().required('El campo es requerido'),
})

// .shape({
//   role: yup.object().nullable().required('Seleccione un valor'),
//   //patient: yup.object().nullable().required('Ingrese un valor'),
// })

// interface AlertOption {
//   isAlertOpen: boolean
//   msgError: string
// }

export const QuestionForm = () => {
  const navigate = useNavigate()
  const { setSelectedQuestion } = useBackoffice()

  //Get de URL Param
  const { questionId } = useParams()

  // const [createQuestion, { isLoading: isLoadingCreate }] =
  //   useCreateQuestionMutation()
  // const [updateQuestion, { isLoading: isLoadingUpdate }] =
  //   useUpdateQuestionMutation()
  const { data, isFetching, isSuccess } = useGetQuestionQuery(
    questionId ?? skipToken
  )
  const [expanded, setExpanded] = useState(true)

  const [alert, setAlert] = useState<AlertOption>({
    isAlertOpen: false,
    msgError: '',
  })

  let initialValue: Question = {
    _id: '',
    question: '',
    description: '',
    order: 0,
    questionType: QuestionType.FIX_NUMBER,
    images: [],
    choices: [],
  }

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values: Question) => {
      setAlert({
        isAlertOpen: false,
        msgError: '',
      })

      console.log(values)

      // values = {
      //   ...values,
      // question: values.question.trim().toLocaleLowerCase(),
      // description: values.description.trim().toUpperCase(),
      // nameOne: values.nameOne.trim().toUpperCase(),
      // email: values.email.trim().toLocaleLowerCase(),
      // inactive: !values.inactive,
      //  }

      // if (!formik.values._id) {
      //   createQuestion(values)
      //     .unwrap()
      //     .then(() => {})
      //     .catch((error) => {
      //       setAlert({
      //         isAlertOpen: true,
      //         msgError: error.data.message,
      //       })
      //     })
      // } else {
      //   updateQuestion(values)
      //     .unwrap()
      //     .then(() => {})
      //     .catch((error) => {
      //       setAlert({
      //         isAlertOpen: true,
      //         msgError: error.data.message,
      //       })
      //     })
      // }
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

  return (
    <>
      <BackofficePage>
        <Loader open={isFetching} />
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <Box sx={{ mt: 1 }}>
            <Accordion
              expanded={expanded}
              sx={{ m: 1, p: 1 }}
              disableGutters={true}
              onChange={() => setExpanded(!expanded)}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
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
                  <Grid item xs={6}>
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

                  <Grid item xs={6}>
                    {/* <QuestionTypeCombo
                      name="questionType"
                      label="Tipo de Pregunta"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.questionType &&
                        Boolean(formik.errors.questionType)
                      }
                      helperText={
                        formik.touched.questionType &&
                        formik.errors.questionType
                      }
                      value={formik.values.questionType}
                      disabled={false}
                    /> */}
                  </Grid>
                  {/* <Grid item xs={2} sx={{ pr: 1, mt: 2 }}>
                    <FormControlLabel
                      label="Estado"
                      control={
                        <Switch
                          checked={formik.values.inactive}
                          name="inactive"
                          value={formik.values.inactive}
                          onChange={formik.handleChange}
                        />
                      }
                    />
                  </Grid> */}

                  <Grid item xs={12} sx={{ mt: 1 }}>
                    <ChoiceList />
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
        <Box hidden={!alert.isAlertOpen} sx={{ mt: 2 }}>
          <Alert severity="error">
            <AlertTitle>Error:</AlertTitle>
            {alert.msgError}
          </Alert>
        </Box>

        {/* {selectedQuestion?.QuestionId &&
        formik.values.role?.roleCode == ROLES.Patient ? (
          <QuestionPatient />
        ) : (
          ''
        )} */}
      </BackofficePage>
    </>
  )
}
