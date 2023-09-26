import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { QuestionComponent } from '../components/QuestionComponent'
import { Question } from '../entities'
import { SurveyContext } from './context/SurveyContext'
import { doNextStep } from './reducer/actions/survey.action'
import { Answer } from '../entities/answer.entity'
import * as yup from 'yup'
import { QuestionType } from '../enums/question.enum'

export const SurveyStep = (props: {
  handleNext: any
  question: Question | undefined
}) => {
  const { state, dispatch } = useContext(SurveyContext)

  if (props.question == undefined) return <>No hay preguntas</>

  const initialValue: Answer = {
    questionId: props.question._id,
    selectedDescription: '',
    selectedValue: '',
  }
  const validationSchema = yup.object({
    questionId: yup.string().required('El campo es requerido'),
    selectedValue: yup
      .string()
      .required(
        props.question.questionType == QuestionType.CHOICE
          ? 'Seleccione una opción'
          : 'Ingrese un valor'
      ),
  })

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values: Answer) => {
      console.log(values)
      // // Add a Patient to the context
      // dispatch(doAddPatient(values))
      // Enable Next Button
      dispatch(doNextStep())
    },
  })

  const handlSelection = (e: any) => {
    console.log(e.target.value)
    formik.setFieldValue('selectedValue', e.target.value, true)
  }

  return (
    <>
      <form id={'Step' + state.stepPosition} onSubmit={formik.handleSubmit}>
        <Box sx={{ m: 1 }}>
          <Typography variant="h6" gutterBottom>
            Pregunta {state.stepPosition} de {state.totalSteps}
          </Typography>
        </Box>

        <QuestionComponent
          question={props.question}
          handleSelection={handlSelection}
          key={props.question._id}
        />
        {/* Signature error message */}
        {!formik.values.selectedValue && (
          <Typography color="error" variant="caption" display="block">
            {formik.touched.selectedValue && formik.errors.selectedValue}
          </Typography>
        )}
      </form>
    </>
  )
}
