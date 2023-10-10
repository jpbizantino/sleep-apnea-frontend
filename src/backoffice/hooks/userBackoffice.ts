import { RootState, useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import {
  onToggleMainMenu,
  onOpenMainMenu,
  onSetSelectedQuestion,
} from '../slices'
import { Choice, Question } from '../../common/types'

export const useBackoffice = () => {
  const { isMainMenuOpen, selectedQuestion } = useSelector(
    (state: RootState) => state.backoffice
  )

  const dispatch = useAppDispatch()

  const toggleMainMenu = () => {
    dispatch(onToggleMainMenu())
  }

  const openMainMenu = () => {
    dispatch(onOpenMainMenu())
  }

  const setSelectedQuestion = (question: Question) => {
    dispatch(onSetSelectedQuestion(question))
  }

  const addNewChoice = (question: Question, choice: Choice) => {
    dispatch(
      onSetSelectedQuestion({
        ...question,
        choices: [...question.choices, choice],
      })
    )
  }

  const removeChoice = (question: Question, choice: Choice) => {
    dispatch(
      onSetSelectedQuestion({
        ...selectedQuestion,
        choices: question.choices.filter((p) => p._id !== choice._id),
      })
    )
  }

  return {
    isMainMenuOpen,
    toggleMainMenu,
    openMainMenu,
    //Question
    setSelectedQuestion,
    selectedQuestion,
    addNewChoice,
    removeChoice,
  }
}
