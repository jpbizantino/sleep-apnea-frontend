import { Box, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { QuestionComponent } from '../components/QuestionComponent'
import { SurveyContext } from './context/SurveyContext'
import {
  doAddAnswer,
  doNextStep,
  doRemoveAnswer,
} from './reducer/actions/survey.action'
import { Answer } from '../types/answer.types'
import * as yup from 'yup'
import { QuestionType } from '../../common/enum/question.enum'
import { Question } from '../../common/types'

export const SurveyStep = (props: { question: Question }) => {
  const { state, dispatch } = useContext(SurveyContext)

  const initialValue: Answer = {
    questionId: props.question.questionId,
    jsonQuestion: JSON.stringify(props.question),
    selectedValue: 0,
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
      // Add Answer
      if (state.answerExist(values)) dispatch(doRemoveAnswer(values))

      dispatch(doAddAnswer(values))

      dispatch(doNextStep())
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelection = (e: any) => {
    if (!e.target.value) return

    if (props.question.questionType == QuestionType.FIX_NUMBER) {
      formik.setFieldValue('selectedValue', parseInt(e.target.value), true)
    } else {
      const selected = props.question.choices.find(
        (p) => p.choiceId == e.target.value
      )
      formik.setFieldValue('selectedValue', selected?.choiceValue)
    }
  }

  return (
    <>
      <form id={'Step' + state.stepPosition} onSubmit={formik.handleSubmit}>
        <Box sx={{ m: 1 }}>
          <Typography variant="caption" gutterBottom>
            Pregunta {state.stepPosition} de {state.totalSteps}
          </Typography>
        </Box>

        <QuestionComponent
          question={props.question}
          handleSelection={handleSelection}
        />
        {/* Signature error message */}
        {!formik.values.selectedValue && (
          <Typography
            color="error"
            variant="button"
            fontWeight="bold"
            display="block"
          >
            {formik.touched.selectedValue && formik.errors.selectedValue}
          </Typography>
        )}
      </form>
    </>
  )
}
